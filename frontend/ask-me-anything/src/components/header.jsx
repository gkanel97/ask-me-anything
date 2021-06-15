import React from 'react';
import Logo from "../logo.svg";

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
                    <div className="navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;