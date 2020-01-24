import React from 'react';
// import { Link } from 'react-router-dom';

import axios from 'axios';

import "../../../css/homepage.css";

class CustomerTableSelectorUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTableNumber: "",
        }
        this.handleInputChangeTableNumber.bind(this);
        this.handleButtonClickAddInput.bind(this);
        this.handleButtonClickRemoveInput.bind(this);
    }

    // if not signed in, redirect to sign in
    // if table number exists, redirect to menu
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
        // console.log(orderawaykey);
        var uTableNumber = cookiesArr.find(curr => {
            return curr[0] === "U_TABLE_NUMBER";
        });

        if (token && uid && orderawaykey) {
            axios.post("/api/customer/redirect", { uid: uid[1], orderawaykey: orderawaykey[1] }, { headers: { Authorization: "Bearer " + token[1] } })
                .then(response => {
                    if (response.data.success === false) {
                        if (response.data.path) {
                            this.props.history.push(response.data.path);
                        } else {
                            this.props.history.push("/signin");
                        }
                    } else {
                        if (uTableNumber) {
                            this.props.history.push("/customer/menu");
                        }
                    }
                });
        } else {
            this.props.history.push("/signin");
        }
    }

    handleButtonClickSignOut = () => {
        document.cookie = "U_TKN=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "U_ID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "ORDERAWAYKEY=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "U_CURR_BILL=; path=/customer; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "U_TABLE_NUMBER=; path=/customer; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        this.props.history.push("/signin");

    }

    handleInputChangeTableNumber = (e) => {
        var tableNumberString = e.currentTarget.value;
        if (tableNumberString.search(/[^0-9]/) === -1) {
            this.setState({
                ...this.state,
                inputTableNumber: e.currentTarget.value
            });
        }
    }

    handleButtonClickAddInput = (e) => {
        var string = this.state.inputTableNumber;
        string += e.currentTarget.innerText;
        this.setState({
            ...this.state,
            inputTableNumber: string
        });
    }
    handleButtonClickClearInput = (e) => {
        var string = "";
        this.setState({
            ...this.state,
            inputTableNumber: string
        });
    }
    handleButtonClickRemoveInput = (e) => {
        var string = this.state.inputTableNumber;
        string = string.substring(0, string.length - 1);
        this.setState({
            ...this.state,
            inputTableNumber: string
        });
    }

    handleButtonClickTableNumberCheck = () => {
        var tableNumber = parseInt(this.state.inputTableNumber.trim());
        if (tableNumber) {
            document.cookie = `U_TABLE_NUMBER=${tableNumber}; path=/customer;`;
            window.location.reload();
            // var cookies = document.cookie;
            // var cookiesArr = cookies.split(";").map(curr => curr.trim());
            // cookiesArr = cookiesArr.map(curr => curr.split("=").map(curr => curr.trim()));
            // var uTableNumber = cookiesArr.find(curr => {
            //     return curr[0] === "U_TABLE_NUMBER";
            // });
            // console.log(uTableNumber);
            // if (uTableNumber) {
            //     this.props.history.push("/customer/menu");
            // }
        }
    }

    render() {
        return (
            <div className="homepage">
                <header className="flex-grow-0 flex-shrink-0">
                    <div className="buttonbar py-3">
                        <div className="container d-flex align-items-center">
                            {/* <Link to="/" className="mr-auto" style={{ textDecoration: "none", color: "black" }}>
                                <p className="m-0 font-24"><span className="text-primary">Order</span>Away</p>
                            </Link> */}

                            <div className="ml-auto">
                                <button className="btn btn-danger" onClick={this.handleButtonClickSignOut}>SIGN OUT</button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow-1 flex-shrink-1">
                    <div className="pageMinWidth">
                        <div className="container py-5">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6">
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <p className="m-0 text-center">SET TABLE NUMBER</p>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <input className="form-control" value={this.state.inputTableNumber} onChange={this.handleInputChangeTableNumber} readOnly />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>9</button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>8</button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>7</button>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>6</button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>5</button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>4</button>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>3</button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>2</button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>1</button>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <button className="button--transparent bg-warning rounded w-100 border border-secondary " onClick={this.handleButtonClickClearInput} style={{ height: "80px" }}>
                                                <i className="material-icons">close</i>
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-light rounded w-100 border border-secondary " onClick={this.handleButtonClickAddInput} style={{ height: "80px" }}>0</button>
                                        </div>
                                        <div className="col-4">
                                            <button className="button--transparent bg-warning rounded w-100 border border-secondary " onClick={this.handleButtonClickRemoveInput} style={{ height: "80px" }}>
                                                <i className="material-icons">backspace</i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <button className="btn btn-dark btn-block"
                                                onClick={this.handleButtonClickTableNumberCheck}>
                                                USE THIS NUMBER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="flex-grow-0 flex-shrink-0 bg-dark color-white-06">
                    <div className="container py-5 my-5">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <div className="d-flex align-items-center mb-2 text-nowrap">
                                    <i className="material-icons mr-3">phone</i><p className="m-0">1234 5678</p>
                                </div>
                                <div className="d-flex align-items-center text-nowrap">
                                    <i className="material-icons mr-3">mail</i><p className="m-0">orderaway@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default CustomerTableSelectorUI;