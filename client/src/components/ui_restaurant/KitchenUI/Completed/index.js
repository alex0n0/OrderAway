import React from 'react';
import moment from 'moment';
import axios from 'axios';
// import socketIOClient from 'socket.io-client';

import CorporateLayout from '../../../baselayouts/CorporateLayout';
import OrderItem from '../../../elements/orderitem/KitchenCompleted';

// import order from '../../zzz/order'; // can delete this import AND delete from ./zzz
import sidebarmenu from '../sidebarmenu';

class KitchenCompletedUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            uid: undefined,
            orderawaykey: undefined,
            sidebarmenu: sidebarmenu,
            sidebarMenuActiveIndex: 1,
            orders: [],
            currTime: moment(),
            tempOrders: [],
            restaurant: {
                restaurantTitle: "",
                iconUrl: ""
            }
        }
    }

    interval;
    // socket;

    componentDidMount() {
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

        if (token) {
            this.setState({
                ...this.state,
                token: token[1],
                uid: uid[1],
                orderawaykey: orderawaykey[1]
            });


            axios.post("/api/kitchen/completed", { uid: uid[1], orderawaykey: orderawaykey[1] }, { headers: { Authorization: "Bearer " + token[1] } })
                .then(response => {
                    if (response.data.success === false) {
                        // this.props.history.push("/signin");
                        if (response.data.path) {
                            this.props.history.push(response.data.path);
                        } else {
                            this.props.history.push("/signin");
                        }
                    } else {
                        if (response.data.restaurant) {
                            this.setState({
                                ...this.state,
                                restaurant: {
                                    restaurantTitle: response.data.restaurant.restaurantTitle,
                                    iconUrl:response.data.restaurant.iconUrl
                                }
                            });
                        }
                        var tempOrders = response.data.orders;
                        tempOrders.forEach(curr => {
                            curr.buttonDoneIsDisabled = false;
                        });
                        this.setState({
                            ...this.state,
                            orders: tempOrders
                        });
                    }
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
                axios.post("/api/kitchen/completed", { uid: this.state.uid, orderawaykey: this.state.orderawaykey  }, { headers: { Authorization: "Bearer " + this.state.token } })
                    .then(response => {
                        if (response.data.success === false) {
                            if (response.data.path) {
                                this.props.history.push(response.data.path);
                            } else {
                                this.props.history.push("/signin");
                            }
                        } else {
                            var tempOrders = response.data.orders;
                            tempOrders.forEach(curr => {
                                curr.buttonDoneIsDisabled = false;
                            });
                            this.setState({
                                ...this.state,
                                orders: tempOrders,
                                currTime: moment()
                            });
                        }
                    });
            }, 10000);

            // this.interval = setInterval(() => {
            //     this.setState({
            //         ...this.state,
            //         currTime: moment()
            //     });
            // }, 15000);
        } else {
            this.props.history.push("/signin");
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    handleSidebarOptionClick = (i) => {
        this.setState({
            ...this.state,
            sidebarMenuActiveIndex: i
        });
    }

    render() {
        var ordersArr = [];
        if (this.state.orders.length > 0) {
            ordersArr = this.state.orders.map((curr, i) => {
                return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2 position-relative"
                        key={i}
                    >
                        {i === 0 && this.state.orders.length !== 1 ? (<p className="startIndicator startIndicator--oldest m-0 h-100">NEWEST</p>) : ""}
                        {i === this.state.orders.length - 1 && this.state.orders.length !== 1 ? (<p className="startIndicator startIndicator--newest m-0 h-100">OLDEST</p>) : ""}

                        <OrderItem currTime={this.state.currTime} orderItem={curr} />
                    </div>
                )
            });
        }
        return (
            <CorporateLayout darkTheme={true} sidebarmenu={this.state.sidebarmenu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history} restaurant={this.state.restaurant}>
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

export default KitchenCompletedUI;