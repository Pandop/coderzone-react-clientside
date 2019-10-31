import React, { useContext, Component } from 'react';
import { observer } from 'mobx-react';
import { Query, QueryResult, OperationVariables } from "react-apollo";
import { gql, ApolloError, DocumentNode} from "apollo-boost";
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
	const constructVariables =()=>({});
	return (
		<div className="container-fluid container-width" style={{ minWidth: "10vh", minHeight: "83vh", overflowY: "hidden" }}>
			<QueryWrapper query={query} constructVariables={constructVariables} fetchPolicy="network-only">
				{renderProgrammersCollections}
			</QueryWrapper>

			{/* <Query 
				query={query}
				fetchPolicy="network-only"
				notifyOnNetworkStatusChange={true}
			>
				{({ loading, error, data }: IServerResponseProps) => {
					if (loading) 
						return <Spinner />;
					if (error) return <div className="alert alert-danger">Error :(</div>;
					return ( <ProgrammersCollection programmers={data.programmers} {...restProps} />						
					)
				}}
			</Query> */}
		</div>
	)
}

interface IProgrammersCollectionProps extends RouteComponentProps{
	programmers: Array<Programmer>
	
}

const ProgrammersCollection: React.FunctionComponent<IProgrammersCollectionProps> =({programmers, ...restProps})=>{	
	return <section className="d-flex flex-row justify-content-center flex-wrap my-1">
		{	programmers.map((coder: Programmer) => <Card key={coder.id} coder={coder} {...restProps} />)}
	</section>
}

// const ProgrammersCollections: React.FunctionComponent<IProgrammersCollectionProps> =(result: QueryResult<any, OperationVariables>) : JSX.Element =>{	
// 	const { loading, error, data, refetch } = result;
// 	return <section className="d-flex flex-row justify-content-center flex-wrap my-1">
// 		{	data.programmers.map((coder: Programmer) => <Card key={coder.id} coder={coder} {...restProps} />)}
// 	</section>
// }

const renderProgrammersCollections = (result: QueryResult<any, OperationVariables>) : JSX.Element => {
	const { loading, error, data, refetch } = result;
	if (loading) 
		return <Spinner />;
	if (error) return <div className="alert alert-danger">Error :(</div>;
	
	return <section className="d-flex flex-row justify-content-center flex-wrap my-1">
		{	data.programmers.map((coder: Programmer) => <Card key={coder.id} coder={coder}  />)}
	</section>
}


interface IQueryWrapperProps<T extends RouteComponentProps, TData=any>{
	//programmers: Array<Programmer>
	fetchPolicy: "cache-first" | "network-only" | "cache-only" | "no-cache" | "standby" | "cache-and-network" | undefined;
	query: DocumentNode;
	children: (result: QueryResult<TData, OperationVariables>) => JSX.Element | null;
	constructVariables(): {};
}

export class QueryWrapper<T extends RouteComponentProps,TData = any> extends Component<IQueryWrapperProps<T, TData>>{
	public render() {		
		return (
			<Query 
				query={this.props.query} 
				fetchPolicy={this.props.fetchPolicy}
				notifyOnNetworkStatusChange={true}
				variables={this.props.constructVariables()} 
				>
				{this.props.children}
			</Query>
		);
	}
}
//"network-only"
// const QueryWrappers<T>:React.FunctionComponent<IQueryWrapperProps<T>> =(props)=> {
// 	return <Query 
// 		query={query}
// 		fetchPolicy="network-only"
// 		notifyOnNetworkStatusChange={true}
// 	>
// 		{({ loading, error, data }: IServerResponseProps) => {
// 			if (loading) 
// 				return <Spinner />;
// 			if (error) return <div className="alert alert-danger">Error :(</div>;
// 			return <>{props.children(data)}</>
			
// 		}}
// 	</Query>
// }

// Export home page component
export default observer(HomePage);
