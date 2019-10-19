import './App.css';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { observer } from 'mobx-react';

import HomePage from './components/pages/HomePage';
import CoderProfilePage from './components/pages/CoderProfilePage';
import NotFoundPage from './components/pages/NofFound';
import CodersStore from './store/codersStore';

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

//https://localhost:44367/graphql/
export const requestBody = {
    query: ` 
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

type GUID = string & { isGuid: true };
export interface ServerResponse {
    data: { programmers: Array<Programmer> }
}
export interface Programmer {
    id: GUID;
    userName: string;
    email: string;
    profile: Profile
}
interface Profile {
    id: GUID;
    avatar: string
    firstName: string
    lastName: string
    bio: string
}

const App: React.FunctionComponent = () => {
    const store = useContext(CodersStore);
    //const {loadProgrammers} = store;

    // const [programmers, setData] = useState<Array<Programmer>>([]);

    useEffect(() => {
        // getGraphQlServerResult(requestBody.query);	
        store.loadProgrammers(requestBody.query);
    }, [store]);

    console.log("store.programmers: ", store.programmers);
    return (
        <Router>
            <nav className="navbar navbar-expand-lg App-header"><Link to="/" className="navbar-brand nav-links">Coders zone</Link> </nav>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/coder/:id" component={CoderProfilePage} />
                <Route render={() => <NotFoundPage />} />
            </Switch>
            <footer className="App-footer">&copy;2019</footer>
        </Router>
    );
}

// Exporting app
export default observer(App);