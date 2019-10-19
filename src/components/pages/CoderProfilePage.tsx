import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { getFullName } from '../../services/RequestHelpers';
import CodersStore from '../../store/codersStore';

type GUID = string;
interface IRouteParams extends RouteComponentProps { id: GUID }

const requestBody = {
    query: `		
	query pgm($uuid: ID!) 
		{
			programmer(id: $uuid) 
			{
				userName
				email
				profile 
				{
					id
					firstName
					lastName
					avatar
					bio
				}
				country { name	}
				state{
					id
					name
					postCode
				}
				projects {
					id
					name
				}
				skills {
					id
					name
				}
				works {
					title
					startDate
					endDate
				}
				qualifications {
					id
					title
				}
			}
		}`
};

const CoderProfilePage: React.FunctionComponent<RouteComponentProps> = ({ match }) => {
    const { id } = match.params as IRouteParams;
    const store = useContext(CodersStore);
    const { loadingInitial, programmer, loadProgrammer } = store;

    //const [programmer, setData] = useState<Programmer>();

    useEffect(() => {
        //getGraphQlServerResult(requestBody.query, {uuid: id});	
        loadProgrammer(requestBody.query, { uuid: id });
    }, [loadProgrammer, id]);

    if (programmer === undefined || loadingInitial)
        return <div className="container-fluid"><h3>Loading ....</h3></div>;

    const { profile: { avatar, firstName, lastName, bio } } = programmer;
    return (
        <div className="container card-transition" style={{ overflowY: "hidden" }}>
            <section className="d-flex flex-row justify-content-center">
                <div className="card my-3" style={{ maxWidth: "100vh", minHeight: "82vh", overflowY: "hidden" }}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img className="card-img" src={avatar || "http://localhost:3000/assets/coder-default.png"} alt="coder" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{getFullName(firstName, lastName)}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Senior Developer</h6>
                                <p className="card-text">{bio}.</p>
                                <h6 className="card-subtitle mb-2 text-muted">Skills</h6>
                                <div></div>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

// Export home page component
export default observer(CoderProfilePage);
