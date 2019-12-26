import React from 'react';
import { Route } from 'react-router-dom';

import CorporateLayout from '../layouts/CorporateLayout';
import MenuSelector from './MenuSelector';
import MenuBuilder from './MenuBuilder';

class CorporateUIComponent extends React.Component {
    render() {
        return (
            <>
                <Route exact path="/business/home">
                    <CorporateLayout>
                        <h1>business UI home</h1>
                        <div className="container bg-white">
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                            <p>asdf</p>
                        </div>
                    </CorporateLayout>
                </Route>
                <Route exact path="/business/menu">
                    <CorporateLayout>
                        <MenuSelector />
                    </CorporateLayout>
                </Route>
                <Route exact path="/business/menu/builder">
                    <CorporateLayout>
                        <MenuBuilder />
                    </CorporateLayout>
                </Route>
            </>
        );
    }
}

export default CorporateUIComponent;