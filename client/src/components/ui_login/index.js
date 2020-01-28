import React from 'react';
import axios from 'axios';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { Link } from 'react-router-dom';

import "../css/homepage.css";

class LoginUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            corporateLoginFormInputEmail: "",
            corporateLoginFormInputPassword: "",

            kitchenLoginFormInputEmail: "",
            kitchenLoginFormInputPassword: "",

            customerLoginFormInputEmail: "",
            customerLoginFormInputPassword: "",

            buttonFormSubmitIsDisabled: false
        };

        this.handleCorporateLoginFormEmailChange.bind(this);
        this.handleCorporateLoginFormPasswordChange.bind(this);
        this.handleCorporateLoginFormSubmit.bind(this);

        this.handleKitchenLoginFormEmailChange.bind(this);
        this.handleKitchenLoginFormPasswordChange.bind(this);
        this.handleKitchenLoginFormSubmit.bind(this);

        this.handleCustomerLoginFormEmailChange.bind(this);
        this.handleCustomerLoginFormPasswordChange.bind(this);
        this.handleCustomerLoginFormSubmit.bind(this);

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
            axios.post("/api/login/redirecttest", { uid: uid[1], orderawaykey: orderawaykey[1] }, { headers: { Authorization: "Bearer " + token[1] } })
                .then(response => {
                    console.log(response.data);
                    if (response.data.streamFound) {
                        this.props.history.push(response.data.path);
                    }
                });
        }
    }

    // Corporate login functions
    handleCorporateLoginFormEmailChange = (e) => {
        this.setState({
            ...this.state,
            corporateLoginFormInputEmail: e.currentTarget.value
        });
    }
    handleCorporateLoginFormPasswordChange = (e) => {
        this.setState({
            ...this.state,
            corporateLoginFormInputPassword: e.currentTarget.value
        });
    }

    handleCorporateLoginFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.corporateLoginFormInputEmail.trim().length > 0 && this.state.corporateLoginFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            let uploadObj = { username: this.state.corporateLoginFormInputEmail.trim().toLowerCase(), password: this.state.corporateLoginFormInputPassword, stream: "corporate" }

            axios.post("/api/login", uploadObj)
                .then(response => {
                    if (response.data.success === true) {
                        document.cookie = `U_TKN=${response.data.token}; path=/`;
                        document.cookie = `U_ID=${response.data.uid}; path=/`;
                        document.cookie = `ORDERAWAYKEY=${response.data.orderawaykey}; path=/`;

                        this.props.history.push('/corporate');
                    } else if (response.data.success === false) {
                        console.log("wrong username or password");
                        this.setState({
                            ...this.state,
                            buttonFormSubmitIsDisabled: false,
                            corporateLoginFormInputPassword: "",
                            kitchenLoginFormInputPassword: "",
                            customerLoginFormInputPassword: "",
                        });
                    }
                });
        }
    }


    // Kitchen login functions
    handleKitchenLoginFormEmailChange = (e) => {
        this.setState({
            ...this.state,
            kitchenLoginFormInputEmail: e.currentTarget.value
        });
    }
    handleKitchenLoginFormPasswordChange = (e) => {
        this.setState({
            ...this.state,
            kitchenLoginFormInputPassword: e.currentTarget.value
        });
    }

    handleKitchenLoginFormSubmit = (e) => {
        e.preventDefault();

        // if (this.state.kitchenLoginFormInputEmail.trim().length > 0 && this.state.kitchenLoginFormInputPassword.length > 0) {
        if (this.state.corporateLoginFormInputEmail.trim().length > 0 && this.state.kitchenLoginFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            // let uploadObj = { username: this.state.kitchenLoginFormInputEmail.trim().toLowerCase(), password: this.state.kitchenLoginFormInputPassword, stream: "kitchen" }
            let uploadObj = { username: this.state.corporateLoginFormInputEmail.trim().toLowerCase(), password: this.state.kitchenLoginFormInputPassword, stream: "kitchen" }

            axios.post("/api/login", uploadObj)
                .then(response => {
                    if (response.data.success === true) {
                        document.cookie = `U_TKN=${response.data.token}; path=/`;
                        document.cookie = `U_ID=${response.data.uid}; path=/`;
                        document.cookie = `ORDERAWAYKEY=${response.data.orderawaykey}; path=/`;
                        this.props.history.push('/kitchen');
                    } else if (response.data.success === false) {
                        console.log("wrong username or password");
                        this.setState({
                            ...this.state,
                            buttonFormSubmitIsDisabled: false,
                            corporateLoginFormInputPassword: "",
                            kitchenLoginFormInputPassword: "",
                            customerLoginFormInputPassword: "",
                        });
                    }
                });
        }
    }





    // Customer login functions
    handleCustomerLoginFormEmailChange = (e) => {
        this.setState({
            ...this.state,
            customerLoginFormInputEmail: e.currentTarget.value
        });
    }
    handleCustomerLoginFormPasswordChange = (e) => {
        this.setState({
            ...this.state,
            customerLoginFormInputPassword: e.currentTarget.value
        });
    }

    handleCustomerLoginFormSubmit = (e) => {
        e.preventDefault();

        // if (this.state.customerLoginFormInputEmail.trim().length > 0 && this.state.customerLoginFormInputPassword.length > 0) {
        if (this.state.corporateLoginFormInputEmail.trim().length > 0 && this.state.customerLoginFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            // let uploadObj = { username: this.state.customerLoginFormInputEmail.trim().toLowerCase(), password: this.state.customerLoginFormInputPassword, stream: "customer" }
            let uploadObj = { username: this.state.corporateLoginFormInputEmail.trim().toLowerCase(), password: this.state.customerLoginFormInputPassword, stream: "customer" }

            axios.post("/api/login", uploadObj)
                .then(response => {
                    if (response.data.success === true) {
                        document.cookie = `U_TKN=${response.data.token}; path=/`;
                        document.cookie = `U_ID=${response.data.uid}; path=/`;
                        document.cookie = `ORDERAWAYKEY=${response.data.orderawaykey}; path=/`;
                        this.props.history.push('/customer');
                    } else if (response.data.success === false) {
                        console.log("wrong username or password");
                        this.setState({
                            ...this.state,
                            buttonFormSubmitIsDisabled: false,
                            corporateLoginFormInputPassword: "",
                            kitchenLoginFormInputPassword: "",
                            customerLoginFormInputPassword: "",
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div className="homepage">
                <header className="flex-grow-0 flex-shrink-0 pageMinWidth">
                    <div className="buttonbar py-3 pageMinWidth">
                        <div className="container d-flex align-items-center">
                            <Link to="/" className="mr-auto" style={{ textDecoration: "none", color: "black" }}>
                                <p className="m-0 font-24"><span className="text-primary">Order</span>Away</p>
                            </Link>

                            <div className="ml-3">
                                <Link to="/signup">
                                    <button className="btn btn-dark">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow-1 flex-shrink-1 pageMinWidth">
                    <div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 py-5">

                                    <h2 className="mb-3">Sign In</h2>
                                    <Tabs defaultActiveKey="corporate" transition={false} className="tabs--login">
                                        <Tab eventKey="corporate" title="Corporate">
                                            <div className="border border-top-0 p-3 bg-secondary color-white-09">
                                                <p>Business Details &amp; Menu Manager</p>
                                                <form>
                                                    <label htmlFor="corporateEmail" className="small">Email</label>
                                                    <input
                                                        id="corporateEmail"
                                                        type="text" placeholder="Email"
                                                        className="form-control mb-3"
                                                        value={this.state.corporateLoginFormInputEmail} onChange={this.handleCorporateLoginFormEmailChange} />
                                                    <label htmlFor="corporatePassword" className="small">Corporate Password</label>
                                                    <input
                                                        id="corporatePassword"
                                                        type="password" placeholder="Password"
                                                        className="form-control mb-3"
                                                        value={this.state.corporateLoginFormInputPassword} onChange={this.handleCorporateLoginFormPasswordChange} />
                                                    <div className="d-flex">
                                                        <button
                                                            className="btn btn-danger ml-auto"
                                                            disabled={this.state.buttonFormSubmitIsDisabled}
                                                            onClick={this.handleCorporateLoginFormSubmit}>
                                                            SIGN IN
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="kitchen" title="Kitchen">
                                            <div className="border border-top-0 p-3 bg-secondary color-white-09">
                                                <p>Current &amp; Past Orders</p>
                                                <form>
                                                    <label htmlFor="kitchenEmail" className="small">Email</label>
                                                    <input
                                                        id="kitchenEmail"
                                                        type="text" placeholder="Email"
                                                        className="form-control mb-3"
                                                        // value={this.state.kitchenLoginFormInputEmail} onChange={this.handleKitchenLoginFormEmailChange} />
                                                        value={this.state.corporateLoginFormInputEmail} onChange={this.handleCorporateLoginFormEmailChange} />
                                                    <label htmlFor="kitchenPassword" className="small">Operations Password</label>
                                                    <input
                                                        id="kitchenPassword"
                                                        type="password" placeholder="Password"
                                                        className="form-control mb-3"
                                                        value={this.state.kitchenLoginFormInputPassword} onChange={this.handleKitchenLoginFormPasswordChange} />
                                                    <div className="d-flex">
                                                        <button
                                                            className="btn btn-danger ml-auto"
                                                            disabled={this.state.buttonFormSubmitIsDisabled}
                                                            onClick={this.handleKitchenLoginFormSubmit}>
                                                            SIGN IN
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="customer" title="Customer">
                                            <div className="border border-top-0 p-3 bg-secondary color-white-09">
                                                <p>Table-Side Ordering Interface</p>

                                                <form>
                                                    <label htmlFor="customerEmail" className="small">Email</label>
                                                    <input
                                                        id="customerEmail"
                                                        type="text" placeholder="Email"
                                                        className="form-control mb-3"
                                                        // value={this.state.customerLoginFormInputEmail} onChange={this.handleCustomerLoginFormEmailChange} />
                                                        value={this.state.corporateLoginFormInputEmail} onChange={this.handleCorporateLoginFormEmailChange} />
                                                    <label htmlFor="customerPassword" className="small">Operations Password</label>
                                                    <input
                                                        id="customerPassword"
                                                        type="password" placeholder="Password"
                                                        className="form-control mb-3"
                                                        value={this.state.customerLoginFormInputPassword} onChange={this.handleCustomerLoginFormPasswordChange} />

                                                    <div className="d-flex">
                                                        <button
                                                            className="btn btn-danger ml-auto"
                                                            disabled={this.state.buttonFormSubmitIsDisabled}
                                                            onClick={this.handleCustomerLoginFormSubmit}>
                                                            SIGN IN
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="flex-grow-0 flex-shrink-0 bg-dark color-white-06 pageMinWidth">
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

export default LoginUI;