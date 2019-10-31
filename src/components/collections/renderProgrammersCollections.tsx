import React from 'react'
import { QueryResult } from 'react-apollo';
import { OperationVariables } from 'apollo-boost';

import Spinner from '../features/loadSpinner';
import Card from '../features/Card';
import { Programmer } from '../../App';

// interface IProgrammersCollectionProps extends RouteComponentProps {
//     programmers: Array<Programmer>

// }
const RenderProgrammersCollections = (result: QueryResult<any, OperationVariables>): JSX.Element => {
	const { loading, error, data, refetch } = result;
	if (loading)
		return <Spinner />;
	if (error) return <div className="alert alert-danger">Error :(</div>;

	return <section className="d-flex flex-row justify-content-center flex-wrap my-1">
		{data.programmers.map((coder: Programmer) => <Card key={coder.id} coder={coder} />)}
	</section>
}

export default RenderProgrammersCollections;