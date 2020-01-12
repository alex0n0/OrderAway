import React from 'react';
import { Route } from 'react-router-dom';

import CorporateLayout from '../../baselayouts/CorporateLayout';
import MenuSelector from './MenuSelector';
import MenuBuilder from './MenuBuilder';

import sidebarmenu from './sidebarmenu';

class CorporateUIComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarmenu: sidebarmenu,
            sidebarMenuActiveIndex: 0,
        }
    }
    // componentDidMount() {
    //     console.log(this.props.history);
    // }

    handleSidebarOptionClick = (i) => {
        this.setState({
            ...this.state,
            sidebarMenuActiveIndex: i
        });
    }

    render() {
        return (
            <>
                <Route exact path="/corporate">
                    <CorporateLayout sidebarmenu={this.state.sidebarmenu}>
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
                    <CorporateLayout sidebarmenu={this.state.sidebarmenu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history}>
                        <MenuSelector history={this.props.history}/>
                    </CorporateLayout>
                </Route>
                <Route path="/corporate/menu/builder/:id">
                    <CorporateLayout sidebarmenu={this.state.sidebarmenu} sidebarMenuActiveIndex={this.state.sidebarMenuActiveIndex} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history}>
                        <MenuBuilder history={this.props.history}/>
                    </CorporateLayout>
                </Route>
            </>
        );
    }
}

export default CorporateUIComponent;