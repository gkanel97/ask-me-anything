import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { httpGet } from '../scripts/requests';
import { KEYWORD_BASE_URL, QUESTION_BASE_URL } from '../configuration/URLS';

class Home extends Component {

    async componentDidMount() {
        Chart.register(...registerables);

        async function questionsChart() {
            async function formatData() {
                let formattedData = await httpGet(`${QUESTION_BASE_URL}/getQuestionsPerDay/7`)
                .then(payload => {
                    return  payload.reduce( (acc, v) => { return {...acc, [v.date]: v.count} }, {});
                });
                let currentDay = new Date();
                let today = new Date();
                let data = new Array();
                currentDay.setDate(currentDay.getDate() - 7);
                while (currentDay <= today) {
                    let dateString = currentDay.toISOString().split('T')[0];
                    let dateCount = formattedData[dateString] ?? 0;
                    data.push({date: dateString, count: dateCount});
                    currentDay.setDate(currentDay.getDate() + 1);
                }
                return data;
            }

            const ctx = document.getElementById('questionFrequencyChart').getContext('2d');
            const cfg = {
                type: 'line',
                data: {
                    datasets: [{
                        label: '# Questions',
                        data: await formatData(),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        parsing: {
                            xAxisKey: 'date',
                            yAxisKey: 'count'
                        }
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Questions per day',
                            color: 'rgba(255, 255, 255, 1)',
                            font: {
                                size: 22,
                                weight: 'normal'
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        yAxis: {
                            ticks: {
                                precision: 0,
                                stepSize: 1
                            }
                        }
                    }
                }
            };

            new Chart(ctx, cfg);
        }

        async function keywordsChart() {
            const ctx = document.getElementById('keywordFrequencyChart').getContext('2d');
            const cfg = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: '# Questions',
                        data: await httpGet(`${KEYWORD_BASE_URL}/questionsPerKeyword/10`),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        parsing: {
                            yAxisKey: 'keyword',
                            xAxisKey: 'count'
                        }
                    }]
                },
                options: {
                    indexAxis: 'y',
                    plugins: {
                        title: {
                            display: true,
                            text: 'Most popular keywords',
                            color: 'rgba(255, 255, 255, 1)',
                            font: {
                                size: 22,
                                weight: 'normal'
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        xAxis: {
                            ticks: {
                                precision: 0,
                                stepSize: 1
                            }
                        }
                    }
                }
            };

            new Chart(ctx, cfg);
        }

        await questionsChart();
        await keywordsChart();
    }

    render() {
        return (
            <React.Fragment>
                <h2>Welcome to AskMeAnything</h2>
                <div className="row" style={{ minHeight: "50vh" }}>
                    <div className="col-lg-5 my-2">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <canvas id="questionFrequencyChart" width="95%" height="95%"></canvas>
                        </div>
                    </div>
                    <div className="col-lg-5 my-2">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <canvas id="keywordFrequencyChart" width="95%" height="95%"></canvas>
                        </div>
                    </div>
                    <div className="col-lg-2 my-2 p-0">
                        <div className="row" style={{ height: "100%" }}>
                            <div className="col-12 mb-2">
                                <NavLink to='/question/ask' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-2 text-white bg-dark rounded-3 position-relative">
                                        <h5 className="home-fancy-button">Create a question</h5>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 mt-2">
                                <NavLink to='/question' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-2 text-white bg-dark rounded-3 position-relative">
                                        <h5 className="home-fancy-button">Answer a question</h5>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;