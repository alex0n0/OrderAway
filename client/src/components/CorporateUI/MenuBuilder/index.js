import React from 'react';
import '../../css/corporate_layout.css';
import './index.css';

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
                        <div className="col-12 col-md-6 col-lg-4 p-3">
                            <button className="w-100 bg-secondary p-0 border-0 overflow-hidden">
                                <div className="w-100 position-relative overflow-hidden">
                                    <div style={{ width: '100%', paddingTop: '75%', backgroundColor: 'red' }}></div>
                                    <img className="position-absolute" style={{ top: '0%', left: '0%' }} src="https://images-gmi-pmc.edge-generalmills.com/2b31966f-9558-490a-b82b-c2018b288425.jpg" width="auto" height="100%" />
                                </div>
                                <div className="px-3 pt-2 pb-3">
                                    <p className="m-0 text-left"><b>Pecan Pie</b></p>
                                    <div class="text-left">
                                        <span className="badge badge-pill table-success">VG</span>
                                        <span className="badge badge-pill badge-success">V</span>
                                        <span className="badge badge-pill badge-warning">GF</span>
                                    </div>
                                    <p className="m-0 text-left font-14">Grilled salmon on a bed of rice</p>
                                    <div className="d-flex align-items-center mb-2">
                                        <p className="m-0 text-left font-14 ml-auto"><b>$14.00</b></p>
                                    </div>
                                    <div>
                                        <button className="button--transparent bg-light w-100">ORDER</button>
                                    </div>
                                </div>
                            </button>
                        </div>
                     




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