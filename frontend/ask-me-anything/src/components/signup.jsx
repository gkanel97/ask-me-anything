import React, {Component} from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
            firstName: '',
            lastName: ''
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

        const { password, passwordConfirm } = this.state;
        const isPasswordMismatch = passwordConfirm !== '' && password !== passwordConfirm;

        return (
            <div className="row">
                <div className="col-md-5 border border-primary border-1 rounded rounded-3">
                    <form className="p-4">
                        <div className="mb-3">
                            <label htmlFor="txtUsername" className="form-label">Username</label>
                            <input className="form-control" id="txtUsername" name="username" value={this.state.username} onChange={this.setInputValue} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="txtEmail" name="email" value={this.state.email} onChange={this.setInputValue}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="txtPassword" name="password" value={this.state.password} onChange={this.setInputValue} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtPasswordConfirm" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="txtPasswordConfirm" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.setInputValue} aria-labelledby="passwordMatch" />
                            { isPasswordMismatch && <div id="passwordMismatch" className="text-danger">Passwords do not match!</div> }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtFirstName" className="form-label">First Name</label>
                            <input className="form-control" id="txtFirstName" name="firstName" value={this.state.firstName} onChange={this.setInputValue} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtLastName" className="form-label">Last Name</label>
                            <input className="form-control" id="txtLastName" name="lastName" value={this.state.lastName} onChange={this.setInputValue} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleCredentialSubmittion}>Create Account</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;