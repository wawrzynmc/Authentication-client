// * -- libraries imports
import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

// * -- my own imports
// ---- components
import Layout from './hoc/Layout/Layout';
import Main from './main/pages/Main';
import Auth from './auth/pages/Auth';
import Activate from './activate/pages/Activate';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner/LoadingSpinner';

// ---- functions / hooks
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
	const { token, login, logout, duringAutologin, userId } = useAuth();
	let routes;
	let mainPageAddress;

	// console.log('token', token);
	if (token) {
		mainPageAddress = '/';
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
				{/* <Route path="*" component={() => 'PAGE NOT FOUND'} /> */}
				<Redirect to="/" />
			</Switch>
		);
	} else {
		mainPageAddress = '/auth';
		routes = (
			<Switch>
				<Route path="/" exact>
					<Main />
				</Route>
				<Route path="/auth" exact>
					<Auth />
				</Route>
				<Route path="/account/activate/:token" exact>
					<Activate />
				</Route>
				<Route path="/account/reset-password/:token" exact>
					Password reset
				</Route>
				<Route path="/account/forgot-password" exact>
					Forgot password
				</Route>
				{/* <Route path="*" component={() => 'PAGE NOT FOUND'} /> */}
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
				{duringAutologin && <LoadingSpinner asOverlay />}
				{!duringAutologin && (
					<Layout mainPageAddress={mainPageAddress}>
						<Suspense fallback={<p>Loading...</p>}>
							{routes}
						</Suspense>
					</Layout>
				)}
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
