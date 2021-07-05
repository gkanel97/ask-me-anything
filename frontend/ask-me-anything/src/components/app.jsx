import React from "react";
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { isValidToken } from "../scripts/auth";

import Home from "./home";
import About from "./about";
import Signup from "./signup";
import Signin from './signin';
import Signout from "./signout";
import Question from './question';
import Answer from "./answer";
import MyHome from "./myHome";
import NotFoundError from "./error";
import Contributions from "./contributions";
import QuestionHome from "./questionHome";
import Terms from "./terms";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: ''
        }

        this.authCallback = this.authCallback.bind(this);
        // this.renderProtected = this.renderProtected.bind(this);
    }

    isAuthenticated() {
        return Boolean(this.state.username) && isValidToken(this.state.token);
    }

    renderProtected(ProtectedComponent, moreProps) {
        if (this.isAuthenticated()) {
            return (props) => <ProtectedComponent {...props} {...moreProps} />;
        }
        else {
            return (props) => <Redirect to='/auth/signin' />;
        }
    }

    redirectAuthenticated(AuthComponent) {
        if (this.isAuthenticated()) {
            return (props) => <Redirect to='/account' />;
        }
        else {
            return (props) => <AuthComponent appCallback={this.authCallback} {...props} />;
        }
    }

    authCallback(username, token) {
        this.setState({
            username: username,
            token: token
        })
    }

    render() {
        return (
            <Router>
                <Header username={this.state.username} />
                <div className="container-md container-main">
                    <Switch>
                        {/* HOME ROUTES */}
                        <Route exact path='/' component={Home} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/contact' component={About} />
                        <Route exact path='/terms' component={Terms} />

                        {/* AUTH ROUTES */}
                        <Route exact path='/auth/signin' render={
                            // (props) => <Signin appCallback={this.authCallback} {...props} />
                            this.redirectAuthenticated(Signin)
                        } />
                        <Route exact path='/auth/signup' render={
                            // (props) => <Signup appCallback={this.authCallback} {...props} />
                            this.redirectAuthenticated(Signup)
                        } />
                        <Route exact path='/auth/signout' render={
                            (props) => <Signout appCallback={this.authCallback} {...props} />
                        } />

                        {/* ACCOUNT ROUTES */}
                        <Route exact path='/account' render={this.renderProtected(MyHome)} />
                        <Route exact path='/account/contributions' render={this.renderProtected(Contributions)} />

                        {/* QUESTIONS ROUTES */}
                        <Route exact path='/question' render={
                            (props) => <QuestionHome {...props} hasAuthenticatedUser={this.isAuthenticated()} />
                        } /> 
                        <Route exact path='/question/ask' render={this.renderProtected(Question)} />
                        <Route exact path='/question/answer/:questionId' render={this.renderProtected(Answer)} />

                        {/* ERROR ROUTES */}
                        <Route path='*' component={NotFoundError}></Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
}

export default App;
