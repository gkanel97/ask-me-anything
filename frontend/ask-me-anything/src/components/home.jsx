import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>{JSON.stringify(this.props.match)}</h1>
                <h2>Welcome to AskMeAnything</h2>
                <div className="row" style={{ minHeight: "50vh" }}>
                    <div className="col-lg-5 my-2">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h4>Questions per day chart</h4>
                        </div>
                    </div>
                    <div className="col-lg-5 my-2">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h5>Top 10 Keywords</h5>
                            <ol>
                                <li>Lorem - 100</li>
                                <li>Ipsum - 88</li>
                                <li>Dolor - 42</li>
                            </ol>
                        </div>
                    </div>
                    <div className="col-lg-2 my-2 p-0">
                        <div className="row" style={{ height: "100%" }}>
                            <div className="col-12 mb-2">
                                <NavLink to='/question' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-2 text-white bg-dark rounded-3 position-relative">
                                        <p className="home-fancy-button">Create a question</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 mt-2">
                                <NavLink to='/answer' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-2 text-white bg-dark rounded-3 position-relative">
                                        <p className="home-fancy-button">Answer a question</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;