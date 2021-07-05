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
            searchByOption: "t"
        };

        this.searchByRef = React.createRef();

        this.setSearchText = this.setSearchText.bind(this);
        this.setSearchByOption = this.setSearchByOption.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        httpGet(`${QUESTION_BASE_URL}/getMany/${this.props.hasAuthenticatedUser ? 30 : 10}`)
        .then(qL => {
            this.setState({
                questionList: qL
            });
        })
        .catch(e => {
            console.log(e);
            this.props.history.push("/")
        });
    }

    setSearchText(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    setSearchByOption(event) {
        this.setState({
            searchByOption: event.target.value
        });
    }

    search(event) {
        event.preventDefault();

        if (!this.state.searchText) {
            if(this.state.isQuestionListFiltered) {
                httpGet(`${QUESTION_BASE_URL}/getMany/30`)
                .then(qL => {
                    this.setState({
                        questionList: qL,
                        isQuestionListFiltered: false
                    });
                })
                .catch(e => {
                    console.log(e);
                    this.props.history.push("/")
                });
            }
            return;
        }

        switch (this.searchByRef.current.value) {
            case 't':
                httpGet(`${QUESTION_BASE_URL}/searchByTitle/30?title=${this.state.searchText}`)
                .then(payload => {
                    this.setState({
                        questionList: payload,
                        isQuestionListFiltered: true
                    })
                })
                .catch(e => {
                    console.log(e);
                    this.props.history.push("/")
                });
                break;
            case 'k':
                httpGet(`${KEYWORD_BASE_URL}/filterQuestionsByKeyword/30?text=${this.state.searchText}`)
                .then(payload => {
                    this.setState({
                        questionList: payload,
                        isQuestionListFiltered: true
                    })
                })
                .catch(e => {
                    console.log(e);
                    this.props.history.push("/")
                });
                break;
            case 'd':
                    httpGet(`${QUESTION_BASE_URL}/searchByDate/30?date=${this.state.searchText}`)
                    .then(payload => {
                        this.setState({
                            questionList: payload,
                            isQuestionListFiltered: true
                        })
                    })
                    .catch(e => {
                        console.log(e);
                        this.props.history.push("/")
                    });
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
                        {
                            this.props.hasAuthenticatedUser
                            ?
                                <div className="input-group mb-3">
                                    <input type={this.state.searchByOption === "d" ? "date" : "search"} className="form-control" value={this.state.searchText} onChange={this.setSearchText} style={{ width: "50%" }} />
                                    <select ref={this.searchByRef} className="form-select" style={{ width: "30%" }} onChange={this.setSearchByOption}>
                                        <option value="t" selected>By Title</option>
                                        <option value="k">By Keyword</option>
                                        <option value="d">By Date</option>
                                    </select>
                                    <button class="btn btn-info" type="button" onClick={this.search} style={{ width: "20%" }}>Search</button>
                                </div>
                            :
                                null
                        }
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