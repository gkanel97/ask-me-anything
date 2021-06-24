import React, { Component } from 'react';
import { httpGetProtected, httpPostProtected } from '../scripts/requests';
import QuestionList from './questionList';
import AnswerList from './answerList';

class Contributions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
            questions: [],
            answers: []
        };
        this.setActiveTabIndex = this.setActiveTabIndex.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.deleteAnswer = this.deleteAnswer.bind(this);
    }

    componentDidMount() {
        Promise.all([
            httpGetProtected('http://localhost:3000/question/getMy/20'),
            httpGetProtected('http://localhost:3000/answer/getMy/20')
        ])
        .then(([qR, aR]) => {
            this.setState({
                questions: qR,
                answers: aR
            });
        })
        .catch(e => console.log(e));
    }

    setActiveTabIndex(event) {
        this.setState({
            activeTabIndex: parseInt(event.target.value)
        });
    }

    deleteQuestion(event) {
        const sure = confirm("Are you sure you want to delete this question?");

        if (sure) {
            const id = parseInt(event.target.value);
            httpPostProtected(`http://localhost:3000/question/delete/${id}`)
        }
    }

    deleteAnswer(event) {
        const sure = confirm("Are you sure you want to delete this answer?");

        if (sure) {
            const id = parseInt(event.target.value);
            httpPostProtected(`http://localhost:3000/answer/delete/${id}`)
        }
    }

    render() {
        const questionsTabActive = this.state.activeTabIndex === 0;
        const answersTabActive = !questionsTabActive;

        return (
            <React.Fragment>
                <h2>Your contributions!</h2>
                <hr />
                <ul className="nav nav-tabs" id="contributions" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${questionsTabActive ? "active" : ""}`} id="questions-tab" data-bs-toggle="tab" data-bs-target="#questions" type="button" role="tab" aria-controls="questions" aria-selected={questionsTabActive} value="0" onClick={this.setActiveTabIndex}>Your Questions</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${answersTabActive ? "active" : ""}`} id="answers-tab" data-bs-toggle="tab" data-bs-target="#answers" type="button" role="tab" aria-controls="answers" aria-selected={answersTabActive} value="1" onClick={this.setActiveTabIndex}>Your Answers</button>
                    </li>
                </ul>
                <div class="tab-content" id="contributionsContent">
                    <div className={`tab-pane fade ${questionsTabActive ? "show active" : ""} mt-2`} id="questions" role="tabpanel" aria-labelledby="questions-tab">
                        <QuestionList questions={this.state.questions} onDelete={this.deleteQuestion} />
                    </div>
                    <div className={`tab-pane fade ${answersTabActive ? "show active" : ""} mt-2`} id="answers" role="tabpanel" aria-labelledby="answers-tab">
                        <AnswerList answers={this.state.answers} onDelete={this.deleteAnswer} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Contributions;