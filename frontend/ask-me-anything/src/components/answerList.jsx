import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Trash from '../icons/trash';

class AnswerCard extends Component {
    render() {
        const a = this.props.answer;
        const cDate = new Date(a.createDate);

        return (
            <div className="card my-1" key={a.id}>
                <div className="card-header">
                    <span className="fw-bold fst-italic">Question:</span> {a.question.questionTitle}
                </div>
                <div className="card-body">
                    {a.answerText}
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-8" style={{ position: "relative" }}>
                            <span className="text-muted list-fancy-text">Answered on {cDate.toLocaleString()}</span>
                        </div>
                        <div className="col-4" style={{ textAlign: "right" }}>
                            <button className="btn btn-danger" onClick={this.props.onDelete}>
                                <Trash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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