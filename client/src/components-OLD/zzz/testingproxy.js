import React from 'react';
import axios from 'axios';

class TestingProxy extends React.Component {
    handleClick = () => {
        axios.get('/testingproxy')
        .then(function(response) {
            console.log(response);
            console.log('response data:', response.data);
        });
    }
    render() {
        return(
            <>
                <button onClick={this.handleClick}>CLICK TO TEST PROXY</button>
            </>
        );
    }
}

export default TestingProxy;