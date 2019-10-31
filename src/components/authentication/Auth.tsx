import { store, IUserResult } from '../../store/codersStore';
import { action, observable } from 'mobx';
import React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, Redirect } from 'react-router';

import API from '../../api/utils/API';
import Spinner from '../../components/features/loadSpinner';

@observer
export default class Auth extends React.Component<RouteComponentProps> {
	@observable
	private requestState: 'pending' | 'error' | 'success' = 'pending';

	@action
	private onSuccess = (userResult?: IUserResult) => {
		if (userResult) {
			store.setLoggedInUser(userResult);
		}
		this.requestState = 'success';
	};

	@action
	private onError = () => {
		store.clearLoggedInUser();
		this.requestState = 'error';
	}

	public componentDidMount() {
		if (store.loggedIn) {
			this.onSuccess();
		}

		API.get(`/api/account/me`)
			.then(({data}) => this.onSuccess(data))
			.catch(this.onError);
	}

	public render() {
		switch (this.requestState) {
			case 'pending':
				return <Spinner />;
			case 'success':
				return this.props.children;
			case 'error':
				return <Redirect to={{pathname: '/login', search: `?redirect=${this.props.location.pathname}`}} />
		}
	}
}