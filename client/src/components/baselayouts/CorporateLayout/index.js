import React from 'react';
import '../../css/baselayouts_corporate.css';

export default function CorporateLayout(props) {
    return (
        <>
            <header className="corporate header-navigation overflowWrapper shadow--basic">
                <div className="container-fluid pageMinWidth h-100 p-0 d-flex align-items-center flex-nowrap">
                    <button className="button--transparent h-100 px-4 mr-auto">COMPANY</button>
                    <button className="button--transparent h-100 pr-4">
                        <div className="mr-1 mr-md-2 rounded-circle bg-dark overflow-hidden d-flex align-items-center justify-content-center" style={{ height: "35px", width: "35px" }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hungry_Jack%27s.svg/1200px-Hungry_Jack%27s.svg.png" alt="restaurant logo" height="auto" width="70%" />
                        </div>
                        <p className="m-0 mr-1 d-none d-md-block">Hungry Jack's</p>
                        <i className="material-icons">keyboard_arrow_down</i>
                    </button>
                </div>
            </header>
            <section className="corporate sidebar-navigation shadow--basic">
                <div>
                    {/* <a href="/business" className="button--transparent w-100 flex-column py-3">
                        <i className="material-icons">home</i>
                        <p className="m-0 font-12">Home</p>
                    </a> */}
                    <button className="button--transparent w-100 flex-column py-3">
                        <i className="material-icons">menu_book</i>
                        <p className="m-0 font-12">Menu</p>
                    </button>
                    <button className="button--transparent w-100 flex-column py-3">
                        <i className="material-icons">home</i>
                        <p className="m-0 font-12">Home</p>
                    </button>
                    <button className="button--transparent w-100 flex-column py-3">
                        <i className="material-icons">account_balance_wallet</i>
                        <p className="m-0 font-12">Finance</p>
                    </button>
                    <button className="button--transparent w-100 flex-column py-3">
                        <i className="material-icons">home</i>
                        <p className="m-0 font-12">Inventory</p>
                    </button>
                </div>
            </section>
            <div className="overflowWrapper">
                <main className="corporate main-content pageMinWidth">
                    {props.children}
                </main>
            </div>
        </>
    );
}