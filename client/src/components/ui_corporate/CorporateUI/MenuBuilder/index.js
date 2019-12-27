import React from 'react';

import MenuItemCorporate from '../../../elements/menuitem/Corporate';

import '../../../css/corporate_menubuilder.css';

import menu from '../../../zzz/menu';

class MenuBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: menu
        }
    }
    render() {
        return (
            <div className="py-3 px-3 border border-danger">
                <section className="main-content-header">
                    <h6>Menu Builder</h6>
                    <div className="row m-0">

                        <div className="col-12 px-3 py-2 d-flex align-items-center flex-wrap bg-white shadow--basic">
                            <p className="m-0 mr-3">Summer Menu</p>
                            <input className="ml-auto mr-2" placeholder="hello"></input>
                            <button className="button--transparent rounded bg-primary px-3 py-1 font-14 color-white-09">+ New Menu</button>
                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Duplicate Menu</button>

                            <div className="w-100" />

                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Rename Menu</button>
                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Delete Menu</button>
                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Menu Builder</button>

                            <div className="w-100" />

                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Publish</button>

                            <div className="w-100" />

                            <p className="text-danger font-12 m-0">A published menu can not be edited</p>
                        </div>
                    </div>
                </section>

                <section className="main-content-sidebar shadow--basic">
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
                </section>




                <div className="container cardcontainer pt-5">
                    <div className="row mx-0 menucollection">
                        {/* MENU ITEM START */}
                        {/* MENU ITEM */}
                        {
                            this.state.menu[0].menuItems.map((curr, i) => {
                                console.log(curr);
                                return (
                                    <div key={i}
                                        className="col-12 col-md-6 col-lg-4 p-3"
                                    >
                                        <MenuItemCorporate menuItem={curr} />
                                    </div>
                                    // <div key={i} className="col-12 col-xs-sm-6 col-sm-12 col-sm-md-6 col-md-6 col-lg-4 col-xl-3 col-xxl-2 col-xxxl-1 py-3">
                                    //     <MenuItemCustomer menuItem={curr} />
                                    // </div>
                                )
                            })
                        }
                        {/* <div className="col-12 col-md-6 col-lg-4 p-3">
                            <MenuItemCorporate />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 p-3">
                            <MenuItemCorporate />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 p-3">
                            <MenuItemCorporate />
                        </div> */}


                        {/* MENU ITEM END */}


                    </div>

                </div>
                <p>asdffffddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
                <div className="container py-5"></div>
                <div className="container py-5"></div>
                <div className="container py-5"></div>
            </div>
        );
    }
}

export default MenuBuilder;