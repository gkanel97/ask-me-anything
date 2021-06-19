import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="navbar navbar-expand-md fixed-bottom navbar-light bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav nav-fill w-100">
                        <li className="nav-item">
                            <Link className="nav-link" to='/about'>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/contact'>Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Project Documentation</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Github</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://courses.pclab.ece.ntua.gr/course/view.php?id=34" target="_blank">Course Materials</a>
                        </li>
                    </ul>
                </div>
            </footer>
        );
    }
}

export default Footer;