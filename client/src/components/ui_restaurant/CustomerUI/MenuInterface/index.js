import React from 'react';
// import { Route } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import CustomerLayout from '../../../baselayouts/CustomerLayout';
import MenuItemCustomer from '../../../elements/menuitem/Customer';

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

// import socketIOClient from 'socket.io-client';

class CustomerMenuUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
      uid: undefined,
      orderawaykey: undefined,
      uCurrBill: undefined,
      restaurantId: undefined,
      restaurantUsername: undefined,
      restaurantIconUrl: undefined,
      menuTitle: undefined,
      tableNumber: 1,
      menu: [],
      sidebarMenuActiveIndex: -1,

      modalOrderIsShown: false,
      modalOrderButtonDismissIsDisabled: false,
      modalOrderQuantity: 1,
      modalOrderMenuItemActive: undefined,
      modalOrderMenuItemList: [],

      modalInitialiseBillIsShown: true,
      modalInitialiseBillButtonInitialiseIsDisabled: true,
      modalInitialiseBillSignOutIsShown: false,
      modalInitialiseBillSignOutButtonIsDisabled: true,
      modalInitialiseBillSignOutInputPassword: "",

      modalBillIsShown: false,
      modalBillButtonDismissIsDisabled: false,
      modalBillTime: undefined,

      billDetails: undefined,
      billOrderItems: undefined
    }

    this.handleInputChangeSignOutPassword.bind(this);
    this.handleButtonClickToggleSignOut.bind(this);
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
    var orderawaykey = cookiesArr.find(curr => {
      return curr[0] === "ORDERAWAYKEY";
    });
    var uCurrBill = cookiesArr.find(curr => {
      return curr[0] === "U_CURR_BILL";
    });
    var uTableNumber = cookiesArr.find(curr => {
      return curr[0] === "U_TABLE_NUMBER";
    });


    if (token && uid) {
      var newState = {
        token: token[1],
        uid: uid[1],
        orderawaykey: orderawaykey[1]
      }

      if (uTableNumber) {
        newState.tableNumber = uTableNumber[1];

        if (uCurrBill) {
          newState.uCurrBill = uCurrBill[1];
        }

        this.setState({
          ...this.state,
          ...newState
        });

        axios.post("/api/customer", { uid: uid[1], orderawaykey: orderawaykey[1] }, { headers: { Authorization: "Bearer " + token[1] } })
          .then(response => {
            if (response.data.success === false) {
              // this.props.history.push("/signin");
              if (response.data.path) {
                this.props.history.push(response.data.path);
              } else {
                this.props.history.push("/signin");
              }
            } else {
              if (response.data.menu.categories) {
                this.setState({
                  ...this.state,
                  restaurantId: response.data.menu.restaurantId,
                  restaurantUsername: response.data.restaurant.username,
                  restaurantIconUrl: response.data.restaurant.iconUrl,
                  menuTitle: response.data.menu.menuTitle,
                  menu: response.data.menu.categories,
                  sidebarMenuActiveIndex: response.data.menu.categories.length === 0 ? -1 : 0
                });
                if (this.state.uCurrBill) {
                  axios.post("/api/customer/bill/get", { billId: this.state.uCurrBill }, { headers: { Authorization: "Bearer " + token[1] } })
                    .then(response => {
                      var billDetails = JSON.parse(JSON.stringify(response.data.billDetails));
                      billDetails.orderItems = response.data.orderItems;
                      this.setState({
                        ...this.state,
                        billDetails: billDetails,
                        modalInitialiseBillIsShown: false
                      });
                    });
                } else {
                  this.setState({
                    ...this.state,
                    modalInitialiseBillButtonInitialiseIsDisabled: false
                  });
                }
              }
            }
          });
      } else {
        this.props.history.push("/customer/table");
      }
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
  handleModalInitialiseBill = () => {
    if (this.state.billDetails) {
      console.log("ERR: bill already exists");
    } else {
      this.setState({
        ...this.state,
        modalInitialiseBillButtonInitialiseIsDisabled: true,
        modalInitialiseBillSignOutButtonIsDisabled: true
      });
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
                modalInitialiseBillIsShown: false
              });
              document.cookie = `U_CURR_BILL=${billDetails._id}; path=/customer;`;
            } else {
              this.setState({
                ...this.state,
                modalInitialiseBillButtonInitialiseIsDisabled: false,
                modalInitialiseBillSignOutButtonIsDisabled: false
              });
            }
          }
        });
    }
  }

















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
  // handleModalBillExited = (stateObj) => {
  //   this.setState(stateObj);
  // }
  handleModalBillPayBill = () => {
    var billDetails = this.state.billDetails;
    if (billDetails) {
      console.log("pay bill");
      this.setState({
        ...this.state,
        modalBillButtonDismissIsDisabled: true
      });
      var uploadObj = {
        billId: billDetails._id,
        subtotal: this.calculateBillTotalPrice()
      }
      axios.post("/api/customer/bill/pay", uploadObj, { headers: { Authorization: "Bearer " + this.state.token } })
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            document.cookie = "U_CURR_BILL=; path=/customer; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            window.location.reload();
            this.setState({
              ...this.state,
              billDetails: undefined,
              billOrderItems: undefined,
            });
          } else {
            this.setState({
              ...this.state,
              modalBillButtonDismissIsDisabled: false
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("ERR: bill does not exist");
    }
  }




  handleButtonClickToggleSignOut = () => {
    var modalInitialiseBillSignOutIsShown = this.state.modalInitialiseBillSignOutIsShown;
    this.setState({
      ...this.state,
      modalInitialiseBillSignOutIsShown: !modalInitialiseBillSignOutIsShown
    });
  }
  handleButtonClickSignOut = (e) => {
    e.preventDefault();
    var password = this.state.modalInitialiseBillSignOutInputPassword;
    if (password.length > 0) {
      this.setState({
        modalInitialiseBillSignOutButtonIsDisabled: true,
        modalInitialiseBillButtonInitialiseIsDisabled: true
      });
      axios.post("/api/customer/signout", { username: this.state.restaurantUsername, password: this.state.modalInitialiseBillSignOutInputPassword, stream: "customer", orderawaykey: this.state.orderawaykey }, { headers: { Authorization: "Bearer " + this.state.token } })
        .then(response => {
          if (response.data.success === false) {
            console.log("wrong password");
            this.setState({
              ...this.state,
              modalInitialiseBillSignOutButtonIsDisabled: false,
              modalInitialiseBillButtonInitialiseIsDisabled: false,
              modalInitialiseBillSignOutInputPassword: ""
            });

          } else {
            document.cookie = "U_TKN=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "U_ID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "ORDERAWAYKEY=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "U_CURR_BILL=; path=/customer; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "U_TABLE_NUMBER=; path=/customer; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            this.props.history.push("/signin");
          }
        });
    }
  }
  handleInputChangeSignOutPassword = (e) => {
    this.setState({
      ...this.state,
      modalInitialiseBillSignOutInputPassword: e.currentTarget.value
    });
  }


  calculateBillTotalPrice = () => {
    var billOrderItems = this.state.billOrderItems;
    var billOrderTotalPrice = 0;
    if (billOrderItems) {
      var tempBillOrderItems = JSON.parse(JSON.stringify(this.state.billOrderItems));

      if (tempBillOrderItems.length > 0) {
        tempBillOrderItems.forEach(curr => {
          billOrderTotalPrice += curr.price * curr.quantity;
        });
        return billOrderTotalPrice;
      }
    }
    return 0;
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
          billOrderItemsCount += curr.quantity;
        });
      }
      if (tempBillOrderItems.length > 0) {
        tempBillOrderItems.forEach(curr => {
          billOrderTotalPrice += curr.price * curr.quantity;
        });
      }
    }



    return (
      <>
        {/* <Route exact path="/customer"> */}
        <CustomerLayout menu={this.state.menu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history} handleButtonClickBillModalOpen={this.handleButtonClickBillModalOpen} tableNumber={this.state.tableNumber} iconUrl={this.state.restaurantIconUrl}>
          <div className="container-fluid py-3">
            <div className="row">
              {menuItemsArr}
            </div>


            <Modal className="modalMinWidth"
              centered size="md"
              show={this.state.modalOrderIsShown}
              onHide={this.handleModalOrderClose}
              onExited={this.handleModalOrderExited}
              backdrop={this.state.modalOrderButtonDismissIsDisabled ? "static" : true}
              keyboard={this.state.modalOrderButtonDismissIsDisabled ? false : true}>
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










            <Modal className="modalMinWidth initialiseBillModal"
              centered size="xl"
              show={this.state.modalInitialiseBillIsShown}
              backdrop="static"
              keyboard={false}>
              <ModalBody className="p-0 bg-transparent">
                <div className="d-flex px-3 justify-content-end">
                  <form className="d-flex w-100">
                    <input
                      type="password"
                      placeholder="Password"
                      className={this.state.modalInitialiseBillSignOutIsShown ? "form-control h-100 w-100 rounded-0" : "d-none"}
                      value={this.state.modalInitialiseBillSignOutInputPassword}
                      onChange={this.handleInputChangeSignOutPassword} />
                    <button className={this.state.modalInitialiseBillSignOutIsShown ? "btn btn-danger text-nowrap rounded-0" : "d-none"} onClick={this.handleButtonClickSignOut}>SIGN OUT</button>
                  </form>
                  <button type="submit" className="button--transparent color-white py-2 px-3" onClick={this.handleButtonClickToggleSignOut}><i className="material-icons">more_vert</i></button>
                </div>
                <div className="px-3 px-lg-5 my-5 py-5 d-flex justify-content-center">
                  <button
                    className="button--transparent button--dev py-2 py-5 px-5 color-white rounded-pill font-24 color-black"
                    disabled={this.state.modalInitialiseBillButtonInitialiseIsDisabled ? true : false}
                    onClick={this.handleModalInitialiseBill}><b>START ORDERING</b></button>
                </div>
              </ModalBody>
            </Modal>











            <Modal className="modalMinWidth"
              centered size="lg"
              show={this.state.modalBillIsShown}
              onHide={this.handleModalBillClose}
              onExited={this.handleModalBillExited}
              backdrop={this.state.modalBillButtonDismissIsDisabled ? "static" : true}
              keyboard={this.state.modalBillButtonDismissIsDisabled ? false : true}>
              <ModalHeader className={this.state.billDetails ? "d-block m-0 p-0 border-0" : "d-none m-0 p-0 border-0"}>
                <button
                  className="ml-auto button--transparent color-black-05 customerModalCloseButton p-2"
                  disabled={this.state.modalBillButtonDismissIsDisabled ? true : false}
                  onClick={this.handleModalBillClose}>
                  <i className="material-icons font-30">close</i>
                </button>
              </ModalHeader>

              <ModalBody className="p-0">
                <div className={this.state.billDetails ? "d-block" : "d-none"}>
                  <div className="px-3 px-lg-5 mb-4">
                    <div className="d-flex align-items-center overflow-hidden">
                      <p className="m-0 mr-auto font-30 text-nowrap"><b>TABLE {this.state.tableNumber}&nbsp;&middot;&nbsp;</b>BILL</p>
                      <p className="m-0 ml-3 text-nowrap text-truncate"><b>{moment().format("h:mm A")}</b></p>
                    </div>
                    <p className="m-0 small color-black-05 p-0">BILL ID: {this.state.billDetails ? this.state.billDetails._id : ""}</p>
                  </div>


                  <div className="px-3 px-lg-5 row">
                    <div className="col text-right"><p className="m-0">$</p></div>
                  </div>
                  {billOrderItems}

                  <div className="px-3 px-lg-5 mb-3">
                    <hr />
                  </div>

                  <div className="px-3 px-lg-5 d-flex align-items-center">
                    <p className="m-0 mr-auto font-18 text-truncate">{billOrderItemsCount} ITEMS</p>
                    <p className="m-0 ml-3 font-24 text-nowrap">TOTAL ${billOrderTotalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className={this.state.billDetails ? "d-flex border-0 justify-content-center px-0" : "d-none border-0 justify-content-center px-0"}>
                <div className="row w-100 justify-content-center">
                  <div className="col-6 col-md-4 px-2">
                    <button
                      className="button--transparent bg-danger h-100 w-100 color-white py-2"
                      disabled={this.state.modalBillButtonDismissIsDisabled ? true : false}
                      onClick={this.handleModalBillClose}>CANCEL</button>
                  </div>
                  <div className="col-6 col-md-4 px-2">
                    <button
                      className="button--transparent bg-success h-100 w-100 color-white py-2"
                      disabled={this.state.modalBillButtonDismissIsDisabled ? true : false}
                      onClick={this.handleModalBillPayBill}>PAY</button>
                  </div>
                </div>
              </ModalFooter>
            </Modal>












          </div>
        </CustomerLayout>
      </>
    );
  }
}

export default CustomerMenuUI;

