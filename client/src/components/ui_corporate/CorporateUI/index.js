import React from 'react';
import { Route } from 'react-router-dom';

import CorporateLayout from '../../baselayouts/CorporateLayout';
import MenuSelector from './MenuSelector';
import MenuBuilder from './MenuBuilder';

class CorporateUIComponent extends React.Component {
    render() {
        return (
            <>
                <Route exact path="/corporate">
                    <CorporateLayout>
                        <h1>business UI home</h1>
                        <div className="container-xl bg-white border">
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
                <Route exact path="/corporate/menu">
                    <CorporateLayout>
                        <MenuSelector />
                    </CorporateLayout>
                </Route>
                <Route exact path="/corporate/menu/builder">
                    <CorporateLayout>
                        <MenuBuilder />
                    </CorporateLayout>
                </Route>
            </>
        );
    }
}

export default CorporateUIComponent;