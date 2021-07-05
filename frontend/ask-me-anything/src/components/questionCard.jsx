import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FileText from "../icons/fileText";
import KeywordBadgeList from './keywordBadgeList';

class QuestionCard extends Component {
    render() {
        const q = this.props.question;
        const cDate = new Date(q.creationDate);

        return (
            <div className="card my-2" key={q.id}>
                <div className="card-header">
                    <strong>{q.questionTitle}</strong>
                </div>
                <div className="card-body">
                    {q.questionText}
                    {
                        q.keywords?.length > 0
                        ?
                            <React.Fragment>
                                <hr />
                                <div className="">
                                    <KeywordBadgeList tags={q.keywords.map(k => k.keywordText)} />
                                </div>
                            </React.Fragment>
                        :
                            null
                    }
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-8" style={{ position: "relative" }}>
                            <span className="text-muted list-fancy-text">Asked on {cDate.toLocaleString()}</span>
                        </div>
                        <div className="col-4" style={{ textAlign: "right" }}>
                            <div className="btn-group" role="group">
                                <Link to={`/question/answer/${q.id}`} className="btn btn-primary" type="button">
                                    <FileText />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionCard;