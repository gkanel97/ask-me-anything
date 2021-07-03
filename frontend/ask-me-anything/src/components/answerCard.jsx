import React, { Component } from 'react';
import Trash from '../icons/trash';

function AnswerCardCustomFooter(props) {
    if (props.onDelete) {
        return (
            <div className="row">
                <div className="col-8" style={{ position: "relative" }}>
                    <span className="text-muted list-fancy-text">Answered on {props.date.toLocaleString()}</span>
                </div>
                <div className="col-4" style={{ textAlign: "right" }}>
                    <button className="btn btn-danger" onClick={props.onDelete} value={props.id}>
                        <Trash />
                    </button>
                </div>
            </div>
        );
    }
    else {
        return (
            <span className="text-muted list-fancy-text">Answered on {props.date.toLocaleString()}</span>
        );
    }
}

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
                    <AnswerCardCustomFooter date={cDate} id={a.id} onDelete={this.props.onDelete} />
                </div>
            </div>
        );
    }
}

export default AnswerCard;