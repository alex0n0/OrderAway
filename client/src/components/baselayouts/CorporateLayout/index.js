import React from 'react';
import { Link } from 'react-router-dom';


import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';

import '../../css/baselayouts_corporate.css';

class CorporateLayout extends React.Component {
    // componentDidMount() {
    //     console.log(this.props.history);
    // }

    handleButtonClickSignOut = () => {
        document.cookie = "U_TKN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "U_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        this.props.history.push("/signin");
    }

    render() {
        return (
            <>
                <header className={this.props.darkTheme ? "corporate header-navigation shadow--basic darkTheme" : "corporate header-navigation shadow--basic"}>
                    <div className="container-fluid pageMinWidth h-100 p-0 d-flex align-items-center flex-nowrap">
                        <button className="button--transparent h-100 px-4 mr-auto font-24"><span className="text-primary">Order</span><span>Away</span></button>

                        <Dropdown className="h-100">
                            <DropdownToggle id="dropdown-basic" className="bg-transparent h-100 border-0 rounded-0 shadow-none">
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    <div
                                        className={this.props.darkTheme ? "mr-1 mr-md-3 rounded-circle bg-light overflow-hidden d-flex align-items-center justify-content-center":"mr-1 mr-md-3 rounded-circle bg-dark overflow-hidden d-flex align-items-center justify-content-center"}
                                        style={{ height: "48px", width: "48px" }}>
                                        {
                                            this.props.restaurant.iconUrl ? 
                                            (<img src={this.props.restaurant.iconUrl} alt="restaurant logo" height="auto" width="70%" />)
                                            :
                                            ""
                                        }
                                    </div>
                                    <p
                                        className={this.props.darkTheme ? "color-white m-0 mr-1 d-none d-md-block":"color-black m-0 mr-1 d-none d-md-block"}>
                                        {this.props.restaurant.restaurantTitle ? this.props.restaurant.restaurantTitle : ""}
                                    </p>
                                    <i className="color-black material-icons">keyboard_arrow_down</i>
                                </div>
                            </DropdownToggle>

                            <DropdownMenu alignRight={true}>
                                <DropdownItem onClick={this.handleButtonClickSignOut}>Settings</DropdownItem>
                                <Dropdown.Divider />
                                <DropdownItem onClick={this.handleButtonClickSignOut}>Sign out</DropdownItem>
                                {/* <button 
                                    className="button--transparent border w-100 h-100 py-2 px-4 justify-content-start text-truncate"
                                    onClick={this.handleButtonClickSignOut}>
                                    Sign out
                                </button> */}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </header >
                <section className={this.props.darkTheme ? "corporate sidebar-navigation shadow--basic darkTheme" : "corporate sidebar-navigation shadow--basic"}>
                    <div className="mb-auto">
                        {/* SIDEBAR LINKS */}
                        {
                            this.props.sidebarmenu.map((curr, i) => {
                                return (
                                    <button className={i === this.props.sidebarMenuActiveIndex ? "button--transparent w-100 flex-column py-3 active" : "button--transparent w-100 flex-column py-3"}
                                        key={i}
                                        onClick={() => { this.props.handleSidebarOptionClick(i) }}
                                    >
                                        <i className="material-icons">{curr.icon}</i>
                                        <p className="m-0 font-12">{curr.title}</p>
                                    </button>
                                );
                            })
                        }
                    </div>
                    <div className="mt-5">
                        <Link to="/kitchen" target="_blank">
                            <button className="button--transparent w-100 flex-column py-3">
                                <i className="material-icons">outdoor_grill</i>
                                <p className="m-0 font-12">Kitchen Screen</p>
                            </button>
                        </Link>
                        <Link to="/customer" target="_blank">
                            <button className="button--transparent w-100 flex-column py-3 pb-4">
                                <i className="material-icons">restaurant</i>
                                <p className="m-0 font-12">Customer Screen</p>
                            </button>
                        </Link>
                    </div>
                </section>
                <div className="overflowWrapper">
                    <main className={this.props.darkTheme ? "corporate main-content pageMinWidth darkTheme" : "corporate main-content pageMinWidth"}>
                        {this.props.children}
                    </main>
                </div>
            </>
        )
    }
}

export default CorporateLayout;