import React from "react";
import Header from "./header";
import Footer from "./footer";
import Content from "./content";
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Content />
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;