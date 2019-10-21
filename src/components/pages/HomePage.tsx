import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Query } from "react-apollo";
import { gql, ApolloError } from "apollo-boost";
import { RouteComponentProps } from 'react-router';

import { Programmer } from '../../App';
import Card from '../features/Card';
//import CodersStore from '../../store/codersStore';
import Spinner from '../../components/features/loadSpinner';

interface IServerResponseProps {
	data: { programmers: Array<Programmer> };
	error?: ApolloError;
	loading: boolean;
}

export const query = gql` 
	query prog
	{
		programmers
		{
			id
			userName
			email
			profile	{
				id
				avatar	
				firstName
				lastName
				bio
			}
		}
	}`;
	
// programmers={coderStore.programmers}
const HomePage: React.FunctionComponent<RouteComponentProps> = ({ ...restProps }) => {
	return (
		<div className="container-fluid container-width">
			<Query 
				query={query}
				fetchPolicy="network-only"
			>
				{({ loading, error, data }: IServerResponseProps) => {
					if (loading) 
						return <Spinner />;
					if (error) return <div className="alert alert-danger">Error :(</div>;
					return (
						<section className="d-flex flex-row justify-content-center flex-wrap my-1">
							{data.programmers.map((coder: Programmer) => <Card key={coder.id} coder={coder} {...restProps} />)}
						</section>
					)
				}}
			</Query>
		</div>
	)
}

// Export home page component
export default observer(HomePage);
