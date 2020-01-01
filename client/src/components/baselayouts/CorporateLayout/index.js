import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/baselayouts_corporate.css';

class CorporateLayout extends React.Component {

    render() {
        return (
            <>
                <header className={this.props.darkTheme ? "corporate header-navigation overflowWrapper shadow--basic darkTheme" : "corporate header-navigation overflowWrapper shadow--basic"}>
                    <div className="container-fluid pageMinWidth h-100 p-0 d-flex align-items-center flex-nowrap">
                        <button className="button--transparent h-100 px-4 mr-auto">COMPANY</button>
                        <button className="button--transparent h-100 pr-4">
                            <div className="mr-1 mr-md-3 rounded-circle bg-dark overflow-hidden d-flex align-items-center justify-content-center" style={{ height: "48px", width: "48px" }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hungry_Jack%27s.svg/1200px-Hungry_Jack%27s.svg.png" alt="restaurant logo" height="auto" width="70%" />
                            </div>
                            <p className="m-0 mr-1 d-none d-md-block">Hungry Jack's</p>
                            <i className="material-icons">keyboard_arrow_down</i>
                        </button>
                    </div>
                </header>
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