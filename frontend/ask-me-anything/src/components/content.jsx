import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

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
            <div className="container-md my-5">
                <Switch>
                    <Route path='/' exact component={Home}></Route>
                    <Route path='/about' exact component={About} ></Route>
                    <Route path='/signin' exact component={Signin}></Route>
                    <Route path='/signup' exact component={Signup}></Route>
                    <Route path='/question' exact component={Question}></Route>
                    <Route path='/answer' exact component={Answer}></Route>
                    <Route path='/my' exact component={MyHome}></Route>
                    <Route path='*' render={() => {
                        return <h1>404</h1>
                    }}></Route>
                </Switch>
            </div>
        );
    }
}

export default Content;