import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QuestionList from './questionList';
import { KEYWORD_BASE_URL, QUESTION_BASE_URL } from '../configuration/URLS';
import { httpGet } from '../scripts/requests';

class QuestionHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
            isQuestionListFiltered: false,
            searchText: "",
            searchOption: "t"
        };

        this.searchByRef = React.createRef();

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

        if (!this.state.searchText) {
            if(this.state.isQuestionListFiltered) {
                httpGet(`${QUESTION_BASE_URL}/getMany/20`)
                .then(qL => {
                    this.setState({
                        questionList: qL,
                        isQuestionListFiltered: false
                    });
                })
            }
            return;
        }

        switch (this.searchByRef.current.value) {
            case 't':
                httpGet(`${QUESTION_BASE_URL}/searchByTitle/20?title=${this.state.searchText}`)
                .then(payload => {
                    this.setState({
                        questionList: payload,
                        isQuestionListFiltered: true
                    })
                })
                break;
            case 'k':
                httpGet(`${KEYWORD_BASE_URL}/filterQuestionsByKeyword/20?text=${this.state.searchText}`)
                .then(payload => {
                    this.setState({
                        questionList: payload,
                        isQuestionListFiltered: true
                    })
                })
                break;
            default:
                break;
        }
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
                            <select ref={this.searchByRef} className="form-select" style={{ width: "30%" }}>
                                <option value="t" selected>By Title</option>
                                <option value="k">By Keyword</option>
                            </select>
                            <button class="btn btn-info" type="button" onClick={this.search} style={{ width: "20%" }}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="container-lg px-0">
                    {
                        this.state.questionList.length > 0
                        ?
                            <QuestionList questions={this.state.questionList} />
                        :
                            <div className="alert alert-dark text-center my-5" role="alert">
                                <h5 className="fw-bold">Seems like we couldn't find any question related to your search</h5>
                                <p>Consider asking a new question <Link to='/question/ask'>here</Link>!</p>
                            </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}
 
export default QuestionHome;