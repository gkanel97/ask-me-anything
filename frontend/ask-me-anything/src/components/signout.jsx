import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AUTH_BASE_URL } from '../configuration/URLS';

class Signout extends Component {
    
    async componentDidMount() {
        const token = localStorage.getItem("refresh_token");
        
        localStorage.clear();
        this.props.appCallback('', '');

        await fetch(`${AUTH_BASE_URL}/logout`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    render() { 
        return <Redirect to='/' />
    }
}
 
export default Signout;