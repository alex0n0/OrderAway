import React from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import CustomerLayout from '../../baselayouts/CustomerLayout';
import MenuItemCustomer from '../../elements/menuitem/Customer';

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

// import socketIOClient from 'socket.io-client';

class CustomerUIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
      uid: undefined,
      uCurrBill: undefined,
      restaurantId: undefined,
      menuTitle: undefined,
      tableNumber: 1,
      menu: [],
      sidebarMenuActiveIndex: -1,

      modalOrderIsShown: false,
      modalOrderButtonDismissIsDisabled: false,
      modalOrderQuantity: 1,
      modalOrderMenuItemActive: undefined,
      modalOrderMenuItemList: [],

      modalBillIsShown: false,
      modalBillButtonDismissIsDisabled: false,
      modalBillTime: undefined,

      billDetails: undefined,
      billOrderItems: undefined
    }
  }


  // socket;

  componentDidMount() {
    // this.socket = socketIOClient("localhost:5000");
    var cookies = document.cookie;
    var cookiesArr = cookies.split(";").map(curr => curr.trim());
    cookiesArr = cookiesArr.map(curr => curr.split("=").map(curr => curr.trim()));
    var token = cookiesArr.find(curr => {
      return curr[0] === "U_TKN";
    });
    var uid = cookiesArr.find(curr => {
      return curr[0] === "U_ID";
    });
    var uCurrBill = cookiesArr.find(curr => {
      return curr[0] === "U_CURR_BILL";
    });

    if (token && uid) {
      var newState = {
        token: token[1],
        uid: uid[1],
      }
      if (uCurrBill) {
        newState.uCurrBill = uCurrBill[1];
      }
      this.setState({
        ...this.state,
        ...newState
      });


      axios.post("/api/customer", { uid: uid[1] }, { headers: { Authorization: "Bearer " + token[1] } })
        .then(response => {
          if (response.data.success === false) {
            this.props.history.push("/signin");
          } else {
            if (response.data.menu.categories) {
              this.setState({
                ...this.state,
                restaurantId: response.data.menu.restaurantId,
                menuTitle: response.data.menu.menuTitle,
                menu: response.data.menu.categories,
                sidebarMenuActiveIndex: response.data.menu.categories.length === 0 ? -1 : 0
              });
              if (this.state.uCurrBill) {
                console.log(this.state.uCurrBill);
                axios.post("/api/customer/bill/get", { billId: this.state.uCurrBill }, { headers: { Authorization: "Bearer " + token[1] } })
                  .then(response => {
                    var billDetails = JSON.parse(JSON.stringify(response.data.billDetails));
                    billDetails.orderItems = response.data.orderItems;
                    this.setState({
                      ...this.state,
                      billDetails: billDetails
                    });
                  });
              }
            }
          }
        });
    } else {
      this.props.history.push("/signin");
    }
  }

  handleSidebarOptionClick = (i) => {
    this.setState({
      ...this.state,
      sidebarMenuActiveIndex: i
    });
  }

  handleModalOrderShow = (menuItem) => {
    if (this.state.billDetails) {
      this.setState({
        ...this.state,
        modalOrderIsShown: true,
        modalOrderMenuItemActive: menuItem
      });
    } else {
      console.log("ERR: bill does not exist");
    }
  }
  handleModalOrderClose = () => {
    this.setState({
      ...this.state,
      modalOrderIsShown: false
    });
  }
  handleModalOrderExited = () => {
    this.setState({
      ...this.state,
      modalOrderQuantity: 1,
      modalOrderMenuItemActive: undefined
    });
  }

  handleModalOrderButtonIncreaseClick = () => {
    var oldCount = this.state.modalOrderQuantity;
    var newCount = oldCount === 10 ? 10 : oldCount + 1
    if (newCount !== oldCount) {
      this.setState({
        ...this.state,
        modalOrderQuantity: newCount
      });
    }
  }
  handleModalOrderButtonDecreaseClick = () => {
    var oldCount = this.state.modalOrderQuantity;
    var newCount = oldCount === 1 ? 1 : oldCount - 1;
    if (newCount !== oldCount) {
      this.setState({
        ...this.state,
        modalOrderQuantity: newCount
      });
    }
  }
  handleModalOrderButtonOrderClick = () => {
    this.setState({
      ...this.state,
      modalOrderButtonDismissIsDisabled: true
    });
    var tempOrderMenuItemList = [...this.state.modalOrderMenuItemList];
    var tempOrderMenuItemActive = {
      menuTitle: this.state.menuTitle,
      categoryTitle: this.state.modalOrderMenuItemActive.categoryTitle,
      menuItemTitle: this.state.modalOrderMenuItemActive.menuItemTitle,
      price: this.state.modalOrderMenuItemActive.price,
      quantity: this.state.modalOrderQuantity,
    }

    tempOrderMenuItemList.push(tempOrderMenuItemActive);

    var uploadObj = {
      order: {
        restaurantId: this.state.restaurantId,
        billId: this.state.billDetails._id,
        tableNumber: this.state.tableNumber,
        orderTime: parseInt(moment().format("X")),
        menuItems: tempOrderMenuItemList,
      }
    };

    axios.post("/api/kitchen/create", uploadObj, { headers: { Authorization: "Bearer " + this.state.token } })
      .then(response => {
        console.log(response.data);
        var billDetails = JSON.parse(JSON.stringify(this.state.billDetails));
        billDetails.orderItems.push(response.data.order);
        this.setState({
          ...this.state,
          modalOrderIsShown: false,
          modalOrderMenuItemList: [],
          modalOrderButtonDismissIsDisabled: false,
          billDetails: billDetails
        });
      })
      .catch(err => {
        this.setState({
          ...this.state,
          modalOrderButtonDismissIsDisabled: false
        });
      });
  }




  /**
   * HANDLERS and FUNCTIONS for bill modal
   */
  handleButtonClickBillModalOpen = () => {
    var eachItem = [];
    if (this.state.billDetails) {
      var orderItems = this.state.billDetails.orderItems;
      if (orderItems.length > 0) {
        orderItems.forEach(curr => {
          curr.menuItems.forEach(curr => {
            eachItem.push(curr);
          });
        });
      }
    } else {
      console.log("ERR: bill does not exist");
    }
    this.setState({
      ...this.state,
      modalBillIsShown: true,
      billOrderItems: eachItem
    });
  }

  handleModalBillShow = () => {
    this.setState({
      ...this.state,
      modalBillIsShown: true
    });
  }
  handleModalBillClose = () => {
    this.setState({
      ...this.state,
      modalBillIsShown: false
    });
  }
  // handleModalBillExited = () => {
  //   this.setState({
  //     ...this.state,
  //     modalOrderQuantity: 1,
  //     modalOrderMenuItemActive: undefined
  //   });
  // }

  handleModalBillCreateBill = () => {
    if (this.state.billDetails) {
      console.log("ERR: bill already exists");
    } else {
      console.log("create bill");
      axios.post("/api/customer/bill/create", { uid: this.state.uid, tableNumber: this.state.tableNumber }, { headers: { Authorization: "Bearer " + this.state.token } })
        .then(response => {
          if (response.data.success === false) {
            this.props.history.push("/signin");
          } else {
            if (response.data.bill) {
              var billDetails = response.data.bill;
              billDetails.orderItems = [];
              this.setState({
                ...this.state,
                billDetails: billDetails,
                uCurrBill: billDetails._id,
                modalBillIsShown: false
              });
              document.cookie = `U_CURR_BILL=${billDetails._id}`;
              console.log(this.state.billDetails);
            }
          }
        });
    }
  }

  handleModalBillPayBill = () => {
    if (this.state.billDetails) {
      console.log("pay bill");
      // axios, update endTime new moment, isCompleted true
      document.cookie = "U_CURR_BILL=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      this.setState({
        ...this.state,
        billDetails: undefined,
        billOrderItems: undefined,
        modalBillIsShown: false
      });
    } else {
      console.log("ERR: bill does not exist");
    }

  }





  render() {
    var menuItemsArr = [];
    if (this.state.menu.length !== 0) {
      menuItemsArr = this.state.menu[this.state.sidebarMenuActiveIndex].menuItems.map((curr, i) => {
        curr.categoryTitle = this.state.menu[this.state.sidebarMenuActiveIndex].categoryTitle;
        return (
          <div key={i} className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
            <MenuItemCustomer menuItem={curr} onButtonOrderClick={() => { this.handleModalOrderShow(curr) }} />
          </div>
        )
      });
    }

    var billOrderItems = [];
    var billOrderItemsCount = 0;
    var billOrderTotalPrice = 0;
    if (this.state.billOrderItems) {
      var tempBillOrderItems = JSON.parse(JSON.stringify(this.state.billOrderItems));
      billOrderItems = tempBillOrderItems.map((curr, i) => {
        if (curr.quantity === 1) {
          return (
            <div key={i} className="px-3 px-lg-5 row mb-2">
              <div className="col mr-auto text-truncate"><b>{curr.menuItemTitle.toUpperCase()}</b></div>
              <div className="col-auto text-right">{curr.price.toFixed(2)}</div>
            </div>
          )
        } else {
          return (
            <div key={i} className="px-3 px-lg-5 row mb-2">
              <div className="col-12 text-truncate"><b>{curr.menuItemTitle.toUpperCase()}</b></div>
              <div className="w-100"></div>
              <div className="col mr-auto text-truncate">Qty ${curr.quantity} @ ${curr.price.toFixed(2)} ea</div>
              <div className="col-auto text-right">{(curr.price * curr.quantity).toFixed(2)}</div>
            </div>
          )
        }
      });
      if (tempBillOrderItems.length > 0) {
        tempBillOrderItems.forEach(curr => {
          billOrderTotalPrice += curr.price * curr.quantity;
        });
      }
      if (tempBillOrderItems.length > 0) {
        tempBillOrderItems.forEach(curr => {
          billOrderItemsCount += curr.quantity;
        });
      }
    }



    return (
      <>
        <Route exact path="/customer">
          <CustomerLayout menu={this.state.menu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history} handleButtonClickBillModalOpen={this.handleButtonClickBillModalOpen}>
            <div className="container-fluid py-3">
              <div className="row">
                {/* MENU ITEM START */}
                {
                  menuItemsArr
                }
                {/* MENU ITEM END */}
              </div>

              {/* <button className="btn btn-primary" onClick={this.handleModalOrderShow}>
                Launch demo modal
              </button> */}


              <Modal className="modalMinWidth" show={this.state.modalOrderIsShown} onHide={this.handleModalOrderClose} onExited={this.handleModalOrderExited} centered size="md" backdrop={this.state.modalOrderButtonDismissIsDisabled ? "static" : true}>
                <ModalHeader className="m-0 p-0 border-0">
                  <button
                    className="ml-auto button--transparent color-black-05 customerModalCloseButton p-2"
                    disabled={this.state.modalOrderButtonDismissIsDisabled ? true : false}
                    onClick={this.handleModalOrderClose}>
                    <i className="material-icons font-30">close</i>
                  </button>
                </ModalHeader>
                <ModalBody className="p-0">

                  {
                    this.state.modalOrderMenuItemActive ?
                      (
                        <>
                          <div className="position-relative overflow-hidden w-75 mx-auto">
                            <div style={{ width: '100%', paddingTop: '75%' }}></div>
                            <img className={this.state.modalOrderMenuItemActive.imageOrientationLandscape ? "menu-item-image menu-item-image--landscape" : "menu-item-image menu-item-image--portrait"} src={this.state.modalOrderMenuItemActive.imageUrl} alt="slice of pie" />
                            <div className="text-left position-absolute d-flex align-content-start flex-wrap w-100 h-100 p-3" style={{ top: "0px", left: "0px", background: "linear-gradient(-5deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2) 90%)" }}>
                              {this.state.modalOrderMenuItemActive.tags.vg ? (<span className="badge badge-pill table-success mr-1 mb-1 py-1 shadow">Vg</span>) : ""}
                              {this.state.modalOrderMenuItemActive.tags.v ? (<span className="badge badge-pill badge-success mr-1 mb-1 py-1 shadow">V</span>) : ""}
                              {this.state.modalOrderMenuItemActive.tags.gf ? (<span className="badge badge-pill badge-warning mr-1 mb-1 py-1 shadow">GF</span>) : ""}
                            </div>
                          </div>

                          <div className="w-75 mx-auto mt-3">
                            <p className="m-0 font-20"><b>{this.state.modalOrderMenuItemActive.menuItemTitle.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</b></p>
                            <p className="text-right m-0"><b>${(this.state.modalOrderMenuItemActive.price * this.state.modalOrderQuantity).toFixed(2)}</b></p>
                          </div>
                        </>
                      )
                      :
                      ""
                  }
                  <div className="d-flex align-items-center justify-content-center w-100 overflow-hidden">
                    <div className="position-relative">
                      <button
                        className="customerModalCountButton customerModalCountButton--left button--transparent rounded-circle position-absolute"
                        disabled={this.state.modalOrderQuantity <= 1 || this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalOrderButtonDecreaseClick}>
                        <i className="material-icons">remove</i>
                      </button>
                      <div className="customerModalCountDisplay " style={{ height: "100px", width: "100px" }}>
                        <p className="font-30 h-100 w-100 rounded-circle d-flex align-items-center justify-content-center m-0">{this.state.modalOrderQuantity}</p>
                      </div>
                      <button
                        className="customerModalCountButton customerModalCountButton--right button--transparent rounded-circle position-absolute"
                        disabled={this.state.modalOrderQuantity >= 10 || this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalOrderButtonIncreaseClick}>
                        <i className="material-icons">add</i>
                      </button>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="border-0 justify-content-center px-0">
                  <div className="row w-100 justify-content-center mx-2">
                    <div className="col-12 order-1">
                      <p className="text-center">Order this item?</p>
                    </div>
                    {/* <div className="order-3 order-sm-2 col-12 col-sm-6 col-md-4 px-2">
                      <button
                        className="button--transparent bg-danger h-100 w-100 color-white py-2"
                        disabled={this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalOrderClose}>NO</button>
                    </div>
                    <div className="order-2 order-sm-3 col-12 col-sm-6 col-md-4 mb-2 mb-sm-0 px-2">
                      <button
                        className="button--transparent bg-success h-100 w-100 color-white py-2"
                        disabled={this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalOrderButtonOrderClick}>YES</button>
                    </div> */}
                    <div className="order-2 col-6 col-md-4 px-2">
                      <button
                        className="button--transparent bg-danger h-100 w-100 color-white py-2"
                        disabled={this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalOrderClose}>NO</button>
                    </div>
                    <div className="order-3 col-6 col-md-4 px-2">
                      <button
                        className="button--transparent bg-success h-100 w-100 color-white py-2"
                        disabled={this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalOrderButtonOrderClick}>YES</button>
                    </div>
                  </div>
                </ModalFooter>
              </Modal>





              <Modal className="modalMinWidth" show={this.state.modalBillIsShown} onHide={this.handleModalBillClose} onExited={this.handleModalBillExited} centered size="xl" backdrop={this.state.modalBillButtonDismissIsDisabled ? "static" : true}>
                <ModalHeader className="m-0 p-0 border-0 py-3 pl-3">
                  <button
                    className="button--transparent button--dev py-2 px-5 color-white rounded-pill"
                    onClick={this.handleModalBillCreateBill}>CREATE_BILL_DEV</button>

                  <button
                    className="ml-auto button--transparent color-black-05 customerModalCloseButton p-2"
                    disabled={this.state.modalBillButtonDismissIsDisabled ? true : false}
                    onClick={this.handleModalBillClose}>
                    <i className="material-icons font-30">close</i>
                  </button>
                </ModalHeader>
                <ModalBody className="p-0">
                  <div className="px-3 px-lg-5 mb-4">
                    {/* <div className="row">
                      <div className="col mr-auto border">
                        <p className="m-0 font-30"><b>TABLE {this.state.tableNumber}</b></p>
                      </div>
                      <div className="col-auto text-right border">
                        <p className="m-0"><b>3:29 PM</b></p>
                      </div>
                    </div> */}
                    <div className="d-flex align-items-center overflow-hidden">
                      <p className="m-0 mr-auto font-30 text-nowrap"><b>TABLE {this.state.tableNumber}&nbsp;&middot;&nbsp;</b>BILL</p>
                      <p className="m-0 ml-3 text-nowrap text-truncate"><b>{moment().format("h:mm A")}</b></p>
                    </div>
                    <p className="m-0 small color-black-05 p-0">BILL ID: {this.state.billDetails ? this.state.billDetails._id : ""}</p>
                  </div>


                  <div className="px-3 px-lg-5 row">
                    <div className="col text-right"><p className="m-0">$</p></div>
                  </div>
                  {/* <div className="px-3 px-lg-5 row mb-2">
                    <div className="col mr-auto text-truncate"><b>GELATO asdf asdf asdf asdf asf asfd as</b></div>
                    <div className="col-auto text-right">12.20</div>
                  </div>
                  <div className="px-3 px-lg-5 row mb-2">
                    <div className="col-12 text-truncate"><b>SQUID INK PASTA awef awef awef awef awef awef </b></div>
                    <div className="w-100"></div>
                    <div className="col mr-auto text-truncate">Qty 2333333333333333 @ $15.00 ea</div>
                    <div className="col-auto text-right">30.00</div>
                  </div> */}
                  {billOrderItems}

                  <div className="px-3 px-lg-5 mb-3">
                    <hr />
                  </div>

                  <div className="px-3 px-lg-5 d-flex align-items-center">
                    <p className="m-0 mr-auto font-18 text-truncate">{billOrderItemsCount} ITEMS</p>
                    <p className="m-0 ml-3 font-24 text-nowrap">TOTAL ${billOrderTotalPrice.toFixed(2)}</p>
                  </div>

                </ModalBody>
                <ModalFooter className="border-0 justify-content-center px-0">
                  <div className="row w-100 justify-content-center">
                    <div className="col-6 col-md-4 px-2">
                      <button
                        className="button--transparent bg-danger h-100 w-100 color-white py-2"
                        // disabled={this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalBillClose}>CANCEL</button>
                    </div>
                    <div className="col-6 col-md-4 px-2">
                      <button
                        className="button--transparent bg-success h-100 w-100 color-white py-2"
                        // disabled={this.state.modalOrderButtonDismissIsDisabled ? true : false}
                        onClick={this.handleModalBillPayBill}>PAY</button>
                    </div>
                  </div>
                </ModalFooter>
              </Modal>



            </div>
          </CustomerLayout>
        </Route>
      </>
    );
  }
}

export default CustomerUIComponent;