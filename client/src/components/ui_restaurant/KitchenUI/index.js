import React from 'react';
import moment from 'moment';
import axios from 'axios';

import CorporateLayout from '../../baselayouts/CorporateLayout';
import OrderItem from '../../elements/orderitem/Kitchen';

// import order from '../../zzz/order'; // can delete this import AND delete from ./zzz
import sidebarmenu from './sidebarmenu';

class KitchenUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarmenu: sidebarmenu,
            sidebarMenuActiveIndex: 0,
            orders: [],
            currTime: moment()
        }
    }

    interval;

    componentDidMount() {
        axios.get("/api/kitchen")
            .then(response => {
                this.setState({
                    ...this.state,
                    orders: response.data.orders
                });

                this.interval = setInterval(() => {
                    this.setState({
                        ...this.state,
                        currTime: moment()
                    });
                }, 15000);
            });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    handleClickDone = (orderItem) => {
        axios.put("/api/kitchen/done", { orderItem: orderItem })
            .then(response => {
                this.setState({
                    ...this.state,
                    orders: response.data
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
        var ordersArr = [];
        if (this.state.orders.length !== 0) {
            ordersArr = this.state.orders.map((curr, i) => {
                return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2"
                        key={i}
                    >
                        <OrderItem currTime={this.state.currTime} orderItem={curr} handleClickDone={() => { this.handleClickDone(curr) }} />
                    </div>
                )
            });
        }
        return (
            <CorporateLayout darkTheme={true} sidebarmenu={this.state.sidebarmenu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick}>
                <div className="py-3 px-3">
                    <div className="container-fluid">
                        <div className="row mx-n3">
                            {/* ORDER ITEMS START */}
                            {/* ORDER ITEM */}
                            {
                                ordersArr
                            }

                            {/* ORDER ITEMS END */}
                        </div>
                    </div>
                </div>
            </CorporateLayout>
        );
    }
}

export default KitchenUI;