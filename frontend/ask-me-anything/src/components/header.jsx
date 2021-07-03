import React from 'react';
import Logo from "../logo.svg";
import { NavLink } from 'react-router-dom';
import QuestionLg from '../icons/questionLg';
import QuestionSquare from '../icons/questionSquare';

function UserAuthLink(props) {
    if (!props.username) {
        return (
            <React.Fragment>
                <NavLink className="btn btn-outline-info mx-2" to="/auth/signup">Create Account</NavLink>
                <NavLink className="btn btn-outline-primary mx-2" to="/auth/signin">Login</NavLink>
            </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <span className="navbar-text" style={{ verticalAlign: "middle", fontWeight: "bold" }}>
                    Welcome, {props.username}!
                </span>
                <NavLink className="btn btn-outline-secondary mx-2" to="/auth/signout">Logout</NavLink>
            </React.Fragment>
        );
    }
}

function UserActions(props) {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink className="nav-link" to="/account">My.AskMeAnything</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/question/ask">Ask a question!</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/question">Answer a question!</NavLink>
            </li>
        </ul>
    );
}

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavCollapsed: true
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({
            isNavCollapsed: !this.state.isNavCollapsed
        });
    }

    render() {

        const hasUser = Boolean(this.props.username)

        return (
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        {/* <img src={Logo} alt="Logo" width="45" height="45" /> */}
                        <QuestionSquare width="30" height="30" />
                        <span className="text-white mx-2">Ask Me Anything</span>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded={!this.state.isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={this.toggleCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`navbar-menu navbar-collapse ${this.state.isNavCollapsed ? "collapse" : ""}`} id="navbarContent">
                        {hasUser ? <UserActions /> : null}
                        <div className="ms-auto">
                            <UserAuthLink username={this.props.username} />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;