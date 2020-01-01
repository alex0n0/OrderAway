import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import CorporateUI from './components/ui_corporate/CorporateUI';
import CustomerUI from './components/ui_restaurant/CustomerUI';
import KitchenUI from './components/ui_restaurant/KitchenUI';
// import ServerUI from './components/ui_restaurant/ServerUI';

// import logo from './logo.svg';
// import TestingProxy from './components/zzz/testingproxy';
import BreakpointIndicator from './components/zzz/breakpointindicator';


function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" render={() => (
          <>
            <div className="container py-5">
              <div className="row justify-content-center">
                <div className="col-6 border py-3">
                  <div className="row">
                    <div className="col-12">
                      <Link to="/corporate/menu">menu manager</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              
              <div className="row justify-content-center">
                <div className="col-6 border py-3">
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <Link to="/kitchen">view orders</Link>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row justify-content-center">
                <div className="col-6 border py-3">
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <Link to="/customer">make orders</Link>
                    </div>
                  </div>
                </div>
              </div>
 
            </div>
          </>
        )} />
        <Route path="/corporate" component={CorporateUI} />
        <Route path="/customer" component={CustomerUI} />
        <Route path="/kitchen" component={KitchenUI} />
        {/* <Route path="/server" component={CustomerUI} /> */}
        {/* <Route path="/chef" render={() => (<h1>chef</h1>)}/>
        <Route path="/server" render={() => (<h1>server</h1>)} /> */}
      </BrowserRouter>

      {/* <BreakpointIndicator /> */}
    </>
  );
}

export default App;
