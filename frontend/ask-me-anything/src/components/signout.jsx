import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signout extends Component {
    
    componentDidMount() {
        // localStorage.removeItem("username");
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("refresh_token");
        localStorage.clear();
    }

    render() { 
        return <Redirect to='/' />
    }
}
 
export default Signout;