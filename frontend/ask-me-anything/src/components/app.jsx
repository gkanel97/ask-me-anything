import React from "react";
import Header from "./header";
import Footer from "./footer";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;