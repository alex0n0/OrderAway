import React from 'react';
import axios from 'axios';

class SignUpUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signupFormInputRestaurantTitle: "",
            signupFormInputEmail: "",
            signupFormInputPassword: "",
            buttonFormSubmitIsDisabled: false
        };

        this.handleSignupFormRestaurantTitleChange.bind(this);
        this.handleSignupFormEmailChange.bind(this);
        this.handleSignupFormPasswordChange.bind(this);
        this.handleSignupFormSubmit.bind(this);

    }

    handleSignupFormRestaurantTitleChange = (e) => {
        // e.preventDefault();
        this.setState({
            ...this.state,
            signupFormInputRestaurantTitle: e.currentTarget.value
        });
    }

    handleSignupFormEmailChange = (e) => {
        // e.preventDefault();
        this.setState({
            ...this.state,
            signupFormInputEmail: e.currentTarget.value
        });
    }
    handleSignupFormPasswordChange = (e) => {
        // e.preventDefault();
        this.setState({
            ...this.state,
            signupFormInputPassword: e.currentTarget.value
        });
    }

    handleSignupFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.signupFormInputRestaurantTitle.trim().length > 0 && this.state.signupFormInputEmail.trim().length > 0 && this.state.signupFormInputPassword.length > 0) {
            this.setState({
                ...this.state,
                buttonFormSubmitIsDisabled: true
            });

            let uploadObj = { restaurantTitle: this.state.signupFormInputRestaurantTitle.trim(), iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hungry_Jack%27s.svg/1200px-Hungry_Jack%27s.svg.png", username: this.state.signupFormInputEmail.trim(), password: this.state.signupFormInputPassword }

            axios.post("/api/general/signup", uploadObj)
                .then(response => {

                    if (response.data.success === true) {
                        document.cookie = `U_TKN=${response.data.token}`;
                        document.cookie = `U_ID=${response.data.uid}`;
                        this.props.history.push('/corporate/menu');
                    } else if (response.data.success === false) {
                        console.log("fix your shit");                        
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
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 py-5">
                            <h2>Sign Up</h2>
                            <form>
                                <input
                                    type="text" placeholder="Restaurant Name"
                                    className="form-control my-3"
                                    value={this.state.signupFormInputRestaurantTitle} onChange={this.handleSignupFormRestaurantTitleChange} />
                                <input
                                    type="text" placeholder="Email"
                                    className="form-control my-3"
                                    value={this.state.signupFormInputEmail} onChange={this.handleSignupFormEmailChange} />
                                <input
                                    type="password" placeholder="Password"
                                    className="form-control my-3"
                                    value={this.state.signupFormInputPassword} onChange={this.handleSignupFormPasswordChange} />
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
            </>
        );
    }
}

export default SignUpUI;