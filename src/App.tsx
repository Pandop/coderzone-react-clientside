import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import axios, { AxiosResponse } from 'axios';
import API from "./api/utils/API";

import HomePage from './components/pages/HomePage';
import CoderProfilePage from './components/pages/CoderProfilePage';
import NotFoundPage from './components/pages/NofFound';
import { axiosPostServerData } from './services/RequestHelpers';

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

type CoderList = Array<ICoderItem>;

const coders: CoderList =[
	{id: 1, firstName: "James", lastName: "Doe", avatar:"",description: "Lorem ipsum dolor sit amete", address: [], skills: [], techStack:["React","Node"]},
	{id: 2, firstName: "Peter", lastName: "Joe", avatar:"",description: "ILorem cwol dolor sit ameta", address: [], skills: [], techStack:["React","Node", " C# .net core", "Angular"]},
	{id: 3, firstName: "James", lastName: "Doe", avatar:"",description: "Adipisicing elitLorem ipsum", address: [], skills: [], techStack:["Angular","Springbot"]},
	{id: 4, firstName: "Kresh", lastName: "Diu", avatar:"",description: "Adipisicing elitLorem ipsum", address: [], skills: [], techStack:["Angular","Springbot", " C# .net core", "Angular"]},
	{id: 5, firstName: "Moash", lastName: "Wan", avatar:"",description: "Adipisicing elitLorem ipsum", address: [], skills: [], techStack:["Angular","Springbot", " C# .net core", "Angular"]},
	{id: 6, firstName: "Roash", lastName: "Ruc", avatar:"",description: "Adipisicing elitLorem ipsum", address: [], skills: [], techStack:["Angular","Springbot", " C# .net core", "Angular"]},
	{id: 7, firstName: "Revek", lastName: "Kim", avatar:"",description: "Adipisicing elitLorem ipsum", address: [], skills: [], techStack:["Angular","Springbot", " C# .net core", "Angular"]},
]
//https://localhost:44367/graphql/
export const requestBody = { query: ` 
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
	}` 
};

type GUID = string & { isGuid: true};
export interface ServerResponse{
	data: {programmers: Array<Programmer>}
}
export interface Programmer{
	id: GUID;
	userName: string;
	email: string;
	profile: Profile
}
interface Profile{
	id: GUID;
	avatar: string
	firstName: string
	lastName: string
	bio: string
}

const App: React.FunctionComponent = () => {
	const [programmers, setData] = useState<Array<Programmer>>([]);

	useEffect(()=>{
		 getGraphQlServerResult(requestBody.query);	
	}, []);

	const getGraphQlServerResult = (query={})=>
	{
		axiosPostServerData<ServerResponse>(query)
			.then(res=> { setData(res.data.programmers)})
			.catch((error)=> { console.error(`Something went wrong:${error}`); });
	}

	console.log("Data: ", programmers);
	return (
	<Router>
		<nav className="navbar navbar-expand-lg App-header"><Link to="/" className="navbar-brand nav-links">Coders zone</Link> </nav>
		<Switch>
			<Route exact path="/" render={(routerProps)=> <HomePage {...routerProps} programmers={programmers} />} />
			<Route path="/coder/:id"  render={(routerProps)=> <CoderProfilePage {...routerProps} />} />
			<Route render={()=><NotFoundPage /> } />
		</Switch>		
		<footer className="App-footer">&copy;2019</footer>
	</Router>
	);
}

// Exporting app
export default App;


// const postQuery=()=> axios({
// 	url: 'https://localhost:44367/graphql',
// 	method: 'post',
// 	data: {
// 	  query: requestBody.query
// 	}
//   }).then((result) => {
// 	console.log(result.data)
//   }).catch(er=> console.log("Something went wrong: ", er));
// const GetUsersQuery =() => {
// 	API.post('/graphql', {
// 			query: requestBody.query
// 		})
// 		.then(result=> setData(result.data))
// 		.catch(er=> console.log("Something went wrong: ", er));
//   }

//   const axiosReq = async ()=> {
// 	  try {
// 		const result = await axios.post<ServerResponse>('/graphql',{
// 			//url: 'https://localhost:44367/graphql',
// 			query: requestBody.query
// 			//method: 'post',
// 			//data: {  query: requestBody.query },
// 		});
// 		const data = result.data;
// 		console.log("Server data=>", data);
// 		return data;
// 	  } catch (error) {
// 		console.error(`Something went wrong:${error}`);
// 	  }

// };