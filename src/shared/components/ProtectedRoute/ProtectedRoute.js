import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const auth = useContext(AuthContext);
    console.log(auth)

	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth.isLoggedIn) {
                    return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/auth',
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
