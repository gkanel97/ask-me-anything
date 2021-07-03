import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AUTH_BASE_URL } from '../configuration/URLS';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isValid: true
        }
        this.setInputValue = this.setInputValue.bind(this);
        this.handleCredentialSubmittion = this.handleCredentialSubmittion.bind(this);
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCredentialSubmittion(e) {
        e.preventDefault();

        fetch(`${AUTH_BASE_URL}/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw 'Wrong Credentials';
            }
        })
        .then(payload => {
            localStorage.setItem("access_token", payload.access_token);
            localStorage.setItem("refresh_token", payload.refresh_token);
            localStorage.setItem("username", this.state.username);

            this.props.appCallback(this.state.username, payload.access_token);
            this.props.history.push('/account');
        })
        .catch(() => {
            this.setState({
                password: '',
                isValid: false
            });
        });

    }

    render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 border border-2 rounded-2">
                    <form style={{ padding: "5rem 1rem 5rem 1rem" }}>
                        <div className="alert alert-danger text-wrap text-center" role="alert" style={{ display: this.state.isValid ? "none" : "block" }}>
                            Invalid Credentials! Please try again or <NavLink to='/auth/signup'>create an account</NavLink>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="txtUsername" name="username" placeholder="" value={this.state.username} onChange={this.setInputValue} />
                            <label htmlFor="txtUsername" className="form-label">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="txtPassword" name="password" placeholder="" value={this.state.password} onChange={this.setInputValue} />
                            <label htmlFor="txtPassword" className="form-label">Password</label>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2" onClick={this.handleCredentialSubmittion}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;