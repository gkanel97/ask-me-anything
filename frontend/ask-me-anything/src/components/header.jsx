import React from 'react';
import Logo from "../logo.svg";
import { NavLink } from 'react-router-dom';

function UserAuthLink(props) {
    if (!props.username) {
        return <NavLink className="btn btn-outline-primary" to="/signin">Login</NavLink>
    }
    else {
        return (
            <React.Fragment>
                <span className="navbar-text p-2">
                    Welcome, {props.username}!
                </span>
                <NavLink className="btn btn-outline-secondary" to="/signout">Logout</NavLink>
            </React.Fragment>
        );
    }
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
                    <a className="navbar-brand">
                        <img src={Logo} alt="Logo" width="45" height="45" />
                        <span className="text-white">Ask Me Anything</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="true" aria-label="Toggle navigation" onClick={this.toggleCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-menu navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/question/ask">Ask a question!</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Answer a question!</NavLink>
                            </li>
                        </ul>
                        <div className="navbar-right">
                            {/* <UserAuthLink username={this.props.username} /> */}
                            <UserAuthLink username="george" />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;