import React from 'react';
import { observer } from 'mobx-react';
import { gql } from "apollo-boost";
import { RouteComponentProps } from 'react-router';

import { QueryWrapper } from '../QueryWrapper';
import renderProgrammersCollections from '../collections/renderProgrammersCollections';

export const query = gql` 
	query prog
	{
		programmers
		{
			id
			userName
			email
			profile	{id avatar firstName lastName bio }
		}
	}`;

// programmers={coderStore.programmers}
const HomePage: React.FunctionComponent<RouteComponentProps> = ({ ...restProps }) => {
    const constructVariables = () => ({});
    return (
        <div className="container-fluid container-width" style={{ minWidth: "10vh", minHeight: "83vh", overflowY: "hidden" }}>
            <QueryWrapper query={query} constructVariables={constructVariables} fetchPolicy="network-only">
                {renderProgrammersCollections}
            </QueryWrapper>
        </div>
    )
}

// Export home page component
export default observer(HomePage);
