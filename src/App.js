import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import ProtectedRoute from './shared/components/ProtectedRoute/ProtectedRoute';
import Main from './main/pages/Main';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
	const { token, login, logout, duringAutologin, userId } = useAuth();
	let routes;

	// console.log('token', token);
	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Main />
				</Route>
				<Route path="/protected/admin" exact>
					PROTECTED ADMIN
				</Route>
				<Route path="/protected/user" exact>
					PROTECTED USER
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/auth/login" exact>
					LOGIN
				</Route>
				<Route path="/auth/signup" exact>
					SIGNUP
				</Route>
				<Route path="/auth" exact>
					<Auth />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	// <Route path="*" component={() => 'PAGE NOT FOUND'} />

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<Layout>
					<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
				</Layout>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
