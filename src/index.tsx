import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import codersStore from './store/codersStore';

// const store =useContext(codersStore);

// store.apolloClient = new ApolloClient({
// 	uri: 'https://localhost:44367/graphql',
// });

ReactDOM.render(
	//<ApolloProvider client={store.apolloClient}>
		<App />,
	//</ApolloProvider>,
	document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
