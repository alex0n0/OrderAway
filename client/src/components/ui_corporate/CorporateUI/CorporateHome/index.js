import React from 'react';
import axios from 'axios';
import moment from 'moment';

// import Pagination from 'react-bootstrap/Pagination'

import '../../../css/corporate_home.css';

class CorporateHomeUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: false,
            uid: undefined,
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

        if (token) {
            this.setState({
                ...this.state,
                token: token[1],
                uid: uid[1]
            });
            axios.post("/api/allrevenue", { uid: uid[1] }, { headers: { Authorization: "Bearer " + token[1] } })
                .then(response => {
                    if (response.data.success === false) {
                        this.props.history.push("/signin");
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
        var currMonth = parseInt(moment(moment().format("YYYY-MM") + "-01 00:00", "YYYY-MM-DD HH:mm").format("X"));
        var prevMonth = parseInt(moment(currMonth, "X").subtract(1, "months").format("X"));

        var currMonthBills = tempBills.filter(curr => {
            return curr.endTime >= currMonth;
        });

        tempBills.forEach(curr => {
            currWeekRevenue += curr.subtotal;
            if (curr.endTime >= currMonth) {
                currMonthRevenue += curr.subtotal;
            }
            if (curr.endTime >= prevMonth && curr.endTime <= currMonth ) {
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
                                    <p className="m-0"><b>This Week</b></p>
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
                                        <p className="m-0 font-12 color-black-06 text-nowrap">Showing 300 rows</p>
                                        {/* <p className="m-0 mr-3">Show</p>
                                        <select className="form-control" style={{ width: "100px" }}>
                                            <option>20</option>
                                            <option>30</option>
                                            <option>All</option>
                                        </select> */}
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
                                                        // <div
                                                        //     className="mb-3 p-3 border-bottom"
                                                        //     key={i}>
                                                        //     <p className="m-0">{moment(curr.endTime, "X").format("YYYY-MM-DD hh:mm A")} | ${curr.subtotal.toFixed(2)}</p>
                                                        // </div>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    {/* <p className="m-0 font-12 color-black-06 text-right">Showing 20 of 300 rows</p>
                                    <div className="d-flex justify-content-center">
                                        <Pagination>
                                            <Pagination.Prev />
                                            <Pagination.Item active>{1}</Pagination.Item>
                                            <Pagination.Item>{2}</Pagination.Item>
                                            <Pagination.Item>{3}</Pagination.Item>
                                            <Pagination.Item>{4}</Pagination.Item>
                                            <Pagination.Item>{5}</Pagination.Item>
                                            <Pagination.Item>{6}</Pagination.Item>
                                            <Pagination.Item>{7}</Pagination.Item>
                                            <Pagination.Next />
                                        </Pagination>
                                    </div> */}
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