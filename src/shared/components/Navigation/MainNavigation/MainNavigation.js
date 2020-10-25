// * -- libraries imports
import React from 'react';
import { Link } from 'react-router-dom';

// * -- my own imports
// ---- components
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import MainHeader from '../MainHeader/MainHeader';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

// ---- styles
import classes from './MainNavigation.module.scss';

/**
 * Render MainNavigation component
 * @category Navigation
 * @component
 */
const MainNavigation = (props) => {
	return (
		<MainHeader>
			<Logo navigation />
			<Link
				to={props.mainPageAddress}
				className={classes.MainHeader__Title}
			>
				full authentication
			</Link>
			<NavigationItems desktopView={props.navigationItemsDesktopView} />
			<DrawerToggle
				onClick={props.drawerToggleClick}
				transform={props.sideDrawerIsVisible}
			/>
		</MainHeader>
	);
};
export default MainNavigation;
