import React from 'react';
import { Route } from 'react-router-dom';

import CustomerLayout from '../../baselayouts/CustomerLayout';
import MenuItemCustomer from '../../elements/menuitem/Customer';

class CustomerUIComponent extends React.Component {
    render() {
        return (
            <>
                <Route exact path="/customer">
                    <CustomerLayout>
                        <div className="container-fluid py-3">
                            <div className="row">
                                {/* MENU ITEM START */}
                                {/* MENU ITEM */}
                                <div className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
                                    <MenuItemCustomer/>
                                </div>
                                {/* MENU ITEM */}
                                <div className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
                                    <MenuItemCustomer/>
                                </div>
                                {/* MENU ITEM */}
                                <div className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
                                    <MenuItemCustomer/>
                                </div>
                                {/* MENU ITEM */}
                                <div className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
                                    <MenuItemCustomer/>
                                </div>
                              

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