import React from 'react'
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { gql } from 'apollo-boost';

import { QueryWrapper } from '../QueryWrapper';
import renderProgrammerProfile from '../collections/renderProgrammerProfile';
// import Auth from '../authentication/Auth';

type GUID = string;
interface IRouteParams extends RouteComponentProps {
	id: GUID;
}

const query = gql`
	query pgm($uuid: ID!)
		{
			programmer(id: $uuid)
			{
				userName
				email
				country { name	}
				state{ id name postCode }
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
			}
		}
	`;

const CoderProfilePage: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { id } = props.match.params as IRouteParams;
	const constructVariables = () => ({ uuid: id });

	return (
		<div className="" style={{ overflowY: "hidden", minHeight: "83vh" }}>
			<QueryWrapper
				query={query}
				constructVariables={constructVariables}
				fetchPolicy="cache-first"
			>
				{renderProgrammerProfile}
			</QueryWrapper>
		</div>
	)
}

// Export home page component
export default observer(CoderProfilePage);
