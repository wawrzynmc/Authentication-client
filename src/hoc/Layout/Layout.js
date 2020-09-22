import React, { useState } from 'react';

import MainNavigation from '../../shared/components/Navigation/MainNavigation/MainNavigation';
import SideDrawer from '../../shared/components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = (props) => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const closeSideDrawerHandler = () => {
		console.log('dasda');
		setSideDrawerIsVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible((prevState) => {
			console.log('Inside drawer toggle', !prevState);
			return !prevState;
		});
	};

	console.log('Rendering layout');

	return (
		<React.Fragment>
			<div className={classes.Container}>
				<MainNavigation
					mainPageAddress={props.mainPageAddress}
					drawerToggleClick={sideDrawerToggleHandler}
					sideDrawerIsVisible={sideDrawerIsVisible}
					navigationItemsDesktopView={true}
				/>
				<SideDrawer
					closeSideDrawer={closeSideDrawerHandler}
					sideDrawerIsVisible={sideDrawerIsVisible}
					navigationItemsDesktopView={false}
				/>
				<main className={classes.main}>{props.children}</main>
			</div>
		</React.Fragment>
	);
};

export default Layout;
