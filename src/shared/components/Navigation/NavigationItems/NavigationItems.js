import React, { useContext } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import { AuthContext } from '../../../context/auth-context';

import classes from './NavigationItems.module.scss';

const NavigationItems = (props) => {
	const auth = useContext(AuthContext);

	let attachedClasses = [classes.NavigationItems];

	if (props.desktopView) {
		attachedClasses.push(classes.Desktop);
	} else {
		attachedClasses.push(classes.Mobile);
	}

	const logoutHandler = (event) => {
		auth.logout();
		props.closeSideDrawer();
	};

	return (
		<nav className={classes.Navigation}>
			<ul className={attachedClasses.join(' ')}>
				{/* NOT LOGGED IN */}
				{!auth.isLoggedIn && (
					<NavigationItem
						link="/"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Main
					</NavigationItem>
				)}
				{!auth.isLoggedIn && (
					<NavigationItem
						link="/auth"
						search="?action=signin"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						SIGNIN
					</NavigationItem>
				)}
				{!auth.isLoggedIn && (
					<NavigationItem
						link="/auth"
						search="?action=signup"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						SIGNUP
					</NavigationItem>
				)}

				{/* LOGGED IN */}
				{auth.isLoggedIn && (
					<NavigationItem
						link="/"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Main
					</NavigationItem>
				)}
				{auth.isLoggedIn && (
					<NavigationItem
						link="/protected/admin"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Protected Admin
					</NavigationItem>
				)}

				{auth.isLoggedIn && (
					<NavigationItem
						link="/protected/user"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						Protected User
					</NavigationItem>
				)}

				{auth.isLoggedIn && (
					<NavigationItem closeSideDrawer={logoutHandler}>
						Logout
					</NavigationItem>
				)}
			</ul>
		</nav>
	);
};

export default NavigationItems;
