import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react';
import { RouteComponentProps, Redirect } from 'react-router';

import { getFullName } from '../../services/RequestHelpers';
import Spinner from '../features/loadSpinner';
import { ApolloError, gql, OperationVariables } from 'apollo-boost';
import { Programmer } from '../../App';
import { Query, QueryResult } from 'react-apollo';
import Auth from '../authentication/Auth';
import { store } from '../../store/codersStore';
import { QueryWrapper } from './HomePage';
//import CodersStore from '../../store/codersStore';

type GUID = string;
interface IRouteParams extends RouteComponentProps { id: GUID }

interface IServerResponseProps {
	data: { programmer: Programmer };
	error?: ApolloError;
	loading: boolean;
}

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
					projects { id name }
					skills {id name	}
					works {	title startDate endDate }
					qualifications { id title }
				}
				country { name }
				state{ id name postCode }
			}
		}`
};

const query = gql`
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
				projects { id name }
				skills { id name }
				works { title startDate endDate }
				qualifications { id title }
			}
			country { name	}
			state{ id name postCode }
		}
	}`;

const CoderProfilePage: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { id } = props.match.params as IRouteParams;
	// const adminSwitch = () => {
	// 	if (!store.userGroups.some(ug => ug.hasBackendAccess)) {
	// 		return <Redirect to="/404" />;
	// 	}
	// 	return <div>Hello</div>
	// }
	const constructVariables = () => ({ uuid: id });
	return (
		<div className="" style={{ overflowY: "hidden", minHeight: "83vh" }}>
			<QueryWrapper query={query} constructVariables={constructVariables} fetchPolicy="cache-first" >
				{renderProgrammerProfile}
			</QueryWrapper>
		</div>
	)
}

const renderProgrammerProfile = (result: QueryResult<any, OperationVariables>): JSX.Element => {
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
// Export home page component
export default observer(CoderProfilePage);















/* <section className="d-flex flex-row justify-content-center card-transition">

				<div className="card m-5" style={{ minWidth: "55vh", overflowY: "hidden" }}>
					<div className="row no-gutters">
						<Query
							query={query}
							variables={{uuid: id}}
							fetchPolicy="cache-first"
							notifyOnNetworkStatusChange={true}
						>
							{({ loading, error, data }: IServerResponseProps) => {

								if (loading) return <Spinner />;

								if (error) 	return <div className="alert alert-danger">Error :(</div>;

								const { profile: { avatar, firstName, lastName, bio } } = data.programmer;
								return (
									<>
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
									</>
								)
							}}
						</Query>
					</div>
				</div>
			</section> */