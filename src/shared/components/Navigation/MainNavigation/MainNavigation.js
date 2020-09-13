import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import MainHeader from '../MainHeader/MainHeader';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
	return (
		<MainHeader>
			<Logo />
			<h1 className={classes.Title}>full authentication</h1>
			{/* <nav className={classes.HeaderNavigation}>
                    <NavigationItems/>
                </nav> */}
			<DrawerToggle
				onClick={props.drawerToggleClick}
				transform={props.sideDrawerIsVisible}
			/>
		</MainHeader>
	);
};

export default MainNavigation;
