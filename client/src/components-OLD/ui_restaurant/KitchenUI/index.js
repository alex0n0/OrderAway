import React from 'react';
import moment from 'moment';
import axios from 'axios';
// import socketIOClient from 'socket.io-client';

import CorporateLayout from '../../baselayouts/CorporateLayout';
import OrderItem from '../../elements/orderitem/Kitchen';

// import order from '../../zzz/order'; // can delete this import AND delete from ./zzz
import sidebarmenu from './sidebarmenu';

class KitchenUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: undefined,
            sidebarmenu: sidebarmenu,
            sidebarMenuActiveIndex: 0,
            orders: [],
            currTime: moment(),
            tempOrders: []
        }
    }

    interval;
    // socket;

    componentDidMount() {


        axios.get("/api/kitchen")
            .then(response => {
                var tempOrders = response.data.orders;
                tempOrders.forEach(curr => {
                    curr.buttonDoneIsDisabled = false;
                });
                this.setState({
                    ...this.state,
                    restaurantId: response.data.restaurantId,
                    orders: tempOrders
                });
            });

        // this.socket = socketIOClient("localhost:5000");
        // this.socket.on("orderzzzzz", data => {
        //     console.log(data);
        //     // if (data.orderId) {
        //     //     axios.get("/api/kitchen/" + data.orderId)
        //     //         .then(response => {
        //     //             response.data.buttonDoneIsDisabled = false;
        //     //             var tempOrders = [...this.state.orders];
        //     //             tempOrders.push(response.data);

        //     //             this.setState({
        //     //                 ...this.state,
        //     //                 orders: tempOrders
        //     //             });
        //     //         });
        //     // }
        // });

        this.interval = setInterval(() => {
            axios.get("/api/kitchen")
            .then(response => {
                var tempOrders = response.data.orders;
                tempOrders.forEach(curr => {
                    curr.buttonDoneIsDisabled = false;
                });
                this.setState({
                    ...this.state,
                    orders: tempOrders,
                    currTime: moment()
                });
            });
        }, 10000);

        // this.interval = setInterval(() => {
        //     this.setState({
        //         ...this.state,
        //         currTime: moment()
        //     });
        // }, 15000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    handleClickDone = (orderItem) => {
        var tempOrders = [...this.state.orders];
        tempOrders.forEach(curr => {
            curr.buttonDoneIsDisabled = false;
        })
        var orderItemToRemoveIndex = tempOrders.findIndex(curr => {
            return curr._id === orderItem._id;
        });
        tempOrders[orderItemToRemoveIndex].buttonDoneIsDisabled = true;
        this.setState({
            ...this.state,
            orders: tempOrders
        });

        axios.put("/api/kitchen/done", { orderId: orderItem._id })
            .then(response => {
                var orderItemToRemoveIndex = tempOrders.findIndex(curr => {
                    return curr._id === orderItem._id;
                });

                if (response.data.order) {
                    if (orderItemToRemoveIndex !== -1) {
                        tempOrders.splice(orderItemToRemoveIndex, 1);
                        this.setState({
                            ...this.state,
                            orders: tempOrders
                        });
                    }
                } else {
                    if (orderItemToRemoveIndex !== -1) {
                        tempOrders[orderItemToRemoveIndex].buttonDoneIsDisabled = false;
                        this.setState({
                            ...this.state,
                            orders: tempOrders
                        });
                    }

                }
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
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2 position-relative"
                        key={i}
                    >
                        {i === 0 && this.state.orders.length !== 1 ? (<p className="startIndicator startIndicator--oldest m-0 h-100">OLDEST</p>) : ""}
                        {i === this.state.orders.length - 1 && this.state.orders.length !== 1 ? (<p className="startIndicator startIndicator--newest m-0 h-100">NEWEST</p>) : ""}

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