import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { httpGet } from '../scripts/requests';
import { KEYWORD_BASE_URL, QUESTION_BASE_URL } from '../configuration/URLS';
import PencilSquare from '../icons/pencilSquare';
import FileText from '../icons/fileText';

class Home extends Component {

    async componentDidMount() {
        Chart.register(...registerables);

        async function questionsChart() {
            async function formatData() {
                let formattedData = await httpGet(`${QUESTION_BASE_URL}/getQuestionsPerDay/7`)
                .then(payload => {
                    return  payload.reduce( (acc, v) => { return {...acc, [v.date]: v.count} }, {});
                })
                .catch( () => {
                    return null;
                });
                if (formattedData) {
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
                else {
                    return null;
                }
            }

            const ctx = document.getElementById('questionFrequencyChart').getContext('2d');
            const graphData = await formatData();
            if (!graphData) {
                const graphContainer = document.getElementById('questionFrequencyChart').parentElement;
                graphContainer.innerText = "Sorry! An error occured while rendering this graph.";
                return;
            }
            const cfg = {
                type: 'line',
                data: {
                    datasets: [{
                        label: '# Questions',
                        data: graphData,
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
            const graphData = await httpGet(`${KEYWORD_BASE_URL}/questionsPerKeyword/10`).catch(() => {return null});
            if (!graphData) {
                const graphContainer = document.getElementById('keywordFrequencyChart').parentElement;
                graphContainer.innerText = "Sorry! An error occured while rendering this graph.";
                return;
            }
            const cfg = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: '# Questions',
                        data: graphData,
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
                    <div className="col-lg-2 my-2 p-lg-0">
                        <NavLink to='/question/ask' style={{ textDecoration: 'none' }}>
                            <div className="p-2 mb-2 text-white bg-dark rounded-3 position-relative" style={{ height: "calc(50% - 0.25rem)", minHeight: "10rem" }}>
                                <div className="home-fancy-button">
                                    <PencilSquare height="60%" width="60%" />
                                    <br />
                                    <h5 className="">Create</h5>
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to='/question' style={{ textDecoration: 'none' }}>
                            <div className="p-2 mt-2 text-white bg-dark rounded-3 position-relative" style={{ height: "calc(50% - 0.25rem)", minHeight: "10rem" }}>
                                <div className="home-fancy-button">
                                    <FileText height="60%" width="60%" />
                                    <br />
                                    <h5 className="">Answer</h5>
                                </div>
                            </div>
                        </NavLink>
                        {/* <div className="row" style={{ height: "100%" }}>
                            <div className="col-12 mb-2">
                                <NavLink to='/question/ask' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-2 text-white bg-dark rounded-3 position-relative">
                                        <div className="home-fancy-button">
                                            <PencilSquare height="60%" width="60%" />
                                            <br />
                                            <h5 className="">Create</h5>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 mt-2">
                                <NavLink to='/question' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-2 text-white bg-dark rounded-3 position-relative">
                                        <div className="home-fancy-button">
                                            <FileText height="60%" width="60%" />
                                            <br />
                                            <h5 className="">Answer</h5>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;