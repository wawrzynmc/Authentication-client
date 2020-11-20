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
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner/LoadingSpinner';

// ---- functions / hooks
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

// ---- lazy loading
const Main = React.lazy(() => import('./main/pages/Main'));
const Auth = React.lazy(() => import('./auth/pages/Auth'));
const Activate = React.lazy(() => import('./activate/pages/Activate'));
const ForgotPassword = React.lazy(() =>
	import('./forgotPassword/pages/ForgotPassword')
);
const ResetPassword = React.lazy(() =>
	import('./resetPassword/pages/ResetPassword')
);

function App() {
	const {
		token,
		login,
		logout,
		duringAutologin,
		userId,
		userRole,
	} = useAuth();
	let routes;
	let mainPageAddress;

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
					<ResetPassword />
				</Route>
				<Route path="/account/forgot-password" exact>
					<ForgotPassword />
				</Route>
				{/* <Route path="*" component={() => 'PAGE NOT FOUND'} /> */}
				<Redirect to="/auth" />
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				userRole: userRole,
				login: login,
				logout: logout,
			}}
		>
			<Suspense fallback={<LoadingSpinner asOverlay />}>
				<Router>
					{duringAutologin && <LoadingSpinner asOverlay />}
					{!duringAutologin && (
						<Layout mainPageAddress={mainPageAddress}>
							{routes}
						</Layout>
					)}
				</Router>
			</Suspense>
		</AuthContext.Provider>
	);
}

export default App;
