import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { httpGet, httpGetProtected } from '../scripts/requests';
import { ANSWER_BASE_URL, QUESTION_BASE_URL } from '../configuration/URLS';

class MyHome extends Component {
    async componentDidMount() {
        Chart.register(...registerables);

        async function formatData(url) {
            let formattedData = await httpGetProtected(url)
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

        const ctx = document.getElementById('contributionsChart').getContext('2d');
        const cfg = {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Questions per day',
                    data: await formatData(`${QUESTION_BASE_URL}/getMyQuestionsPerDay/7`),
                    backgroundColor: 'rgba(54, 162, 235, 0.9)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    parsing: {
                        xAxisKey: 'date',
                        yAxisKey: 'count'
                    }
                },
                {
                    label: 'Answers per day',
                    data: await formatData(`${ANSWER_BASE_URL}/getMyAnswersPerDay/7`),
                    backgroundColor: 'rgba(255, 159, 64, 0.9)',
                    borderColor: 'rgba(255, 159, 64, 1)',
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
                        text: 'My contributions per day',
                        color: 'rgba(255, 255, 255, 1)',
                        font: {
                            size: 22,
                            weight: 'normal'
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
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

    render() {
        return (
            <React.Fragment>
                <h2>Welcome to My.AskMeAnything</h2>
                <div className="row" style={{ minHeight: "50vh", maxHeight: "80vh" }}>
                    <div className="col-lg-9 my-2" >
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <canvas id="contributionsChart"></canvas>
                        </div>
                    </div>
                    <div className="col-lg-3 my-2 p-0">
                        <div className="row" style={{ height: "100%" }}>
                            <div className="col-12 mb-2">
                                <NavLink to='/account/contributions' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3 position-relative">
                                        <h5 className="home-fancy-button">My contributions</h5>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 my-2">
                                <NavLink to='/question/ask' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3 position-relative">
                                        <h5 className="home-fancy-button">Create a question</h5>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-12 mt-2">
                                <NavLink to='/question' style={{ textDecoration: 'none' }}>
                                    <div className="h-100 p-5 text-white bg-dark rounded-3 position-relative">
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

export default MyHome;