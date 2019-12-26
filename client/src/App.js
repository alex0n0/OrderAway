import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import CorporateUI from './components/ui_corporate/CorporateUI';
import CustomerUI from './components/ui_restaurant/CustomerUI';
import KitchenUI from './components/ui_restaurant/KitchenUI';
// import ServerUI from './components/ui_restaurant/ServerUI';

// import logo from './logo.svg';
// import TestingProxy from './components/experimental/testingproxy';


function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/corporate" component={CorporateUI} />
        <Route path="/customer" component={CustomerUI} />
        <Route path="/kitchen" component={KitchenUI} />
        {/* <Route path="/server" component={CustomerUI} /> */}
        {/* <Route path="/chef" render={() => (<h1>chef</h1>)}/>
        <Route path="/server" render={() => (<h1>server</h1>)} /> */}
      </BrowserRouter>
      <div className="position-fixed" style={{bottom: "0px", right: "0px", opacity: "0.7"}}>
        <p className="d-block d-sm-none bg-dark text-light py-0 px-2 text-nowrap"><b>(0px &raquo; mobile sm)</b></p>
        <p className="d-none d-sm-block d-md-none bg-danger text-light py-0 px-2 text-nowrap"><b>sm (576px &raquo; mobile
                lg)</b></p>
        <p className="d-none d-md-block d-lg-none bg-warning py-0 px-2 text-nowrap"><b>md (768px &raquo; tablet)</b></p>
        <p className="d-none d-lg-block d-xl-none bg-success text-light py-0 px-2 text-nowrap"><b>lg (992px &raquo;
                laptop)</b></p>
        <p className="d-none d-xl-block bg-primary text-light py-0 px-2 text-nowrap"><b>xl (1200px &raquo; desktop)</b></p>
      </div>
    </>
  );
}

export default App;
