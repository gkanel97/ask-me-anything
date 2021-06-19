import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import Home from "./home";
import About from "./about";
import Signup from "./signup";
import Signin from './signin';
import Question from './question';
import Answer from "./answer";
import MyHome from "./myHome";

class Content extends Component {
    render() {
        return (
            <div className="container container-md my-5">
                <Route path='/' exact component={Home}></Route>
                <Route path='/about' component={About} ></Route>
                <Route path='/signin' component={Signin}></Route>
                <Route path='/signup' component={Signup}></Route>
                <Route path='/question' component={Question}></Route>
                <Route path='/answer' component={Answer}></Route>
                <Route path='/my' component={MyHome}></Route>
            </div>
        );
    }
}

export default Content;