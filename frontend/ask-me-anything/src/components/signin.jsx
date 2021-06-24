import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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

        fetch('http://localhost:3000/auth/login', {
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
                    <form className="p-4">
                        <div className="alert alert-danger text-wrap text-center" role="alert" style={{ display: this.state.isValid ? "none" : "block" }}>
                            Invalid Credentials! Please try again or <NavLink to='/auth/signup'>create an account</NavLink>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtUsername" className="form-label">Username</label>
                            <input className="form-control" id="txtUsername" name="username" value={this.state.username} onChange={this.setInputValue} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="txtPassword" name="password" value={this.state.password} onChange={this.setInputValue} />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2" onClick={this.handleCredentialSubmittion}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;