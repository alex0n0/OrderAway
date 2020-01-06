import React from 'react';
import moment from 'moment';
import './index.css';

class OrderItem extends React.Component {

    render() {
        var timeFrom = moment(this.props.orderItem.orderTime, "X").from(moment(this.props.currTime));
        var millisFrom = moment(this.props.currTime).format('x') - moment(this.props.orderItem.orderTime, "X").format('x');
        var isLate = false;
        if (millisFrom / 60000 > 2) {
            isLate = true;
        }
        return (
            <>
                <div className="orderitem h-100 w-100 bg-secondary color-white d-flex flex-column" style={{ border: "1px solid white" }}>
                    <div className="bg-dark d-flex flex-column px-3 py-2">
                        <div className="d-flex align-items-center justify-content-end">
                            <p className="m-0 font-12 color-white-06 mr-2">{timeFrom}</p>
                            <div className={isLate ? "m-0 rounded-circle shadow-black indicator--dot late" : "m-0 rounded-circle shadow-black indicator--dot"}></div>
                        </div>
                        <div className="d-flex align-items-center">
                            <p className="m-0 font-22 mr-auto"><b>Table {this.props.orderItem.tableNumber}</b></p>
                            <p className="m-0 color-white-06">{moment(this.props.orderItem.orderTime, "X").format("hh:mm")}&nbsp;<small>{moment(this.props.orderItem.orderTime, "X").format("A")}</small></p>
                        </div>
                    </div>
                    <div className="pt-3 pl-1 flex-grow-1">
                        {/* ORDER ITEMS START */}
                        {/* ORDER ITEM */}
                        {
                            this.props.orderItem.menuItems.map((curr, i) => {
                                return (
                                    <div className={isLate ? "d-flex align-items-center pl-1 mb-3 indicator--border late" : "d-flex align-items-center pl-1 mb-3 indicator--border"}
                                        key={i}
                                    >
                                        <div className="col p-0 pl-2 overflow-hidden">
                                            <p className="m-0 font-12 color-white-06 text-truncate">
                                                {/* Menu {curr._id}
                                                &nbsp;&middot;&nbsp; */}
                                                {this.props.orderItem.category[i].toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                            </p>
                                            <p className="m-0 font-16 d-block">{curr.menuItemTitle.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</p>
                                        </div>
                                        <p className="col-auto p-0 m-0 font-20 pl-2" style={{ flex: "0 0 68px" }}><span className="color-white-06">&times;</span><b>{this.props.orderItem.quantity[i]}</b></p>
                                    </div>
                                );
                            })
                        }
                        {/* ORDER ITEMS END */}
                    </div>
                    <div className="px-2 pb-2">
                        <button 
                            className="button--transparent bg-white py-2 w-100" 
                            disabled={this.props.orderItem.buttonDoneIsDisabled}
                            onClick={this.props.handleClickDone}><b>
                            DONE
                        </b></button>
                    </div>
                </div>
            </>
        );
    }
}

export default OrderItem;