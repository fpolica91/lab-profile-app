import React, { Component } from 'react';
import { Switch, Link } from "react-router-dom"

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Link to="/login" className="btn btn-primary" > Login </Link>
                <Link to="/signup" className="btn btn-warning" > Sign Up </Link>

            </div>
        )
    }

}

export default LandingPage