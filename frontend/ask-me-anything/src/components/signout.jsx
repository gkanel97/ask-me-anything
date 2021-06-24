import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signout extends Component {
    
    async componentDidMount() {
        const token = localStorage.getItem("refresh_token");
        
        localStorage.clear();
        this.props.appCallback('', '');

        await fetch('http://localhost:3000/auth/logout', {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    }

    render() { 
        return <Redirect to='/' />
    }
}
 
export default Signout;