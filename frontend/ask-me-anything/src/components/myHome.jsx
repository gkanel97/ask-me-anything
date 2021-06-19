import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class MyHome extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Welcome to My.AskMeAnything</h2>
                <div className="row">
                    <div className="col-lg-9 my-2">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h4>Questions per day chart</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 my-2 p-0">
                        <div className="row">
                            <div className="col-12 my-2">
                                <NavLink to='/question' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3">
                                        <h5 className="m-0 justify-content-center">My contributions</h5>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 my-2">
                                <NavLink to='/answer' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3">
                                        <h5 className="m-0 justify-content-center">Create a question</h5>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 my-2">
                                <NavLink to='/answer' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3">
                                        <h5 className="m-0 justify-content-center">Answer a question</h5>
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

export default MyHome;