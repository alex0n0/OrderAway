import React from 'react';

export default function MenuItemInterior(props) {
    return (
        <>
            <div className="w-100 position-relative overflow-hidden">
                <div style={{ width: '100%', paddingTop: '75%', backgroundColor: 'red' }}></div>
                <img className="position-absolute" style={{ top: '0%', left: '0%' }} src="https://images-gmi-pmc.edge-generalmills.com/2b31966f-9558-490a-b82b-c2018b288425.jpg" alt="slice of pie" width="auto" height="100%" />
            </div>
            <div className="px-3 pt-2">
                <p className="m-0 text-left"><b>Pecan Pie</b></p>
                <div className="text-left">
                    <span className="badge badge-pill table-success mr-1">VG</span>
                    <span className="badge badge-pill badge-success mr-1">V</span>
                    <span className="badge badge-pill badge-warning mr-1">GF</span>
                </div>
                <p className="m-0 text-left font-14">Nutty and sweet</p>
                <div className="d-flex align-items-center mb-2">
                    <p className="m-0 text-left font-14 ml-auto"><b>$14.00</b></p>
                </div>
            </div>
            {
                props.showOrderButton ?
                    ""
                    :
                    (
                        <div className="p-2">
                            <button className="button--transparent bg-dark w-100 p-2 color-white">ORDER</button>
                        </div>
                    )

            }
        </>
    );
}