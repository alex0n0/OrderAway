import React from 'react';
import axios from 'axios';
import moment from 'moment';

import '../../../css/corporate_home.css';

class CorporateHomeUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: false,
            uid: undefined,
            orderawaykey: undefined,
            restaurantId: undefined,
            bills: []
        };
    }

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
            axios.post("/api/allrevenue", { uid: uid[1], orderawaykey: orderawaykey[1] }, { headers: { Authorization: "Bearer " + token[1] } })
                .then(response => {
                    if (response.data.success === false) {
                        if (response.data.path) {
                            this.props.history.push(response.data.path);
                        } else {
                            this.props.history.push("/signin");
                        }
                    } else {
                        if (response.data.restaurant) {
                            this.props.liftRestuarantTitle(response.data.restaurant.restaurantTitle, response.data.restaurant.iconUrl);
                        }
                        if (response.data.bills.length > 0) {
                            this.setState({
                                ...this.state,
                                restaurantId: response.data.restaurant._id,
                                bills: response.data.bills
                            });
                            console.log(response.data.bills);
                        } else {
                            this.setState({
                                ...this.state,
                                restaurantId: response.data.restaurant._id,
                            });
                        }
                    }
                });
        } else {
            this.props.history.push("/signin");
        }

    }


    render() {

        var currWeekRevenue = 0;
        var currMonthRevenue = 0;
        var prevMonthRevenue = 0;

        var tempBills = this.state.bills;
        var currWeek = parseInt(moment(moment().subtract(parseInt(moment().format("d")) - 1, "days").format("YYYY-MM-DD") + " 00:00", "YYYY-MM-DD HH:mm").format("X"));
        var currMonth = parseInt(moment(moment().format("YYYY-MM") + "-01 00:00", "YYYY-MM-DD HH:mm").format("X"));
        var prevMonth = parseInt(moment(currMonth, "X").subtract(1, "months").format("X"));

        var currMonthBills = tempBills.filter(curr => {
            return curr.endTime >= currMonth;
        });

        tempBills.forEach(curr => {
            if (curr.endTime >= currWeek) {
                currWeekRevenue += curr.subtotal;
            }
            if (curr.endTime >= currMonth) {
                currMonthRevenue += curr.subtotal;
            }
            if (curr.endTime >= prevMonth && curr.endTime <= currMonth) {
                prevMonthRevenue += curr.subtotal;
            }
        });

        return (
            <div className="corporatehome">
                <div className="container">
                    <div className="main-content-content pb-5">
                        <h1 className="mb-4">Overview</h1>

                        <div className="mb-3 row mb-3">
                            <div className="col-12 col-sm-6 col-lg-4 mb-3">
                                <div className="bg-white p-3 d-flex flex-column h-100 align-items-center">
                                    <p className="m-0 font-30">${currWeekRevenue.toFixed(2)}</p>
                                    <p className="m-0"><b className="text-nowrap">This Week</b>&nbsp;<b className="text-nowrap">(From Monday)</b></p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4 mb-3">
                                <div className="bg-white p-3 d-flex flex-column h-100 align-items-center">
                                    <p className="m-0 font-30">${currMonthRevenue.toFixed(2)}</p>
                                    <p className="m-0"><b>This Month</b></p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 offset-sm-6 offset-lg-0 col-lg-4 mb-3">
                                <div className="border border-secondary color-black-06 p-3 d-flex flex-column h-100 align-items-center">
                                    <p className="m-0 font-30">${prevMonthRevenue.toFixed(2)}</p>
                                    <p className="m-0"><b>Last Month</b></p>
                                </div>
                            </div>

                        </div>


                        {/* <div className="mb-4 row">
                            <div className="col-12">
                                <div className="bg-white p-3">
                                    <img src="https://datavizcatalogue.com/methods/images/top_images/line_graph.png" width="100%" height="auto" />
                                </div>
                            </div>
                        </div> */}


                        <div className="mb-4 row">
                            <div className="col-12">
                                <div className="bg-white p-3">

                                    <div className="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row overflow-hidden px-2 mb-3">
                                        <h3 className="m-0 mr-3 text-nowrap">{moment().format("MMMM")} Sales</h3>
                                        <p className="m-0 font-12 color-black-06 text-nowrap">Showing {currMonthBills.length} row{currMonthBills.length === 1 ? "" : "s"}</p>
                                    </div>

                                    <table className="table table-borderless table-responsive-sm w-100 p-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">Time</th>
                                                <th scope="col" className="text-right">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currMonthBills.map((curr, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="text-nowrap pr-5 d-flex flex-column flex-sm-row">
                                                                <p className="m-0">{moment(curr.endTime, "X").format("DD MMM YYYY")}</p>
                                                                <span className="d-none d-sm-block">&nbsp;&middot;&nbsp;</span>
                                                                <p className="m-0">{moment(curr.endTime, "X").format("h:mm A")}</p>
                                                            </td>
                                                            <td className="text-nowrap text-right">${curr.subtotal.toFixed(2)}</td>
                                                        </tr>

                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CorporateHomeUI;