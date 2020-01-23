import React from 'react';
import { Link } from 'react-router-dom';

class HomePageUI extends React.Component {

    render() {
        return (
            <div className="container my-5">
                <p className="text-danger">todo: landing page</p>
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
        );
    }
}

export default HomePageUI;