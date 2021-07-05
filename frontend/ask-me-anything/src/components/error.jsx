import React, { Component } from 'react';

class NotFoundError extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <React.Fragment>
                <p className="text-center" style={{ fontSize: "15rem", fontWeight: "bold" }}>404</p>
                <p className="text-center" style={{ fontSize: "3rem" }}>Not Found!</p>
            </React.Fragment>
        );
    }
}
 
export default NotFoundError;