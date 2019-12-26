import React from 'react';

class MenuSelector extends React.Component {
    render() {
        return (
            <>
                <div className="container">
                    <h6>Menu Selector</h6>
                    <div className="row m-0">

                        <div className="col-12 px-3 py-2 d-flex align-items-center flex-wrap bg-white shadow">
                            <p className="m-0 mr-3">MENU</p>
                            <input className="ml-auto mr-2" placeholder="hello"></input>
                            <button className="button--transparent rounded bg-primary px-3 py-1 font-14 color-white-09">+ New Menu</button>
                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Duplicate Menu</button>

                            <div className="w-100"/>

                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Rename Menu</button>
                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Delete Menu</button>
                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Menu Builder</button>
                            
                            <div className="w-100"/>

                            <button className="button--transparent rounded bg-primary px-3 py-1 mr-2 font-14 color-white-09">Publish</button>

                            <div className="w-100"/>

                            <p className="text-danger font-12 m-0">A published menu can not be edited</p>
                        </div>
                    </div>
                    {/* <div className="row mx-n3"> */}
                    <div className="row mx-0">
                        <div className="col-3 p-3">
                            <button className="button--transparent justify-content-start rounded bg-primary h-100 w-100 px-3 pb-2 py-4 font-14 color-white-09">
                                Summer Menu
                            </button>
                        </div>
                        <div className="col-3 p-3">
                            <button className="button--transparent justify-content-start rounded bg-primary h-100 w-100 px-3 pb-2 py-4 font-14 color-white-09">
                                Lamb Season
                            </button>
                        </div>
                        <div className="col-3 p-3">
                            <button className="button--transparent justify-content-start rounded bg-primary h-100 w-100 px-3 pb-2 py-4 font-14 color-white-09">
                                All Vegan
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MenuSelector;