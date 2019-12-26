import React from 'react';
import MenuItemInterior from '../interior';

export default function MenuItemCustomer(props) {
    return (
        <div className="w-100 bg-white overflow-hidden color-black shadow">
            <MenuItemInterior showOrderButton={false}/>

        </div>
    );
}