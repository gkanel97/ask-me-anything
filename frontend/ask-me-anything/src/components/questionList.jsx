import React, { Component } from 'react';
import QuestionCard from './questionCard';

class QuestionList extends Component {
    render() { 
        return (
            <React.Fragment>
                {this.props.questions.map(q => <QuestionCard question={q} />)}
            </React.Fragment>
        );
    }
}
 
export default QuestionList;