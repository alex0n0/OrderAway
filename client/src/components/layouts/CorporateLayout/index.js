import React from 'react';
import '../../css/corporate_layout.css';

// class BusinessLayout extends React.Component {
//     render() {
//         return(
//             <>
//                 {this.props.children}
//             </>
//         );
//     }
// }

// export default BusinessLayout;

export default function CorporateLayout(props) {
    return (
        <>
            <header className="header-navigation overflowWrapper shadow--basic">
                <div className="container-fluid pageMinWidth h-100 p-0 d-flex align-items-center flex-nowrap">
                    <button className="button--transparent h-100 px-4 mr-auto">COMPANY</button>
                    <button className="button--transparent h-100 pr-4">
                        <div className="mr-1 mr-md-2 rounded-circle bg-danger" style={{ height: "35px", width: "35px" }}></div>
                        <p className="m-0 mr-1 d-none d-md-block">RESTAURANT</p>
                        <i className="material-icons">keyboard_arrow_down</i>
                    </button>
                </div>
            </header>
            <section className="sidebar-navigation">
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
                <main className="main-content">
                    <div className="pageMinWidth min-h-100 py-3 px-3">
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    );
}