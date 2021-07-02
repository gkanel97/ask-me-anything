import React, {Component} from 'react';
import { fetchProtected } from '../scripts/auth';

class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
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
        fetchProtected(`http://localhost:3000/question/getOne/${this.props.match.params.questionId}`, {
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(payload => {
            this.setState({
                title: payload.questionTitle,
                text: payload.questionText,
                answers: payload.answers
            })
        })
    }

    handleFormSubmission(e) {
        e.preventDefault();
        fetchProtected('http://localhost:3000/answer/create', {
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
        .then(payload => alert(JSON.stringify(payload)));
    }

    render() {
        return (
            <React.Fragment>
                <h2>{this.state.title}</h2>
                <p>{this.state.text}</p>
                <hr/>
                <form onSubmit={this.handleFormSubmission}>
                    <div className="mb-3">
                        <label htmlFor="txtAnswer" className="form-label">Your answer</label>
                        <textarea className="form-control" rows="10" id="txtAnswer" name="user_answer" value={this.state.user_answer} onChange={this.setInputValue} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Answer</button>
                </form>
                <hr/>
                <h3>Other Answers</h3>
                <br />
                <ul className="list-group">
                    {this.state.answers.map(answer => <li className="list-group-item" key={answer.id}>{answer.answerText}</li>)}
                </ul>
            </React.Fragment>
        );
    }
}

export default Answer;