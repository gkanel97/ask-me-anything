import React from "react";
import Header from "./header";
import Footer from "./footer";
import Content from "./content";
import {BrowserRouter as Router, Route, Switch, IndexRoute} from "react-router-dom";

import Home from "./home";
import About from "./about";
import Signup from "./signup";
import Signin from './signin';
import Signout from "./signout";
import Question from './question';
import Answer from "./answer";
import MyHome from "./myHome";
import NotFoundError from "./error";

import "../style/app.css"

class App extends React.Component {
    render() {
        return (
            <Router>
                <Header />
                <div className="container-md container-main">
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/about' exact component={About}/>
                        <Route path='/contact' exact component={About} />
                        <Route path='/signin' exact component={Signin} />
                        <Route path='/signup' exact component={Signup} />
                        <Route path='/signout' exact component={Signout} />
                        <Route path='/question' exact component={Question} />
                        <Route path='/question/ask' exact component={Question} />
                        <Route path='/question/stats' exact component={Question} />
                        <Route path='/question/answer' component={Answer} />
                        <Route path='/account' component={MyHome} />
                        <Route path='/account/contributions' exact component={Answer} />
                        <Route path='*' component={NotFoundError}></Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
}

export default App;
