import React, { Component } from 'react';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: ''
        }
        this.setInputValue = this.setInputValue.bind(this);
        this.handleCredentialSubmittion = this.handleCredentialSubmittion.bind(this);
    }

    setInputValue(event) {
        this.setState({ 
            [event.target.name]:  event.target.value
        });
    }

    handleCredentialSubmittion(e) {
        e.preventDefault();
        alert(`You submitted username: ${this.state.username} & password: ${this.state.password}`);
    }

    render() { 
        return (
            <div className="row">
                <div className="col-md-5 border border-2 rounded-2">
                    <form className="p-3">
                        <div className="mb-3">
                            <label htmlFor="txtUsername" className="form-label">Username</label>
                            <input className="form-control" id="txtUsername" name="username" value={this.state.username} onChange={this.setInputValue} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="txtPassword" name="password" value={this.state.password} onChange={this.setInputValue} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleCredentialSubmittion}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default Signin;