import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Query, QueryResult, OperationVariables } from "react-apollo";
import { DocumentNode, WatchQueryFetchPolicy } from "apollo-boost";

// Props interface
interface IQueryWrapperProps<T extends RouteComponentProps, TData = any> {
	fetchPolicy: WatchQueryFetchPolicy | undefined;// "cache-first" | "network-only" | "cache-only" | "no-cache" | "standby" | "cache-and-network" | undefined;
	query: DocumentNode;
	children: (result: QueryResult<TData, OperationVariables>) => JSX.Element | null;
	constructVariables(): {};
}

export class QueryWrapper<T extends RouteComponentProps, TData = any> extends Component<IQueryWrapperProps<T, TData>>{
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