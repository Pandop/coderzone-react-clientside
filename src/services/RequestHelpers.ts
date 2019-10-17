import axios from 'axios';
import {requestBody, ServerResponse, Programmer} from '../App';
import API from '../api/utils/API';

const axiosGetServerData = async (query={})=> {
	try {
	  return await axios.request<ServerResponse>({
		  url: 'https://localhost:44367/graphql',
		  method: 'post',
		  data: query,
	});
	}catch (err) {console.error(`Something went wrong:${err}`);}
}

export const axiosPostServerData = <T> (query ={}, variables={})=> 
		 API.post<T>('/graphql',{ query, variables })
		.then(result=> result.data)
		.catch(error=> { throw new Error(`Something went wrong:${error}`)});


function identity<T>(query ={}) {
	API.post<T>('/graphql',{ query })
	.then(result=> result.data)
	.catch(error=> { throw new Error(`Something went wrong:${error}`)});
}
const getGraphQlServerResult = async(query={}, secArg="")=>
{
	try {
		const data = await axiosPostServerData(query);
		return data;
	} catch (error) { console.error(`Something went wrong:${error}`); }
}
export const getFullName=(firstName: string, lastName: string): string=> `${firstName} ${lastName}`;
//type AxiosResponseType = AxiosResponse<ServerResponse> ;
//type RequestParamsType = "headers"|"status"|"config"|"statusText"|"request";
//type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
//type ResultsType = Omit<AxiosResponseType, RequestParamsType>;