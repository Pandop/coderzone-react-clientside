import './App.css';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Route, Router, Switch } from 'react-router';
import { Link } from "react-router-dom";
import { observer, Provider } from 'mobx-react';
//import { Provider } from "mobx-react";
import { default as ApolloClient, Operation, InMemoryCache, } from "apollo-boost";

import HomePage from './components/pages/HomePage';
import CoderProfilePage from './components/pages/CoderProfilePage';
import NotFoundPage from './components/pages/NofFound';
//import CodersStore from './store/codersStore';
import { store } from './store/codersStore';
import { createBrowserHistory } from 'history';
import { ErrorResponse } from 'apollo-link-error';
import { ApolloProvider } from 'react-apollo';
import { ServerError, ServerParseError } from 'apollo-link-http-common';
import { action } from 'mobx';

export interface ICoderItem {
	id: number;
	firstName: string;
	lastName: string;
	avatar: string;
	description: string;
	address: [];
	skills: [];
	techStack: Array<string>;
}


// NavLink -> <li><NavLink to="/auth">Authenticate</NavLink></li> No relaod with NavLink
// auth -> component = Auth -> Redirect from="/" to="/auth" exact > <Route path="/auth" component={Auth}>

type GUID = string & { isGuid: true };

export interface ServerResponse {
	data: { programmers: Array<IProgrammer> }
}

interface IProfile {
	id: GUID;
	avatar: string
	firstName: string
	lastName: string
	bio: string
}

export interface IProgrammer {
	id: GUID;
	userName: string;
	email: string;
	profile: IProfile
}


@observer
class App extends Component {
	constructor(props: any, context: any) {
		super(props, context);

		store.routerHistory = createBrowserHistory();

		store.apolloClient = new ApolloClient({
			uri: 'https://localhost:44367/graphql',
			request: this.onApolloRequest,
			onError: this.onApolloError,
			cache: new InMemoryCache(),
		});

	}

	public render() {
		//const store =useContext(codersStore);
		return (
			<ApolloProvider client={store.apolloClient}>
				<Provider store={store}>
					<Router history={store.routerHistory}>
						<>
							{/* <ToastContainer className="frontend" /> */}
							<nav className="navbar navbar-expand-lg App-header"><Link to="/" className="navbar-brand nav-links">Coders zone</Link> </nav>
						</>
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route path="/coder/:id" component={CoderProfilePage} />
							<Route render={() => <NotFoundPage />} />
						</Switch>
						<footer className="App-footer">&copy;2019</footer>
					</Router>
				</Provider>
			</ApolloProvider>
		);
	}

	private onApolloRequest = async (operation: Operation) => {
		operation.setContext({
			headers: {
				'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
				//Authorization: `bearer ${sessionStorage.getItem("token")}`
			},
		});
	}

	@action
	private onApolloError = (error: ErrorResponse) => {
		if (this.isServerError(error.networkError) && error.networkError.statusCode === 401) {
			store.clearLoggedInUser();
			store.routerHistory.push(`/login?redirect=${store.routerHistory.location.pathname}`);
		}
	}

	private isServerError(error: Error | ServerError | ServerParseError | undefined): error is ServerError | ServerParseError {
		if (error === undefined || error['statusCode'] === undefined) {
			return false;
		}
		return true;
	}
}

// Exporting app
export default App;
