import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import HomePageUI from './components/ui_homepage';
import LoginUI from './components/ui_login';
import SignUpUI from './components/ui_signup';
import CorporateUI from './components/ui_corporate/CorporateUI';
import CustomerTableSelectorUI from './components/ui_restaurant/CustomerUI/TableSelectorInterface';
import CustomerMenuUI from './components/ui_restaurant/CustomerUI/MenuInterface';
import KitchenOrdersUI from './components/ui_restaurant/KitchenUI/Orders';
import KitchenCompletedUI from './components/ui_restaurant/KitchenUI/Completed';

import axios from 'axios';

import ReactGA from 'react-ga';

initializeReactGA();
function initializeReactGA() {
  ReactGA.initialize('UA-158346678-1');
  ReactGA.pageview('/signup');
}

class App extends React.Component {

  handleButtonDbPopulateClick = () => {
    axios.get("/special/database/populate")
      .then(response => {
        console.log(response.data);
      });
  }
  handleButtonDbClearClick = () => {
    axios.get("/special/database/clear")
      .then(response => {
        console.log(response.data);
      });
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" render={() => (
              <>
                <div className="container my-5">

                  <div className="row justify-content-center px-3">
                    <div className="col-12 col-sm-6 border border-bottom-0 py-3">
                      <Link to="/signup">sign up</Link>
                    </div>
                  </div>

                  <div className="row justify-content-center px-3">
                    <div className="col-12 col-sm-6 border py-3">
                      <Link to="/signin">sign in</Link>
                    </div>
                  </div>


                </div>
              </>
            )} /> */}
            <Route exact path="/" component={HomePageUI}/>
            <Route exact path="/signin" component={LoginUI} />
            <Route exact path="/signup" component={SignUpUI} />

            <Route exact path="/secret" render={() => (
              <>
                <div className="container my-5">
                  <div className="row justify-content-center px-3">
                    <div className="col-12 col-sm-6 border py-3">
                      <div className="row justify-content-center mx-n2">
                        <div className="col-12 col-md-6 px-2 pb-2 pb-md-0">
                          <button
                            className="btn btn-success btn-block"
                            onClick={this.handleButtonDbPopulateClick}>
                            POPULATE DB
                        </button>
                        </div>
                        <div className="col-12 col-md-6 px-2 pt-2 pt-md-0">
                          <button
                            className="btn btn-danger btn-block"
                            onClick={this.handleButtonDbClearClick}>
                            EMPTY DB
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )} />

            <Route path="/corporate" component={CorporateUI} />
            <Route exact path="/customer" component={CustomerTableSelectorUI} />
            <Route exact path="/customer/menu" component={CustomerMenuUI} />
            <Route exact path="/kitchen" component={KitchenOrdersUI} />
            <Route exact path="/kitchen/completed" component={KitchenCompletedUI} />
            
            <Route path="/*" render={() => (<div>404 not found</div>)} />
          </Switch>
        </BrowserRouter>

        {/* <BreakpointIndicator /> */}
      </>
    );
  }
}

export default App;
