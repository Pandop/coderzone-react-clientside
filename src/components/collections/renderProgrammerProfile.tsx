import React from 'react'
import { QueryResult } from 'react-apollo';
import { OperationVariables } from 'apollo-boost';

import { getFullName } from '../../services/RequestHelpers';
import Spinner from '../features/loadSpinner';


const RenderProgrammerProfile = (result: QueryResult<any, OperationVariables>): JSX.Element => {
    const { loading, error, data, refetch } = result;
    console.log("Data:::::::::::>>>>>>>>>", data)
    if (loading) return <Spinner />;

    if (error) return <div className="alert alert-danger">Error :(</div>;

    const { profile: { avatar, firstName, lastName, bio } } = data.programmer;

    return <section className="d-flex flex-row justify-content-center card-transition">

        <div className="card m-5" style={{ minWidth: "55vh", overflowY: "hidden" }}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img className="card-img" src={avatar || "http://localhost:3000/assets/coder-default.png"} alt="coder" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">'{getFullName(firstName, lastName)}'</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Senior Developer</h6>
                        <p className="card-text">{bio}.</p>
                        <h6 className="card-subtitle mb-2 text-muted">Skills</h6>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default RenderProgrammerProfile;