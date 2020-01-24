import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import "../css/homepage.css";

class SignUpUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signupFormInputRestaurantTitle: "",
            signupFormInputEmail: "",
            signupFormInputPassword: "",
            signupFormInputOperationsPassword: "",
            buttonFormSubmitIsDisabled: false
        };

        this.handleSignupFormRestaurantTitleChange.bind(this);
        this.handleSignupFormEmailChange.bind(this);
        this.handleSignupFormPasswordChange.bind(this);
        this.handleSignupFormOperationsPasswordChange.bind(this);
        this.handleSignupFormSubmit.bind(this);

    }

    handleSignupFormRestaurantTitleChange = (e) => {
        this.setState({
            ...this.state,
            signupFormInputRestaurantTitle: e.currentTarget.value
        });
    }

    handleSignupFormEmailChange = (e) => {
        this.setState({
            ...this.state,
            signupFormInputEmail: e.currentTarget.value
        });
    }
    handleSignupFormPasswordChange = (e) => {
        this.setState({
            ...this.state,
            signupFormInputPassword: e.currentTarget.value
        });
    }
    handleSignupFormOperationsPasswordChange = (e) => {
        this.setState({
            ...this.state,
            signupFormInputOperationsPassword: e.currentTarget.value
        });
    }

    handleSignupFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.signupFormInputRestaurantTitle.trim().length > 0 && this.state.signupFormInputEmail.trim().length > 0 && this.state.signupFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            let uploadObj = { restaurantTitle: this.state.signupFormInputRestaurantTitle.trim(), iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4DBeUQNl89XWVNiNiJJHIEvfNVQEnAbYn8eecxqVxdZmtK-y5", username: this.state.signupFormInputEmail.trim(), password: this.state.signupFormInputPassword, operationsPassword: this.state.signupFormInputOperationsPassword, stream: "corporate" }

            axios.post("/api/general/signup", uploadObj)
                .then(response => {

                    if (response.data.success === true) {
                        document.cookie = `U_TKN=${response.data.token}`;
                        document.cookie = `U_ID=${response.data.uid}`;
                        document.cookie = `ORDERAWAYKEY=${response.data.orderawaykey}`;
                        console.log("sign up success");
                        this.props.history.push('/corporate/menu');
                    } else if (response.data.success === false) {
                        console.log("wrong username or password");
                        this.setState({
                            ...this.state,
                            buttonFormSubmitIsDisabled: false,
                            signupFormInputPassword: ""
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div className="homepage">
                <header className="flex-grow-0 flex-shrink-0">
                    <div className="buttonbar py-3">
                        <div className="container d-flex align-items-center">
                            <Link to="/" className="mr-auto" style={{ textDecoration: "none", color: "black" }}>
                                <p className="m-0 font-24"><span className="text-primary">Order</span>Away</p>
                            </Link>

                            <div className="ml-3">
                                <Link to="/signin" className="mr-3">
                                    <button className="btn btn-outline-dark">Sign In</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-grow-1 flex-shrink-1">
                    <div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-6 py-5">
                                    <h2 className="mb-3">Sign Up</h2>
                                    <form className="text-right bg-secondary p-3">
                                        <input
                                            type="text" placeholder="Restaurant Name"
                                            className="form-control mb-3"
                                            value={this.state.signupFormInputRestaurantTitle} onChange={this.handleSignupFormRestaurantTitleChange} />
                                        <input
                                            type="text" placeholder="Email"
                                            className="form-control mb-3"
                                            value={this.state.signupFormInputEmail} onChange={this.handleSignupFormEmailChange} />
                                        <input
                                            type="password" placeholder="Password"
                                            className="form-control mb-3"
                                            value={this.state.signupFormInputPassword} onChange={this.handleSignupFormPasswordChange} />
                                        <input
                                            type="password" placeholder="Operations Password"
                                            className="form-control mb-3"
                                            value={this.state.signupFormInputOperationsPassword} onChange={this.handleSignupFormOperationsPasswordChange} />
                                        <button
                                            className="btn btn-danger"
                                            disabled={this.state.buttonFormSubmitIsDisabled}
                                            onClick={this.handleSignupFormSubmit}>
                                            SIGN UP
                                        </button>
                                    </form>
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

export default SignUpUI;