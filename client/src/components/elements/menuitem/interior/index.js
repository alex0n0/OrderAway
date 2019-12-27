import React from 'react';

export default function MenuItemInterior(props) {
    return (
        <>
            <div className="position-relative overflow-hidden">
                <div style={{ width: '100%', paddingTop: '75%' }}></div>
                <img className="position-absolute" style={{ top: '0%', left: '0%' }} src={props.menuItem.imageUrl} alt="slice of pie" width="auto" height="100%" />
                <div className="text-left position-absolute d-flex align-content-start flex-wrap w-100 h-100 p-3" style={{ top: "0px", left: "0px", background: "linear-gradient(-5deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2) 90%)" }}>
                    { props.menuItem.tags.vg ? (<span className="badge badge-pill table-success mr-1 mb-1 py-1 shadow">Vg</span>) : ""}
                    { props.menuItem.tags.v ? (<span className="badge badge-pill badge-success mr-1 mb-1 py-1 shadow">V</span>) : ""}
                    { props.menuItem.tags.gf ? (<span className="badge badge-pill badge-warning mr-1 mb-1 py-1 shadow">GF</span>) : ""}
                    
                    
                    
                </div>
            </div>
            <div className="bg-white flex-grow-1 d-flex flex-column">
                <div className="px-3 pt-2 d-flex flex-column flex-grow-1">
                    <p className="m-0 text-left"><b>{props.menuItem.title}</b></p>
                    {/* {Math.floor(Math.random() * 2) > 0 ? (<p className="m-0 text-left font-14 mb-auto">Nutty and sweet</p>) : (<p className="m-0 text-left font-14 mb-auto">Nutty and sweet and some other shit goes here hopefully this is long enough</p>)} */}
                    <p className="m-0 text-left font-14 mb-auto">{props.menuItem.description}</p>
                    <div className="d-flex align-items-center pb-2">
                        <p className="m-0 text-left font-14 ml-auto"><b>${props.menuItem.price.toFixed(2)}</b></p>
                    </div>
                </div>
                {
                    props.showOrderButton ?
                        ""
                        :
                        (
                            <div className="p-2">
                                <button className="button--transparent bg-dark w-100 p-2 color-white"><b>ORDER</b></button>
                            </div>
                        )
                }
            </div>
        </>
    );
}