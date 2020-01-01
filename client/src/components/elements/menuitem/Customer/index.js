import React from 'react';
import MenuItemInterior from '../interior';

export default function MenuItemCustomer(props) {
    return (
        <div className="w-100 h-100 overflow-hidden color-black shadow d-flex flex-column border border-white">
            <MenuItemInterior showOrderButton={false} menuItem={props.menuItem}/>
        </div>
    );
}