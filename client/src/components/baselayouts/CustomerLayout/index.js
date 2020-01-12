import React from 'react';
import '../../css/baselayouts_customer.css';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';

class CustomerLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        }
    }

    handleSidebarToggle = () => {
        this.setState({
            ...this.state,
            sidebarOpen: !this.state.sidebarOpen
        });
    }

    handleSidebarOptionClick = (i) => {
        this.props.handleSidebarOptionClick(i);
    }

    handleButtonClickSignOut = () => {
        document.cookie = "U_TKN=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "U_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        this.props.history.push("/login");
    }

    render() {
        if (this.state.sidebarOpen) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
            // document.body.style.overflowY = "auto";
        }

        var sidebarOptionsArr = [];
        if (this.props.menu.length !== 0) {
            sidebarOptionsArr = this.props.menu.map((curr, i) => {
                return (
                    <button className={i === this.props.sidebarMenuActiveIndex ? "button--transparent bg-secondary w-100  py-2 my-3 active" : "button--transparent bg-secondary w-100 py-2 my-3"}
                        key={i}
                        onClick={() => { this.handleSidebarOptionClick(i) }}
                    >
                        <p className="m-0 text-truncate"><b>{curr.categoryTitle.toUpperCase()}</b></p>
                    </button>
                );
            })
        }

        return (
            <>
                <header className="customer header-navigation shadow--dark">

                    <div className="container-fluid pageMinWidth h-100 p-0 d-flex flex-nowrap">
                        <button className="button--transparent h-100 px-4 d-flex d-sm-none" onClick={this.handleSidebarToggle}>
                            <i className="material-icons">menu</i>
                        </button>
                        <div className="h-100 px-0 px-sm-4 py-3 mr-auto">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hungry_Jack%27s.svg/1200px-Hungry_Jack%27s.svg.png" alt="restaurant logo" height="100%" width="auto" />
                        </div>
                        <button className="button--transparent h-100 px-4">
                            <i className="material-icons">language</i>
                        </button>
                        <Dropdown className="h-100">
                            <DropdownToggle id="dropdown-basic" className="bg-transparent h-100 border-0 rounded-0 shadow-none">
                                <div className="h-100 d-flex align-items-center justify-content-center px-2">
                                    <i className="material-icons">more_vert</i>
                                </div>
                            </DropdownToggle>

                            <DropdownMenu alignRight={true}>
                                {/* <Dropdown.Divider /> */}
                                <DropdownItem onClick={this.handleButtonClickSignOut}>Sign out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                    </div>
                </header>
                <section className={this.state.sidebarOpen ? "customer sidebar-navigation shadow--dark open" : "customer sidebar-navigation shadow--dark"}>
                    <div className="px-2 pt-3 mb-auto">
                        {/* SIDEBAR OPTIONS START */}
                        {
                            sidebarOptionsArr
                        }
                        {/* SIDEBAR OPTIONS END */}
                    </div>
                    <div className="px-2 mt-5">
                        <button className="button--transparent bg-warning w-100 flex-column py-2 mb-2 color-black">
                            <p className="m-0"><b>BILL</b></p>
                        </button>
                    </div>
                </section>
                <div className="overflowWrapper">
                    <main className="customer main-content pageMinWidth">
                        <div className="px-3">
                            {this.props.children}
                        </div>
                    </main>
                </div>
                {this.state.sidebarOpen ? (<div className="modal-backdrop show d-sm-none" onClick={this.handleSidebarToggle} style={{ zIndex: "60" }}></div>) : ""}

            </>
        );
    }
}

export default CustomerLayout;