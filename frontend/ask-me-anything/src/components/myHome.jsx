import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import QuestionLg from '../icons/questionLg';

class MyHome extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>Welcome to My.AskMeAnything</h2>
                <div className="row" style={{ minHeight: "50vh" }}>
                    <div className="col-lg-9 my-2">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h4>Questions per day chart</h4>
                        </div>
                    </div>
                    <div className="col-lg-3 my-2 p-0">
                        <div className="row" style={{ height: "100%" }}>
                            <div className="col-12 mb-2">
                                <NavLink to='/account/contributions' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3 position-relative">
                                        <h5 className="home-fancy-button">My contributions</h5>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 my-2">
                                <NavLink to='/question/ask' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3 position-relative">
                                        <h5 className="home-fancy-button">Create a question</h5>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 mt-2">
                                <NavLink to='/question' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3 position-relative">
                                        <h5 className="home-fancy-button">Answer a question</h5>
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