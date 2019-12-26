import React from 'react';
import '../../../css/baselayouts_corporate.css';
import '../../../css/corporate_menubuilder.css';
import MenuItemCorporate from '../../../elements/menuitem/Corporate';

class MenuBuilder extends React.Component {
    render() {
        return (
            <>
                <section className="main-container-header">
                    <div className="container">
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
                    </div>
                </section>

                <section className="main-container-sidebar">
                    <div className="container">
                        <div className="somebox d-flex flex-column bg-white px-3">
                            <button className="button--transparent bg-secondary mt-3 mb-3 px-3 py-1 font-14 color-white-09">Appetisers</button>
                            <button className="button--transparent bg-secondary mb-3 px-3 py-1 font-14 color-white-09">Mains</button>
                            <button className="button--transparent bg-secondary mb-3 px-3 py-1 font-14 color-white-09">Desserts</button>
                            <button className="button--transparent bg-secondary mb-3 px-3 py-1 font-14 color-white-09">Drinks &amp; Alcohol</button>
                            <button className="button--transparent bg-secondary mb-3 px-3 py-1 font-14 color-white-09">Pizza</button>
                            <button className="button--transparent bg-secondary mb-3 px-3 py-1 font-14 color-white-09">Pasta</button>
                        </div>
                    </div>
                </section>




                <div className="container cardcontainer pt-5">
                    <div className="row mx-0 menucollection">
                        {/* MENU ITEM START */}
                        {/* MENU ITEM */}
                        <div className="col-12 col-md-6 col-lg-4 p-3">
                            <MenuItemCorporate />
                        </div>
                        {/* MENU ITEM */}
                        <div className="col-12 col-md-6 col-lg-4 p-3">
                            <MenuItemCorporate />
                        </div>
                        {/* MENU ITEM */}
                        <div className="col-12 col-md-6 col-lg-4 p-3">
                            <MenuItemCorporate />
                        </div>


                        {/* MENU ITEM END */}


                    </div>

                </div>
                <div className="container py-5"></div>
                <div className="container py-5"></div>
                <div className="container py-5"></div>
            </>
        );
    }
}

export default MenuBuilder;