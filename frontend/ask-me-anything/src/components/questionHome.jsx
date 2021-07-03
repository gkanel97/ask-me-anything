import React, { Component } from 'react';
import QuestionList from './questionList';
import { QUESTION_BASE_URL } from '../configuration/URLS';
import { httpGet } from '../scripts/requests';

class QuestionHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
            searchText: "",
            searchOption: "t"
        };

        this.setSearchText = this.setSearchText.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        httpGet(`${QUESTION_BASE_URL}/getMany/20`)
        .then(qL => {
            this.setState({
                questionList: qL
            });
        })
    }

    setSearchText(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    search(event) {
        event.preventDefault();
    }

    render() { 
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-7">
                        <h2>Browse Questions</h2>
                    </div>
                    <div className="col-lg-5">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" value={this.state.searchText} onChange={this.setSearchText} style={{ width: "50%" }} />
                            <select className="form-select" style={{ width: "30%" }}>
                                <option value="t" selected>By Title</option>
                                <option value="k">By Keyword</option>
                            </select>
                            <button class="btn btn-info" type="button" onClick={this.search} style={{ width: "20%" }}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="container-lg px-0">
                    <QuestionList questions={this.state.questionList} />
                </div>
            </React.Fragment>
        );
    }
}
 
export default QuestionHome;