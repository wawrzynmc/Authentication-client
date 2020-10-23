import React, { useContext, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NavigationItem from './NavigationItem/NavigationItem';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

import { AuthContext } from '../../../context/auth-context';

import classes from './NavigationItems.module.scss';

const NavigationItems = (props) => {
	const { t } = useTranslation(['translation', 'error']);
	const auth = useContext(AuthContext);
	const history = useHistory();
	const loggedIn = auth.isLoggedIn;
	const loggedInUser = loggedIn && auth.userRole === 'user';
	const loggedInAdmin = loggedIn && auth.userRole === 'admin';

	const logoutHandler = (event) => {
		auth.logout();
		props.closeSideDrawer();
		history.push({
			pathname: '/auth',
			search: '?action=signin',
		});
	};

	return (
		<nav className={classes.Navigation}>
			<ul
				className={`
					${classes.Navigation__Items} 
					${
						props.desktopView
							? classes.Navigation__Items_desktop
							: classes.Navigation__Items_mobile
					}
				`}
			>
				<NavigationItem
					link="/"
					exact
					closeSideDrawer={props.closeSideDrawer}
				>
					{t('Navigation.main')}
				</NavigationItem>

				{/* NOT LOGGED IN */}
				{!loggedIn && (
					<NavigationItem
						link="/auth"
						search="?action=signin"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						{t('Navigation.signin')}
					</NavigationItem>
				)}
				{!loggedIn && (
					<NavigationItem
						link="/auth"
						search="?action=signup"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						{t('Navigation.signup')}
					</NavigationItem>
				)}

				{/* LOGGED IN */}
				{loggedInAdmin && (
					<NavigationItem
						link="/protected/admin"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						{t('Navigation.signup')}
					</NavigationItem>
				)}

				{loggedInUser && (
					<NavigationItem
						link="/protected/user"
						exact
						closeSideDrawer={props.closeSideDrawer}
					>
						{t('Navigation.user')}
					</NavigationItem>
				)}

				{loggedIn && (
					<NavigationItem closeSideDrawer={logoutHandler}>
						{t('Navigation.logout')}
					</NavigationItem>
				)}
				<Suspense fallback="loading">
					<LanguageSelect />
				</Suspense>
			</ul>
		</nav>
	);
};

export default NavigationItems;
