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

    render() {
        if (this.state.sidebarOpen) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
            // document.body.style.overflowY = "auto";
        }
        return (
            <>
                <header className="customer header-navigation overflowWrapper">
                    <div className="container-fluid pageMinWidth h-100 p-0 d-flex align-items-center flex-nowrap">
                        <button className="button--transparent h-100 px-4 d-flex d-sm-none" onClick={this.handleSidebarToggle}>
                            <i className="material-icons">menu</i>
                        </button>
                        <div className="h-100 px-0 px-sm-4 py-3 mr-auto">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hungry_Jack%27s.svg/1200px-Hungry_Jack%27s.svg.png" alt="restaurant logo" height="100%" width="auto"/>
                        </div>
                        {/* <p className="m-0 mr-auto color-white-09 px-0 px-sm-4 text-nowrap overflow-hidden">RESTAURANT NAME</p> */}
                        <button className="button--transparent h-100 px-4">
                            <i className="material-icons">language</i>
                        </button>
                        <button className="button--transparent h-100 px-4">
                            {/* <div className="mr-1 mr-md-2 rounded-circle bg-danger" style={{ height: "35px", width: "35px" }}></div> */}
                            {/* <i className="material-icons">help</i> */}
                            <i className="material-icons">help_outline</i>
                        </button>
                    </div>
                </header>
                <section className={this.state.sidebarOpen ? "customer sidebar-navigation open": "customer sidebar-navigation"}>
                    <div className="px-2 pt-3 mb-auto">
                        <button className="button--transparent bg-secondary w-100 flex-column py-2 my-3 active">
                            <p className="m-0 font-18">Pizza</p>
                        </button>
                        <button className="button--transparent bg-secondary w-100 flex-column py-2 my-3">
                            <p className="m-0 font-18">Seafood</p>
                        </button>
                        <button className="button--transparent bg-secondary w-100 flex-column py-2 my-3">
                            <p className="m-0 font-18">Pasta</p>
                        </button>
                        <button className="button--transparent bg-secondary w-100 flex-column py-2 mb-3">
                            <p className="m-0 font-18">Dessert</p>
                        </button>
                    </div>
                    <div className="px-2 mt-5">
                        <button className="button--transparent bg-warning w-100 flex-column py-2 mb-2 color-black">
                            <p className="m-0 font-18">Bill</p>
                        </button>
                    </div>
                </section>
                <div className="overflowWrapper">
                    <main className="customer main-content">
                        <div className="pageMinWidth min-h-100 px-3">
                            {this.props.children}
                        </div>
                    </main>
                </div>
                {this.state.sidebarOpen ? (<div className="modal-backdrop show d-sm-none" onClick={this.handleSidebarToggle}></div>):"" }
                
            </>
        );
    }
}

export default CustomerLayout;