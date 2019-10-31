//import { query } from './../App';
import { graphql } from 'react-apollo';
import { default as ApolloClient } from 'apollo-boost';
import { History } from 'history';
import { action, observable, computed } from 'mobx';
import { Programmer } from '../App';
import { query } from '../components/pages/HomePage';

export interface IProgrammer {
	data: { programmers: Array<Programmer> }
}


export interface IGroupResult {
	name: string;
	hasBackendAccess: boolean;
}
export interface IUserResult {
	id: string;
	email: string;
	groups: IGroupResult[];
}

class Store {
	@observable
	private user?: IUserResult;

	@observable
	public programmers: Array<Programmer> = [];

	@observable programmer: Programmer | undefined

	@observable
	public loadingInitial: boolean = false;

	public routerHistory: History;

	public apolloClient: ApolloClient<{}>;

	// Actions
	@action getProgrammers = () => graphql(query);

	// Computed sections
	@computed
	public get loggedIn() {
		return this.user !== undefined;
	}

	@computed
	public get userId(): string | undefined {
		return this.user ? this.user.id : undefined;
	};

	@computed
	public get email(): string | undefined {
		return this.user ? this.user.email : undefined;
	}

	@computed
	public get userGroups(): IGroupResult[] {
		if (this.user) {
			return [...this.user.groups];
		}
		return [];
	};

	@computed
	public get hasBackendAccess() {
		if (this.user) {
			return this.user.groups.some(ug => ug.hasBackendAccess);
		}
		return false;
	};

	@action
	public setLoggedInUser(userResult: IUserResult) {
		this.user = userResult;
	}

	@action clearLoggedInUser() {
		this.user = undefined;
	}

	@computed
	public get getFullName(): string {
		//TODO:
		return "this.programmer"
	}
}

// Create an instance of store
export const store = new Store();

// create context of store out store instance and export
//export default createContext(store);
