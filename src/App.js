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
	console.log('token', token);

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
					<Suspense fallback={<p>Loading...</p>}>
						<Switch>
							<ProtectedRoute path="/" exact component={Main} />
							<Route path="/auth" exact>
								<Auth />
							</Route>
							<Route
								path="*"
								component={() => 'PAGE NOT FOUND'}
							/>
						</Switch>
					</Suspense>
				</Layout>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
