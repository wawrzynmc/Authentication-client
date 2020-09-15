import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import MainHeader from '../MainHeader/MainHeader';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './MainNavigation.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const MainNavigation = (props) => {
	console.log('Rendering Main Navigation')

	return (
		<MainHeader>
			<Logo navigation/>
			<h1 className={classes.Title}>full authentication</h1>
			<NavigationItems desktopView={props.navigationItemsDesktopView}/>
			<DrawerToggle
				onClick={props.drawerToggleClick}
				transform={props.sideDrawerIsVisible}
			/>
		</MainHeader>
	);
};

export default MainNavigation;
