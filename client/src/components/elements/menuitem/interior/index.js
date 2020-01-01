import React from 'react';
import axios from 'axios';
import moment from 'moment';

import './index.css';

class MenuItemInterior extends React.Component {

    handleButtonClickOrder = (menuItemData) => {
        // menuItemData.orderTime = moment().format("HH:mm");
        menuItemData.orderTime = moment().format("X");
        menuItemData.quantity = 1;
        menuItemData.tableNumber = 1;
        axios.post("/api/kitchen/create", {
            menuItem: menuItemData
        })
        .then(response => {
            // console.log(response.data);
        });
    }
    render() {
        return (
            <>
                <div className="position-relative overflow-hidden">
                    <div style={{ width: '100%', paddingTop: '75%' }}></div>
                    <img className={this.props.menuItem.imageOrientationLandscape ? "menu-item-image menu-item-image--landscape" : "menu-item-image menu-item-image--portrait"} src={this.props.menuItem.imageUrl} alt="slice of pie" />
                    <div className="text-left position-absolute d-flex align-content-start flex-wrap w-100 h-100 p-3" style={{ top: "0px", left: "0px", background: "linear-gradient(-5deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2) 90%)" }}>
                        {this.props.menuItem.tags.vg ? (<span className="badge badge-pill table-success mr-1 mb-1 py-1 shadow">Vg</span>) : ""}
                        {this.props.menuItem.tags.v ? (<span className="badge badge-pill badge-success mr-1 mb-1 py-1 shadow">V</span>) : ""}
                        {this.props.menuItem.tags.gf ? (<span className="badge badge-pill badge-warning mr-1 mb-1 py-1 shadow">GF</span>) : ""}
                    </div>
                </div>
                <div className="bg-white flex-grow-1 d-flex flex-column">
                    <div className="px-3 pt-2 d-flex flex-column flex-grow-1">
                        <p className="m-0 text-left"><b>{this.props.menuItem.title.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</b></p>
                        {/* {Math.floor(Math.random() * 2) > 0 ? (<p className="m-0 text-left font-14 mb-auto">Nutty and sweet</p>) : (<p className="m-0 text-left font-14 mb-auto">Nutty and sweet and some other shit goes here hopefully this is long enough</p>)} */}
                        {/* <p className="m-0 text-left font-14 mb-auto">{toSentenceCase(this.props.menuItem.description)}</p> */}
                        <p className="m-0 text-left font-14 mb-auto">{this.props.menuItem.description.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</p>
                        <div className="d-flex align-items-center pt-2 pb-2">
                            <p className="m-0 text-left font-14 ml-auto"><b>${this.props.menuItem.price.toFixed(2)}</b></p>
                        </div>
                    </div>
                    {
                        this.props.showOrderButton ?
                            ""
                            :
                            (
                                <div className="p-2">
                                    <button className="button--transparent bg-dark w-100 p-2 color-white"
                                        onClick={() => {this.handleButtonClickOrder(this.props.menuItem)}}
                                    ><b>ORDER</b></button>
                                </div>
                            )
                    }
                </div>
            </>
        );
    }
}

export default MenuItemInterior;