import React from 'react';

class RegexTestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pricetext: ""
        }
    }

    handleButtonPriceClick = () => {
        var priceString = this.state.pricetext.trim();
        if (priceString === ".") {
            priceString = "0";
        }
        var priceFloat = parseFloat(priceString);
        this.setState({
            ...this.state,
            pricetext: priceFloat.toFixed(2)
        });
        console.log(priceFloat);
    }
    handleInputPriceChange = (e) => {
        var priceString = e.currentTarget.value;

        if (
            priceString.search(/^\d{0,}\u002E\d{0,2}$/) !== -1
            || priceString.search(/^\d{0,}$/) !== -1
        ) {
            this.setState({
                ...this.state,
                pricetext: priceString
            });
        }
    }
    render() {
        return (
            <>
                <div className="container py-5">
                    <input type="text" 
                        className="mb-3 form-control"
                        onChange={this.handleInputPriceChange} 
                        value={this.state.pricetext}/>
                        <div></div>
                    <button 
                        className="btn btn-primary"
                        onClick={this.handleButtonPriceClick}>CHECK</button>
                </div>
            </>
        );
    }
}

export default RegexTestComponent;