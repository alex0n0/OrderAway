import React from 'react';
import '../../css/baselayouts_customer.css';

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
                    <button className={i === this.props.sidebarMenuActiveIndex ? "button--transparent bg-secondary w-100 flex-column py-2 my-3 active" : "button--transparent bg-secondary w-100 flex-column py-2 my-3"}
                        key={i}
                        onClick={() => { this.handleSidebarOptionClick(i) }}
                    >
                        <p className="m-0"><b>{curr.category.toUpperCase()}</b></p>
                    </button>
                );
            })
        }

        return (
            <>
                <header className="customer header-navigation overflowWrapper shadow--dark">
                    <div className="container-fluid pageMinWidth h-100 p-0 d-flex align-items-center flex-nowrap">
                        <button className="button--transparent h-100 px-4 d-flex d-sm-none" onClick={this.handleSidebarToggle}>
                            <i className="material-icons">menu</i>
                        </button>
                        <div className="h-100 px-0 px-sm-4 py-3 mr-auto">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hungry_Jack%27s.svg/1200px-Hungry_Jack%27s.svg.png" alt="restaurant logo" height="100%" width="auto" />
                        </div>
                        <button className="button--transparent h-100 px-4">
                            <i className="material-icons">language</i>
                        </button>
                        <button className="button--transparent h-100 px-4">
                            <i className="material-icons">help_outline</i>
                        </button>
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
                {this.state.sidebarOpen ? (<div className="modal-backdrop show d-sm-none" onClick={this.handleSidebarToggle}></div>) : ""}

            </>
        );
    }
}

export default CustomerLayout;