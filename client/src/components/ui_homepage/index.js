import React from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

import "../css/homepage.css";
class HomePageUI extends React.Component {

    GATestClick = () => {
        console.log("click");
        ReactGA.event({
            category: 'User',
            action: 'Tester Click - Homepage'
        });
    }

    render() {
        return (
            <div className="homepage">
                <header className="flex-grow-0 flex-shrink-0 pageMinWidth">
                    <div className="imagecontainer">
                        {/* <img src={"https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"} alt="bg" /> */}
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
                        <p className="font-24">Automate Your Ordering Process Now</p>
                        <Link to="/signup">
                            <button className="btn btn-light rounded-pill px-5 py-3"><b>SIGN UP</b></button>
                        </Link>
                    </div>
                </header>

                <main className="flex-grow-1 flex-shrink-1 pageMinWidth">
                    <div>
                        <div className="container py-5 mb-5">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="position-relative" style={{ width: "100%", paddingTop: "100%" }}>
                                        <div className="position-absolute rounded-circle bg-white d-flex align-items-center justify-content-center overflow-hidden" style={{ height: "80%", width: "80%", bottom: "10%", left: "50%", maxHeight: "300px", maxWidth: "300px", transform: "translateX(-50%)" }}>
                                            <i className="material-icons homepage-icon">alarm_on</i>
                                        </div>
                                    </div>
                                    <div className="text-center">Increase Efficiency</div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="position-relative" style={{ width: "100%", paddingTop: "100%" }}>
                                        <div className="position-absolute rounded-circle bg-white d-flex align-items-center justify-content-center overflow-hidden" style={{ height: "80%", width: "80%", bottom: "10%", left: "50%", maxHeight: "300px", maxWidth: "300px", transform: "translateX(-50%)" }}>
                                            <i className="material-icons homepage-icon">accessibility_new</i>
                                        </div>
                                    </div>
                                    <div className="text-center">Focus On Customer Service</div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="position-relative" style={{ width: "100%", paddingTop: "100%" }}>
                                        <div className="position-absolute rounded-circle bg-white d-flex align-items-center justify-content-center overflow-hidden" style={{ height: "80%", width: "80%", bottom: "10%", left: "50%", maxHeight: "300px", maxWidth: "300px", transform: "translateX(-50%)" }}>
                                            <i className="material-icons homepage-icon">trending_up</i>
                                        </div>
                                    </div>
                                    <div className="text-center">Pass Orders to the Kitchen Instantly</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="container py-5 mt-5">
                            <div className="row justify-content-between mb-5 mt-5">
                                <div className="col-12 col-sm-5 px-5 px-sm-0 mb-5 mb-sm-0 d-flex align-items-center">
                                    <img src="/pics/homescreenpic1.png" alt="asdf" className="rounded shadow" width="100%" height="auto" />
                                </div>
                                <div className="col-12 col-sm-5">
                                    <div className="h-100 d-flex flex-column justify-content-center">
                                        <p className="m-0 font-24 text-center"><b>ORDERING INTERFACE</b></p>
                                        <p className="m-0 font-24 text-center">Allow customers to order on table devices at their table.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-between mb-5">
                                <div className="col-12 col-sm-5 order-2 order-sm-1">
                                    <div className="h-100 d-flex flex-column justify-content-center">
                                        <p className="m-0 font-24 text-center"><b>KITCHEN INTERFACE</b></p>
                                        <p className="m-0 font-24 text-center">Send customer orders directly to the kitchen.</p>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-5 order-1 order-sm-2 px-5 px-sm-0 mb-5 mb-sm-0 d-flex align-items-center">
                                    <img src="/pics/homescreenpic2.png" alt="asdf" className="rounded shadow" width="100%" height="auto" />
                                </div>
                            </div>

                            <div className="row justify-content-between mb-5">
                                <div className="col-12 col-sm-5 px-5 px-sm-0 mb-5 mb-sm-0 d-flex align-items-center">
                                    <img src="/pics/homescreenpic3.png" alt="asdf" className="rounded shadow" width="100%" height="auto" />
                                </div>
                                <div className="col-12 col-sm-5">
                                    <div className="h-100 d-flex flex-column justify-content-center">
                                        <p className="m-0 font-24 text-center"><b>MENU BUILDER INTERFACE</b></p>
                                        <p className="m-0 font-24 text-center">Build menus with our menu builder.</p>
                                    </div>
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
                                    <i className="material-icons mr-3">mail</i><p className="m-0">orderaway@gmail.com</p><button className="button--transparent button--invisible" onClick={this.GATestClick}>asdf</button>
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