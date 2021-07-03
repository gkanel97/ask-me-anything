import React, { Component } from 'react';
import AnswerCard from './answerCard';

class AnswerList extends Component {
    render() { 
        return (
            <React.Fragment>
                {this.props.answers.map(a => <AnswerCard answer={a} onDelete={this.props.onDelete} />)}
            </React.Fragment>
        );
    }
}
 
export default AnswerList;