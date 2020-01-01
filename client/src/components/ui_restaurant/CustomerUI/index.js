import React from 'react';
import { Route } from 'react-router-dom';

import axios from 'axios';

import CustomerLayout from '../../baselayouts/CustomerLayout';
import MenuItemCustomer from '../../elements/menuitem/Customer';

class CustomerUIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      sidebarMenuActiveIndex: -1
    }
  }

  componentDidMount() {
    axios.get("/api/customer")
      .then(response => {
        console.log(response.data.menu);
        this.setState({
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
        curr.category = this.state.menu[this.state.sidebarMenuActiveIndex].category;
        return (
          <div key={i} className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
            <MenuItemCustomer menuItem={curr} />
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
            </div>
          </CustomerLayout>
        </Route>
      </>
    );
  }
}

export default CustomerUIComponent;