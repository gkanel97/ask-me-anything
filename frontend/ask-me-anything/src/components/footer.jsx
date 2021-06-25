import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FileText from '../icons/fileText';
import Github from '../icons/github';

class Footer extends Component {
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
            <nav className="navbar navbar-expand-lg fixed-bottom navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#footerContent" aria-controls="footerContent" aria-expanded={!this.state.isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={this.toggleCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`navbar-menu navbar-collapse ${this.state.isNavCollapsed ? "collapse" : ""}`} id="footerContent">
                        <ul className="navbar-nav nav-fill w-100">
                            <li className="nav-item">
                                <Link className="nav-link" to='/about'>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/contact'>Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <FileText />
                                    <span className="ms-1">Project Documentation</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <Github />
                                    <span className="ms-1">Github</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34" target="_blank">Course Materials</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Footer;