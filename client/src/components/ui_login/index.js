import React from 'react';
import axios from 'axios';

class LoginUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginFormInputEmail: "",
            loginFormInputPassword: "",
            buttonFormSubmitIsDisabled: false
        };

        this.handleLoginFormEmailChange.bind(this);
        this.handleLoginFormPasswordChange.bind(this);
        this.handleLoginFormSubmit.bind(this);

    }

    handleLoginFormEmailChange = (e) => {
        // e.preventDefault();
        this.setState({
            ...this.state,
            loginFormInputEmail: e.currentTarget.value
        });
    }
    handleLoginFormPasswordChange = (e) => {
        // e.preventDefault();
        this.setState({
            ...this.state,
            loginFormInputPassword: e.currentTarget.value
        });
    }

    handleLoginFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.loginFormInputEmail.trim().length > 0 && this.state.loginFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            let uploadObj = { username: this.state.loginFormInputEmail.trim(), password: this.state.loginFormInputPassword }

            axios.post("/api/general/processlogin", uploadObj)
                .then(response => {
                    // console.log(response.data);
                    if (response.data.success === true) {
                        document.cookie = `U_TKN=${response.data.token}`;
                        document.cookie = `U_ID=${response.data.uid}`;
                        this.props.history.push('/corporate/menu');
                    } else if (response.data.success === false) {
                        console.log("fix your shit");
                        this.setState({
                            ...this.state,
                            buttonFormSubmitIsDisabled: false,
                            loginFormInputPassword: ""
                        });
                    }
                });
        }
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 py-5">
                            <h2>Sign In</h2>
                            <form>
                                <input
                                    type="text" placeholder="email"
                                    className="form-control my-3"
                                    value={this.state.loginFormInputEmail} onChange={this.handleLoginFormEmailChange} />
                                <input
                                    type="password" placeholder="password"
                                    className="form-control my-3"
                                    value={this.state.loginFormInputPassword} onChange={this.handleLoginFormPasswordChange} />
                                <button
                                    className="btn btn-danger"
                                    disabled={this.state.buttonFormSubmitIsDisabled}
                                    onClick={this.handleLoginFormSubmit}>
                                    SIGN IN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginUI;