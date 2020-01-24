import React from 'react';
import { Route } from 'react-router-dom';

import CorporateLayout from '../../baselayouts/CorporateLayout';
import CorporateHomeUI from './CorporateHome';
import MenuSelector from './MenuSelector';
import MenuBuilder from './MenuBuilder';

import sidebarmenu from './sidebarmenu';

class CorporateUIComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarmenu: sidebarmenu,
            sidebarMenuActiveIndex: 0,
            restaurant: {
                restaurantTitle: "",
                iconUrl: ""
            }
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

    setRestaurantTitle = (title, url) => {
        console.log(url);
        this.setState({
            ...this.state,
            restaurant: {
                restaurantTitle: title,
                iconUrl: url
            }
        });
    }

    render() {
        return (
            <>
                <Route exact path="/corporate">
                    <CorporateLayout sidebarmenu={this.state.sidebarmenu} sidebarMenuActiveIndex={0} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history} restaurant={this.state.restaurant}>
                        <CorporateHomeUI history={this.props.history} liftRestuarantTitle={this.setRestaurantTitle}></CorporateHomeUI>
                    </CorporateLayout>
                </Route>
                <Route exact path="/corporate/menu">
                    <CorporateLayout sidebarmenu={this.state.sidebarmenu} sidebarMenuActiveIndex={1} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history} restaurant={this.state.restaurant}>
                        <MenuSelector history={this.props.history} liftRestuarantTitle={this.setRestaurantTitle}/>
                    </CorporateLayout>
                </Route>
                <Route path="/corporate/menu/builder/:id">
                    <CorporateLayout sidebarmenu={this.state.sidebarmenu} sidebarMenuActiveIndex={1} handleSidebarOptionClick={this.handleSidebarOptionClick} history={this.props.history} restaurant={this.state.restaurant}>
                        <MenuBuilder history={this.props.history} liftRestuarantTitle={this.setRestaurantTitle}/>
                    </CorporateLayout>
                </Route>
            </>
        );
    }
}

export default CorporateUIComponent;