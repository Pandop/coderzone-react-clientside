import React, {createContext} from 'react';
import { History } from 'history';
import {action, observable, computed} from 'mobx';
import { Programmer, ServerResponse } from '../App';
import { axiosPostServerData } from '../services/RequestHelpers';
import { AxiosResponse } from 'axios';

export interface IProgrammer{
	data: {programmers: Array<Programmer>}
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

class Store{
	@observable
	private user?: IUserResult;

	@observable 
	public programmers: Array<Programmer>=[];

	@observable programmer: Programmer | undefined

	@observable 
	public loadingInitial: boolean = false;

	public routerHistory: History;

	//public apolloClient: ApolloClient<{}>;

	// Actions
	@action 
	public loadProgrammers =(query={})=>{
		this.loadingInitial=true;
		axiosPostServerData<ServerResponse>(query)
			.then((results)=> { this.programmers=results.data.programmers; })
			.catch((error: object )=> { console.error(`Something went wrong:${error}`); })
			.finally(()=> {this.loadingInitial=false;});
	}

	@action loadProgrammer = (query={},varaibles={}) =>{
		this.loadingInitial=true;
		axiosPostServerData<{data: {programmer: Programmer}}>(query,varaibles)
			.then((results)=> { this.programmer=results.data.programmer; })
			.catch((error: object )=> { console.error(`Something went wrong:${error}`); })
			.finally(()=> {this.loadingInitial=false;});
	}

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
	public get getFullName():string{
		//TODO:
		return "this.programmer"
	}
 }

// Create an instance of store
const store = new Store();

// create context of store out store instance and export
export default createContext(store);
