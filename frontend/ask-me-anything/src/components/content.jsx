import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Home from "./home";
import About from "./about";
import Signup from "./signup";
import Signin from './signin';

class Content extends Component {
    render() {
        return (
            <div className="container container-md mt-5">
                <Route path='/' exact component={Home}></Route>
                <Route path='/about' component={About} ></Route>
                <Route path='/signin' component={Signin}></Route>
                <Route path='/signup' component={Signup}></Route>
            </div>
        );
    }
}

export default Content;