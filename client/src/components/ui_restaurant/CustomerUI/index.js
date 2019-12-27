import React from 'react';
import { Route } from 'react-router-dom';

import CustomerLayout from '../../baselayouts/CustomerLayout';
import MenuItemCustomer from '../../elements/menuitem/Customer';

import menu from '../../zzz/menu';
class CustomerUIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: menu,
      sidebarMenuActiveIndex: 0
    }
  }

  handleSidebarOptionClick = (i) => {
    this.setState({
      ...this.state,
      sidebarMenuActiveIndex: i
    });
  }

  render() {
    return (
      <>
        <Route exact path="/customer">
          <CustomerLayout menu={this.state.menu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick}>
            <div className="container-fluid py-3">
              <div className="row">
                {/* MENU ITEM START */}

                {/* MENU ITEM */}
                {
                  this.state.menu[this.state.sidebarMenuActiveIndex].menuItems.map((curr, i) => 
                    (
                      <div key={i} className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
                        <MenuItemCustomer menuItem={curr}/>
                      </div>
                    )
                  )
                }

                {/* MENU ITEM END */}
              </div>
            </div>
          </CustomerLayout>
        </Route>
        {/* <Route exact path="/business/menu">
          <CorporateLayout>
            <MenuSelector />
          </CorporateLayout>
        </Route>
        <Route exact path="/business/menu/builder">
          <CorporateLayout>
            <MenuBuilder />
          </CorporateLayout>
        </Route> */}
      </>
    );
  }
}

export default CustomerUIComponent;