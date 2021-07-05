import React, {Component} from 'react';
import Github from '../icons/github';

class About extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 mb-2">
                        <div className="card" style={{widht: "100%", height: "100%"}}>
                            <div className="card-header">
                                <h5 className="display-6">About this project</h5>
                            </div>
                            <div className="card-body align-middle p-5" style={{ textAlign: "justify" }}>
                                <p className="card-text fs-5">This application was created during the SaaS course of Computer Science major on National Technical University of Athens.</p>
                                <p className="card-text fs-5">It was built using Javascript and React along with NodeJS.</p>
                                <p className="card-text fs-5">Source code is available on our GitHub accounts. Feel free to have a look!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2" style={{ display: "grid", justifyContent: "center" }}>
                        <div className="card" style={{width: "18rem"}}>
                            <img src="https://avatars.githubusercontent.com/u/44244036?v=4" className="card-img-top" alt="chriserafi avatar" />
                            <div className="card-body">
                                <h5 className="card-title">Christos Serafeidis</h5>
                                <p className="card-text text-muted">@chserafi</p>
                                <a href="https://github.com/chriserafi" target="_blank" className="btn btn-primary">
                                    <Github />
                                    <span className="ms-1">Github Profile</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 mb-2" style={{ display: "grid", justifyContent: "center" }}>
                        <div className="card" style={{width: "18rem"}}>
                            <img src="https://avatars.githubusercontent.com/u/44344790?v=4" className="card-img-top" alt="absolutEngineer avatar" />
                            <div className="card-body">
                            <h5 className="card-title">George Kanellopoulos</h5>
                                <p className="card-text text-muted">@absolutEngineer</p>
                                <a href="https://github.com/absolutEngineer" target="_blank" className="btn btn-primary">
                                    <Github />
                                    <span className="ms-1">Github Profile</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;