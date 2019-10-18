import axios, { AxiosResponse } from 'axios';
import {ServerResponse} from '../App';
import API from '../api/utils/API';

///	querying the database
export const axiosPostServerData = <T> (query ={}, variables={})=> 
		 API.post<T>('/graphql',{ query, variables })
		.then((result)=> result.data)
		.catch((error)=> { throw new Error(`Something went wrong:${error}`)});

///	helper method to return fullname
export const getFullName=(firstName: string, lastName: string): string=> `${firstName} ${lastName}`;