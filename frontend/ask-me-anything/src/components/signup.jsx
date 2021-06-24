import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            email: '',
            firstName: '',
            lastName: '',
            terms: false,
            isValidated: false
        }
        this.setInputValue = this.setInputValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    setInputValue(event) {
        const element = event.target;
        this.setState({
            [element.name]: element.type === "checkbox" ? element.checked : element.value
        });
    }

    handleFormSubmission(event) {
        event.preventDefault();
        const form = event.target;
        // if (!form.checkValidity()) {
        //     Array.from(form.elements).forEach((i) => {
        //         if ("required" in i.attributes) {
        //             i.classList.add(i.value || Boolean(i.checked) ? "is-valid" : "is-invalid");
        //         }
        //     });
        // }

        fetch('http://localhost:3000/user/new', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw response.statusText;
                }
            })
            .then(() => {
                this.props.history.push('/auth/signin');
            })
            .catch(() => {
                this.setState({
                    password: '',
                    passwordConfirm: '',
                    terms: false
                });
            });
    }

    render() {

        const { password, passwordConfirm } = this.state;
        const isPasswordMismatch = passwordConfirm !== '' && password !== passwordConfirm;

        return (
            <div className="row">
                <div className="col-md-5 border border-primary border-1 rounded rounded-3">
                    <form className={`p-4 needs-validation ${this.state.isValidated ? "was-validated" : ""}`} onSubmit={this.handleFormSubmission} noValidate>
                        <div className="mb-3">
                            <label htmlFor="txtUsername" className="form-label">Username</label>
                            <input className="form-control" id="txtUsername" name="username" value={this.state.username} onChange={this.setInputValue} required />
                            <div className="invalid-feedback">
                                Please choose a username
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="txtEmail" name="email" value={this.state.email} onChange={this.setInputValue} required />
                            <div className="invalid-feedback">
                                Please provide an email
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="txtPassword" name="password" value={this.state.password} onChange={this.setInputValue} required />
                            <div className="invalid-feedback">
                                Please provide a password
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtPasswordConfirm" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="txtPasswordConfirm" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.setInputValue} aria-labelledby="passwordMatch" required />
                            {isPasswordMismatch && <div id="passwordMismatch" className="text-danger">Passwords do not match!</div>}
                            <div className="invalid-feedback">
                                Please repeat your password
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtFirstName" className="form-label">First Name</label>
                            <input className="form-control" id="txtFirstName" name="firstName" value={this.state.firstName} onChange={this.setInputValue} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="txtLastName" className="form-label">Last Name</label>
                            <input className="form-control" id="txtLastName" name="lastName" value={this.state.lastName} onChange={this.setInputValue} />
                        </div>
                        <div className="mb-3">
                            <div class="form-check">
                                <input className="form-check-input" type="checkbox" name="terms" checked={this.state.terms} id="chkTerms" onChange={this.setInputValue} required />
                                <label className="form-check-label" htmlFor="chkTerms">
                                    I have and accept the terms &amp; conditions
                                </label>
                                <div className="invalid-feedback">
                                    You need to accept the terms &amp; conditions to proceed!
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;