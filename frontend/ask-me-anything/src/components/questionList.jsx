import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PencilSquare from '../icons/pencilSquare';
import Trash from '../icons/trash';

class QuestionCard extends Component {
    render() {
        const q = this.props.question;
        const cDate = new Date(q.creationDate);

        return (
            <div className="card my-1" key={q.id}>
                <div className="card-header">
                    <strong>{q.questionTitle}</strong>
                </div>
                <div className="card-body">
                    {q.questionText}
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-8" style={{ position: "relative" }}>
                            <span className="text-muted list-fancy-text">Asked on {cDate.toLocaleString()}</span>
                        </div>
                        <div className="col-4" style={{ textAlign: "right" }}>
                            <div className="btn-group" role="group">
                                <Link to={`/question/answer/${q.id}`} className="btn btn-primary" type="button">Answer Me!</Link>
                                <Link to={`/question/update/${q.id}`} className="btn btn-warning" type="button">
                                    <PencilSquare />
                                </Link>
                                <button className="btn btn-danger" type="button" onClick={this.props.onDelete} value={q.id}>
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class QuestionList extends Component {
    render() { 
        return (
            <React.Fragment>
                {this.props.questions.map(q => <QuestionCard question={q} onDelete={this.props.onDelete} />)}
            </React.Fragment>
        );
    }
}
 
export default QuestionList;