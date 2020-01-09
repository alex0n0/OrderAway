import React from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import CustomerLayout from '../../baselayouts/CustomerLayout';
import MenuItemCustomer from '../../elements/menuitem/Customer';

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
// import ModalTitle from "react-bootstrap/ModalTitle";

// import socketIOClient from 'socket.io-client';

class CustomerUIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: undefined,
      tableNumber: 1,
      menu: [],
      sidebarMenuActiveIndex: -1,
      modalOrderIsShown: false,
      modalOrderQuantity: 1,
      modalOrderMenuItem: undefined
    }
  }


  // socket;


  handleModalOrderShow = (menuItem) => {
    this.setState({
      ...this.state,
      modalOrderIsShown: true,
      modalOrderMenuItem: menuItem
    });
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
      modalOrderMenuItem: undefined
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
    var uploadObj = {
      restaurantId: this.state.restaurantId,
      tableNumber: this.state.tableNumber,
      orderTime: parseInt(moment().format("X")),
      menuItem: this.state.modalOrderMenuItem,
    };

    uploadObj.menuItem.quantity = this.state.modalOrderQuantity;


    axios.post("/api/kitchen/create", uploadObj)
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          modalOrderIsShown: false
        });
      });
  }


  componentDidMount() {
    // this.socket = socketIOClient("localhost:5000");
    axios.get("/api/customer")
      .then(response => {
        this.setState({
          ...this.state,
          restaurantId: response.data.restaurant._id,
          menu: response.data.menu,
          sidebarMenuActiveIndex: response.data.menu.length === 0 ? -1 : 0
        });
      });
  }

  handleSidebarOptionClick = (i) => {
    this.setState({
      ...this.state,
      sidebarMenuActiveIndex: i
    });
  }

  render() {
    var menuItemsArr = [];
    if (this.state.menu.length !== 0) {
      menuItemsArr = this.state.menu[this.state.sidebarMenuActiveIndex].menuItems.map((curr, i) => {
        curr.category = this.state.menu[this.state.sidebarMenuActiveIndex].categoryTitle;
        return (
          <div key={i} className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
            <MenuItemCustomer menuItem={curr} onButtonOrderClick={() => { this.handleModalOrderShow(curr) }} />
          </div>
        )
      });
    }
    return (
      <>
        <Route exact path="/customer">
          <CustomerLayout menu={this.state.menu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick}>
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


              <Modal show={this.state.modalOrderIsShown} onHide={this.handleModalOrderClose} onExited={this.handleModalOrderExited} centered size="md" className="customerModalOrder">
                <ModalHeader closeButton className="border-0">
                  {/* <ModalTitle>Hi</ModalTitle> */}
                </ModalHeader>
                <ModalBody className="p-0">

                  {

                    this.state.modalOrderMenuItem ?
                      (
                        <>
                          <div className="position-relative overflow-hidden w-75 mx-auto">
                            <div style={{ width: '100%', paddingTop: '75%' }}></div>
                            <img className={this.state.modalOrderMenuItem.imageOrientationLandscape ? "menu-item-image menu-item-image--landscape" : "menu-item-image menu-item-image--portrait"} src={this.state.modalOrderMenuItem.imageUrl} alt="slice of pie" />
                            <div className="text-left position-absolute d-flex align-content-start flex-wrap w-100 h-100 p-3" style={{ top: "0px", left: "0px", background: "linear-gradient(-5deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2) 90%)" }}>
                              {this.state.modalOrderMenuItem.tags.vg ? (<span className="badge badge-pill table-success mr-1 mb-1 py-1 shadow">Vg</span>) : ""}
                              {this.state.modalOrderMenuItem.tags.v ? (<span className="badge badge-pill badge-success mr-1 mb-1 py-1 shadow">V</span>) : ""}
                              {this.state.modalOrderMenuItem.tags.gf ? (<span className="badge badge-pill badge-warning mr-1 mb-1 py-1 shadow">GF</span>) : ""}
                            </div>
                          </div>

                          <div className="w-75 mx-auto mt-3">
                            <p className="m-0 font-20"><b>{this.state.modalOrderMenuItem.menuItemTitle.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</b></p>
                            <p className="text-right m-0"><b>${(this.state.modalOrderMenuItem.price * this.state.modalOrderQuantity).toFixed(2)}</b></p>
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
                        disabled={this.state.modalOrderQuantity <= 1 ? true : false}
                        onClick={this.handleModalOrderButtonDecreaseClick}>
                        <i className="material-icons">remove</i>
                      </button>
                      <div className="customerModalCountDisplay " style={{ height: "100px", width: "100px" }}>
                        <p className="font-30 h-100 w-100 rounded-circle d-flex align-items-center justify-content-center m-0">{this.state.modalOrderQuantity}</p>
                      </div>
                      <button
                        className="customerModalCountButton customerModalCountButton--right button--transparent rounded-circle position-absolute"
                        disabled={this.state.modalOrderQuantity >= 10 ? true : false}
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
                    <div className="order-3 order-sm-2 col-12 col-sm-6 col-md-4 px-2">
                      <button className="btn btn-block btn-danger" onClick={this.handleModalOrderClose}>NO</button>
                    </div>
                    <div className="order-2 order-sm-3 col-12 col-sm-6 col-md-4 mb-2 mb-sm-0 px-2">
                      <button className="btn btn-block btn-success" onClick={this.handleModalOrderButtonOrderClick}>YES</button>
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