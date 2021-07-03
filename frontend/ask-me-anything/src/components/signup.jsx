import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { USER_BASE_URL } from '../configuration/URLS';
import { httpPost } from "../scripts/requests";

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

        if (element.checkValidity()) {
            element.classList.replace("is-invalid", "is-valid");
        }
        else {
            element.classList.replace("is-valid", "is-invalid");
        }
    }

    handleFormSubmission(event) {
        event.preventDefault();

        const form = event.target;
        if (!form.checkValidity()) {
            Array.from(form.elements).forEach((i) => {
                if ("required" in i.attributes) {
                    i.classList.add(i.checkValidity() ? "is-valid" : "is-invalid");
                }
            });
            return;
        }

        httpPost(`${USER_BASE_URL}/new`, {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
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

        // const { password, passwordConfirm } = this.state;
        // const isPasswordMismatch = passwordConfirm !== '' && password !== passwordConfirm;

        return (
            <div className="row">
                <div className="col-md-5 border border-primary border-1 rounded rounded-3">
                    <form className={`p-4 needs-validation ${this.state.isValidated ? "was-validated" : ""}`} onSubmit={this.handleFormSubmission} noValidate>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="txtUsername" name="username" placeholder="" value={this.state.username} onChange={this.setInputValue} required />
                            <label htmlFor="txtUsername" className="form-label">Username</label>
                            <div className="invalid-feedback">
                                Please choose a username
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="txtEmail" name="email" placeholder="" value={this.state.email} onChange={this.setInputValue} required />
                            <label htmlFor="txtEmail" className="form-label">Email address</label>
                            <div className="invalid-feedback">
                                Please provide an email
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="txtPassword" name="password" placeholder="" value={this.state.password} onChange={this.setInputValue} required />
                            <label htmlFor="txtPassword" className="form-label">Password</label>
                            <div className="invalid-feedback">
                                Please provide a password
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="txtPasswordConfirm" name="passwordConfirm" pattern={this.state.password} placeholder="" value={this.state.passwordConfirm} onChange={this.setInputValue} aria-labelledby="passwordMatch" required />
                            <label htmlFor="txtPasswordConfirm" className="form-label">Confirm Password</label>
                            <div className="invalid-feedback">
                                Please repeat your password
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="txtFirstName" name="firstName" placeholder="" value={this.state.firstName} onChange={this.setInputValue} />
                            <label htmlFor="txtFirstName" className="form-label">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="txtLastName" name="lastName" placeholder="" value={this.state.lastName} onChange={this.setInputValue} />
                            <label htmlFor="txtLastName" className="form-label">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <div class="form-check">
                                <input className="form-check-input" type="checkbox" name="terms" checked={this.state.terms} id="chkTerms" onChange={this.setInputValue} required />
                                <label className="form-check-label" htmlFor="chkTerms">
                                    I have read and accept the <Link to="/terms">terms &amp; conditions</Link>
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