import React from 'react';
import axios from 'axios';

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
                    console.log(response.data);
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

        if (this.state.kitchenLoginFormInputEmail.trim().length > 0 && this.state.kitchenLoginFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            let uploadObj = { username: this.state.kitchenLoginFormInputEmail.trim().toLowerCase(), password: this.state.kitchenLoginFormInputPassword, stream: "kitchen" }

            axios.post("/api/login", uploadObj)
                .then(response => {
                    console.log(response.data);
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

        if (this.state.customerLoginFormInputEmail.trim().length > 0 && this.state.customerLoginFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            let uploadObj = { username: this.state.customerLoginFormInputEmail.trim().toLowerCase(), password: this.state.customerLoginFormInputPassword, stream: "customer" }

            axios.post("/api/login", uploadObj)
                .then(response => {
                    console.log(response.data);
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
            <>
                <div className="container">
                    <h2>Sign In</h2>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <div className="bg-secondary p-3">
                                <p>Corporate</p>
                                <form className="text-right">
                                    <input
                                        type="text" placeholder="email"
                                        className="form-control my-3"
                                        value={this.state.corporateLoginFormInputEmail} onChange={this.handleCorporateLoginFormEmailChange} />
                                    <input
                                        type="password" placeholder="password"
                                        className="form-control my-3"
                                        value={this.state.corporateLoginFormInputPassword} onChange={this.handleCorporateLoginFormPasswordChange} />
                                    <button
                                        className="btn btn-danger"
                                        disabled={this.state.buttonFormSubmitIsDisabled}
                                        onClick={this.handleCorporateLoginFormSubmit}>
                                        SIGN IN
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="bg-primary p-3">
                                <p>Operations - Kitchen</p>
                                <form className="text-right">
                                    <input
                                        type="text" placeholder="email"
                                        className="form-control my-3"
                                        value={this.state.kitchenLoginFormInputEmail} onChange={this.handleKitchenLoginFormEmailChange} />
                                    <input
                                        type="password" placeholder="password"
                                        className="form-control my-3"
                                        value={this.state.kitchenLoginFormInputPassword} onChange={this.handleKitchenLoginFormPasswordChange} />
                                    <button
                                        className="btn btn-danger"
                                        disabled={this.state.buttonFormSubmitIsDisabled}
                                        onClick={this.handleKitchenLoginFormSubmit}>
                                        SIGN IN
                                    </button>
                                </form>
                            </div>
                            <div className="bg-success p-3">
                                <p>Operations - Customer</p>
                                <form className="text-right">
                                    <input
                                        type="text" placeholder="email"
                                        className="form-control my-3"
                                        value={this.state.customerLoginFormInputEmail} onChange={this.handleCustomerLoginFormEmailChange} />
                                    <input
                                        type="password" placeholder="password"
                                        className="form-control my-3"
                                        value={this.state.customerLoginFormInputPassword} onChange={this.handleCustomerLoginFormPasswordChange} />
                                    <button
                                        className="btn btn-danger"
                                        disabled={this.state.buttonFormSubmitIsDisabled}
                                        onClick={this.handleCustomerLoginFormSubmit}>
                                        SIGN IN
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginUI;