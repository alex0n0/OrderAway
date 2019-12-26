import React from 'react';

export default function OrderItem() {
    return (
        <>
            <div className="h-100 w-100 bg-secondary color-white" style={{ border: "5px solid white" }}>
                <div className="bg-dark d-flex align-items-center px-3 py-2">
                    <div className="d-flex flex-column mr-auto">
                        <p className="m-0 font-18 mr-2"><b>Table 22</b></p>
                        <p className="m-0 color-white-06">11:20<small>AM</small></p>
                    </div>
                    <p className="m-0 font-12 color-white-06 mr-2">4 min ago</p>
                    <div className="m-0 rounded-circle shadow-black" style={{ height: "10px", width: "10px", backgroundColor: "lime" }}></div>
                </div>
                <div className="pt-3 pl-1">
                    {/* ORDER ITEMS START */}
                    {/* ORDER ITEM */}
                    <div className="d-flex align-items-center pl-1 mb-3" style={{ borderLeft: "5px solid lime" }}>
                        <div className="col p-0 pl-2">
                            <p className="m-0 font-12 color-white-06">Menu 3</p>
                            <p className="m-0 font-16 d-block">Fried chicken burger w/ sirarcha mayo</p>
                        </div>
                        <p className="m-0 font-20 pl-2" style={{ flex: "0 0 68px" }}><span className="color-white-06">&times;</span><b>999</b></p>
                    </div>
                    {/* ORDER ITEM */}
                    <div className="d-flex align-items-center pl-1 mb-3" style={{ borderLeft: "5px solid lime" }}>
                        <div className="col p-0 pl-2">
                            <p className="m-0 font-12 color-white-06">Menu 3</p>
                            <p className="m-0 font-16 d-block">Smoked Ribs (500g)</p>
                        </div>
                        <p className="m-0 font-20 pl-2" style={{ flex: "0 0 68px" }}><span className="color-white-06">&times;</span><b>2</b></p>
                    </div>
                    {/* ORDER ITEMS END */}
                </div>
                <div className="px-3 pb-3 ">
                    <button className="button--transparent bg-white py-2 w-100">DONE</button>
                </div>
            </div>
        </>
    );
}
// class OrderItem extends React.Component {
//     render() {
//         return (
//             <>
//                 <div className="h-100 w-100 bg-secondary color-white">
//                     <div className="bg-dark d-flex align-items-center px-3 py-2">
//                         <p className="m-0 font-18 mr-2">Table 22</p>
//                         <p className="m-0 color-white-06 mr-auto">11:20<small>AM</small></p>
//                         {/* <div className="m-0 rounded-circle shadow-black" style={{height: "10px", width: "10px", backgroundColor: "rgb(35, 239, 12)"}}></div> */}
//                         <div className="m-0 rounded-circle shadow-black" style={{ height: "10px", width: "10px", backgroundColor: "rgb(255, 0, 0)" }}></div>
//                     </div>
//                     <div className="py-3">
//                         {/* ORDER ITEMS START */}
//                         {/* ORDER ITEM */}
//                         <div class="d-flex align-items-center pl-1 mb-3" style={{ borderLeft: "5px solid red" }}>
//                             <div className="col p-0 pl-2">
//                                 <p className="m-0 font-12 color-white-06">Menu 3</p>
//                                 <p className="m-0 font-18 mr-3 d-block">Fried chicken burger w/ sirarcha mayo</p>
//                             </div>
//                             <p className="m-0 font-30 border pl-2" style={{flex: "0 0 100px"}}><span className="color-white-06">&times;</span>&nbsp;<b>999</b></p>
//                         </div>
//                         {/* ORDER ITEMS END */}
//                     </div>
//                 </div>
//             </>
//         );
//     }

// }

// export default OrderItem;