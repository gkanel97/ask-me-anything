import React, { Component } from 'react';
import { fetchProtected } from '../scripts/auth.ts';
import { httpGet, httpGetProtected, httpPostProtected } from '../scripts/requests';

function KeywordBadgeList(props) {
    const tags = props.tags;
    const bagdeList = tags.map((t, i) => 
        <span className="badge bg-info text-dark m-1" key={i}>{t}</span>
    );

    return (
        <React.Fragment>
            {bagdeList}
        </React.Fragment>
    );
}

function KeywordDropdown(props) {
    const keywords = props.keywords;
    const hasKeywords = keywords.length !== 0;
    const display = (hasKeywords || props.current) ? "block" : "none";

    const badges = keywords.map((kw, index) =>
        <li key={index}><button className="dropdown-item" type="button" value={kw} onClick={props.onClickAdd}>{kw}</button></li>
    );

    const createButton = (
        <li><button className="dropdown-item" type="button" value={props.current} onClick={props.onClickCreate}>Create...</button></li>
    );

    return (
        <ul className="dropdown-menu" id="availableKeywords" style={{ width: "100%", display:display, top: "100%" }}>
            {
                hasKeywords ? badges : createButton
            }
        </ul>
    );
}

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            keywordText: '',
            keywordsBadgeList: [],
            keywordsDropdownList: [],
        }
        this.setInputValue = this.setInputValue.bind(this);
        this.setKeywordValue = this.setKeywordValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.addKeyword = this.addKeyword.bind(this);
        this.createKeyword = this.createKeyword.bind(this);
        this.clearKeywordText = this.clearKeywordText.bind(this);
        this.clearKeywordList = this.clearKeywordList.bind(this);
    }

    componentDidMount() {
        if (!this.props.isCreate) {
            httpGetProtected(`http://localhost:3000/question/getOne/${this.props.match.params.questionId}`)
            .then(payload => {
                this.setState({
                    title: payload.questionTitle,
                    text: payload.questionText,
                    keywordsBadgeList: payload.keywords.map(k => k.keywordText)
                });
            });
        }
    }

    setInputValue(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setKeywordValue(event) {
        this.setState({
            keywordText: event.target.value
        })

        if (event.target.value) {
            httpGet(`http://localhost:3000/keyword/search/5?text=${event.target.value}`)
                .then(payload => {
                    this.setState({
                        keywordsDropdownList: payload.map(keyword_obj => keyword_obj.keywordText)
                    });
                });
        }
        else {
            this.setState({
                keywordsDropdownList: []
            })
        }
    }

    addKeyword(event) {
        event.preventDefault();
        if (!this.state.keywordsBadgeList.includes(event.target.value)) {
            this.setState({
                keywordsBadgeList: [event.target.value, ...this.state.keywordsBadgeList]
            });
        }
    }

    createKeyword(event) {
        httpPostProtected('http://localhost:3000/keyword/create', {
            keywordText: event.target.value
        })
            .then(payload => {
                this.setState({
                    keywordsDropdownList: [payload.keywordText]
                })
            })
    }

    clearKeywordText(event) {
        if (event.keyCode === 27) {
            this.setState({
                keywordText: "",
                keywordsDropdownList: []
            })
        }
    }

    clearKeywordList(event) {
        event.preventDefault();
        this.setState({
            keywordsBadgeList: []
        });
    }

    async handleFormSubmission(event) {
        event.preventDefault();

        const { title, text, keywordsBadgeList } = this.state;

        try {
            const question = await httpPostProtected('http://localhost:3000/question/create', {
                questionTitle: title,
                questionText: text
            });

            for (let kw of keywordsBadgeList) {
                await httpPostProtected('http://localhost:3000/keyword/tag', {
                    questionId: question.id,
                    keywordText: kw
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <h2>{this.props.isCreate ? "Ask a question" : "Update your question"}</h2>
                <hr />
                <form onSubmit={this.handleFormSubmission}>
                    <div className="mb-3">
                        <label htmlFor="txtTitle" className="form-label">Question title</label>
                        <input className="form-control" id="txtTitle" name="title" value={this.state.title} onChange={this.setInputValue} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtText" className="form-label">Question text</label>
                        <textarea className="form-control" rows="10" id="txtText" name="text" value={this.state.text} onChange={this.setInputValue} required />
                    </div>
                    <label htmlFor="txtKeywords" className="form-label">Keywords</label>
                    <div className="input-group mb-3">
                        <div className="dropdown" style={{ width: "20%", display: "flex" }}>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="txtKeywords" 
                                list="availableKeywords" 
                                name="keywords" 
                                placeholder="Type a keyword" 
                                aria-describedby="keywordsBadgeListView" 
                                style={{ width: "100%", display: "flex", borderTopRightRadius: "0", borderBottomRightRadius: "0" }} 
                                value={this.state.keywordText} 
                                onChange={this.setKeywordValue} 
                                onKeyDown={this.clearKeywordText} 
                            />
                            <KeywordDropdown 
                                keywords={this.state.keywordsDropdownList} 
                                current={this.state.keywordText} 
                                onClickAdd={this.addKeyword} 
                                onClickCreate={this.createKeyword} 
                            />
                        </div>
                        <span className="input-group-text" id="keywordsBadgeListView" style={{ width: "65%", display: "flex", flexFlow: "wrap" }}>
                            <KeywordBadgeList
                                tags={this.state.keywordsBadgeList}
                            />
                        </span>
                        <button className="btn btn-secondary" id="btnClearKeywords" onClick={this.clearKeywordList} style={{ width: "15%" }}>Clear</button>
                    </div>
                    <button 
                        type="submit" 
                        className={`btn ${this.props.isCreate ? "btn-primary" : "btn-danger"}`} 
                        disabled={!(this.state.title && this.state.text)}
                    >
                        {this.props.isCreate ? "Create Question" : "Update Question"}
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

function CreateQuestion(props) {
    return <Question {...props} isCreate={true} />
}

function UpdateQuestion(props) {
    return <Question {...props} isCreate={false} />
}

export default Question;
export  { CreateQuestion, UpdateQuestion };