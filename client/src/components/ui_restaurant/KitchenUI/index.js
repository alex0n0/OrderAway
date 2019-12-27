import React from 'react';
import CorporateLayout from '../../baselayouts/CorporateLayout';
import OrderItem from '../../elements/orderitem/Kitchen';

class KitchenUI extends React.Component {
    render() {
        return (
            <CorporateLayout>
                <div className="py-3 px-3 bg-dark">
                    <div className="container-fluid">
                        <div className="row mx-n3">
                            {/* ORDER ITEMS START */}
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>
                            {/* ORDER ITEM */}
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 py-2 px-2">
                                <OrderItem />
                            </div>

                            {/* ORDER ITEMS END */}
                        </div>
                    </div>
                </div>
            </CorporateLayout>
        );
    }
}

export default KitchenUI;