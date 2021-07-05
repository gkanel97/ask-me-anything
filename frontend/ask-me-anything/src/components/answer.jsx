import React, {Component} from 'react';
import KeywordBadgeList from './keywordBadgeList';
import { ANSWER_BASE_URL, QUESTION_BASE_URL } from '../configuration/URLS';
import { fetchProtected } from '../scripts/auth';

class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            tags: [],
            answers: [],
            user_answer: ''
        }
        this.setInputValue = this.setInputValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]:  event.target.value
        });
    }

    componentDidMount() {
        fetchProtected(`${QUESTION_BASE_URL}/getOne/${this.props.match.params.questionId}`, {
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(payload => {
            this.setState({
                title: payload.questionTitle,
                text: payload.questionText,
                tags: payload.keywords.map(k => k.keywordText),
                answers: payload.answers.reverse()
            })
        })
    }

    handleFormSubmission(e) {
        e.preventDefault();
        fetchProtected(`${ANSWER_BASE_URL}/create`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                questionId: parseInt(this.props.match.params.questionId),
                answerText: this.state.user_answer
            })
        })
        .then(response => response.json())
        .then(payload => {
            this.setState({
                user_answer: '',
                answers: [payload, ...this.state.answers ]
            })
        });
    }

    render() {
        return (
            <React.Fragment>
                <h2>{this.state.title}</h2>
                <div className="alert alert-secondary px-0 py-1" role="alert">
                    <KeywordBadgeList tags={this.state.tags} />
                </div>
                <hr />
                <p>{this.state.text}</p>
                <form onSubmit={this.handleFormSubmission}>
                    <div className="card mb-3">
                        <div className="card-header">
                            <label htmlFor="txtAnswer" className="form-label">Your answer</label>
                        </div>
                        <textarea className="form-control card-body" rows="10" id="txtAnswer" name="user_answer" value={this.state.user_answer} onChange={this.setInputValue} required style={{ borderRadius: "0" }} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!this.state.user_answer}>Answer</button>
                </form>
                <hr/>
                <h3>Other Answers</h3>
                <br />
                <ul className="list-group">
                    {
                        this.state.answers.map(answer => 
                            <li className="list-group-item" key={answer.id}>
                                <p>{answer.answerText}</p>
                                <small className="text-muted">{(new Date(answer.createDate)).toLocaleString()}</small>
                            </li>
                        )
                    }
                </ul>
            </React.Fragment>
        );
    }
}

export default Answer;