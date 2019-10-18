import React, {createContext} from 'react';
import {action, observable, computed} from 'mobx';
import { Programmer, ServerResponse } from '../App';
import { axiosPostServerData } from '../services/RequestHelpers';
import { AxiosResponse } from 'axios';

export interface IProgrammer{
	data: {programmers: Array<Programmer>}
}
class Store{
	@observable 
	public programmers: Array<Programmer>=[];

	@observable programmer: Programmer | undefined

	@observable 
	public loadingInitial: boolean = false;

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
 }

// Create an instance of store
const store = new Store();

// create context of store out store instance and export
export default createContext(store);
