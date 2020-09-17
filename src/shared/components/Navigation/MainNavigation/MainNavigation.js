import React from 'react';
import { Link } from 'react-router-dom';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import MainHeader from '../MainHeader/MainHeader';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './MainNavigation.module.scss';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const MainNavigation = (props) => {
	console.log('Rendering Main Navigation');

	return (
		<MainHeader>
			<Logo navigation />
			<Link to={props.mainPageAddress} className={classes.Title}>
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
