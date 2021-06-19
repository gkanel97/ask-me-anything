import React, {Component} from 'react';

class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        }
        this.setInputValue = this.setInputValue.bind(this);
        this.handleCredentialSubmission = this.handleCredentialSubmission.bind(this);
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]:  event.target.value
        });
    }

    handleCredentialSubmission(e) {
        e.preventDefault();
        alert(`You submitted title: ${this.state.title} & text: ${this.state.text}`);
    }

    render() {
        return (
            <React.Fragment>
                <h2>Question Title</h2>
                <p>Question Text</p>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="txtAnswer" className="form-label">Your answer</label>
                        <textarea className="form-control" rows="10" id="txtAnswer" name="answer" value={this.state.answer} onChange={this.setInputValue} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleCredentialSubmission}>Answer</button>
                </form>
                <hr/>
                <h3>Other Answers</h3>
            </React.Fragment>
        );
    }
}

export default Answer;