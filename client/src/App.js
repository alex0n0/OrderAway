import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; 
import './App.css';

import CorporateUI from './components/CorporateUI';

// import logo from './logo.svg';
// import TestingProxy from './components/experimental/testingproxy';


function App() {
  return (
    <BrowserRouter>
      <Route path="/business" component={CorporateUI} />
    </BrowserRouter>
  );
}

export default App;
