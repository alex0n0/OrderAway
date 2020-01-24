import React from 'react';
import { Link } from 'react-router-dom';

import "../css/homepage.css";
class HomePageUI extends React.Component {

    render() {
        return (
            <div className="homepage">
                <header className="flex-grow-0 flex-shrink-0">
                    <div className="imagecontainer">
                        <img src={"https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"} alt="bg" height="auto" width="100%" />
                    </div>
                    <div className="buttonbar py-3">
                        <div className="container d-flex align-items-center">
                            <Link to="/" className="mr-auto" style={{ textDecoration: "none", color: "black" }}>
                                <p className="m-0 font-24"><span className="text-primary">Order</span>Away</p>
                            </Link>

                            <div className="ml-3">
                                <Link to="/signin" className="mr-3">
                                    <button className="btn btn-outline-dark">Sign In</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="btn btn-dark">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="container color-white d-flex flex-column justify-content-center" style={{ height: "430px" }}>
                        <h1>Table Side Ordering System</h1>
                        <p>Automate Your Ordering Process Now</p>
                    </div>
                </header>

                <main className="flex-grow-1 flex-shrink-1">
                    <div>
                        <div className="container py-5 mt-5 mb-5">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="position-relative" style={{ width: "100%", paddingTop: "100%" }}>
                                        <div className="position-absolute rounded-circle bg-white" style={{ height: "80%", width: "80%", top: "50%", left: "50%", maxHeight: "300px", maxWidth: "300px", transform: "translate(-50%, -50%)" }}></div>
                                    </div>
                                    <div className="text-center">Increase Efficiency</div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="position-relative" style={{ width: "100%", paddingTop: "100%" }}>
                                        <div className="position-absolute rounded-circle bg-white" style={{ height: "80%", width: "80%", top: "50%", left: "50%", maxHeight: "300px", maxWidth: "300px", transform: "translate(-50%, -50%)" }}></div>
                                    </div>
                                    <div className="text-center">Focus On Customer Service</div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="position-relative" style={{ width: "100%", paddingTop: "100%" }}>
                                        <div className="position-absolute rounded-circle bg-white" style={{ height: "80%", width: "80%", top: "50%", left: "50%", maxHeight: "300px", maxWidth: "300px", transform: "translate(-50%, -50%)" }}></div>
                                    </div>
                                    <div className="text-center">Pass Orders to the Kitchen Instantly</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="container py-5 mt-5">
                            <div className="row">
                                <div className="col-12 col-sm-8 px-5 px-sm-0 mb-5 mb-sm-0">
                                    <img src="/pics/homescreenpic1.png" alt="asdf" width="100%" height="auto" />
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        <p className="m-0">Build menus with our menu builder</p>
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

export default HomePageUI;