import React from 'react';
import MenuItemInterior from '../interior';

export default function MenuItemCorporate(props) {
    return (
        <button className="button--transparent flex-column align-items-stretch w-100 h-100 overflow-hidden color-black p-0">
            <MenuItemInterior showOrderButton={true} menuItem={props.menuItem}/>
        </button>
    );
}