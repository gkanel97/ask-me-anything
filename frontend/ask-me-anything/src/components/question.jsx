import React, {Component} from 'react';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            keywords: ''
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
                <h1>{JSON.stringify(this.props.match)}</h1>
                <h2>Ask a question</h2>
                <hr/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="txtTitle" className="form-label">Question title</label>
                        <input className="form-control" id="txtTitle" name="title" value={this.state.title} onChange={this.setInputValue} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtText" className="form-label">Question text</label>
                        <textarea className="form-control" rows="10" id="txtText" name="text" value={this.state.text} onChange={this.setInputValue} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtKeywords" className="form-label">Keywords</label>
                        <input className="form-control" id="txtKeywords" name="keywords" value={this.state.keywords} onChange={this.setInputValue} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleCredentialSubmission}>Create Question</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Question;