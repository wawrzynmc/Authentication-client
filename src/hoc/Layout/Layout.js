import React, { useState } from 'react';

import MainNavigation from '../../shared/components/Navigation/MainNavigation/MainNavigation';
import SideDrawer from '../../shared/components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.scss';

const Layout = (props) => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

	const closeSideDrawerHandler = () => {
		setSideDrawerIsVisible(false);
	};

	const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible((prevState) => {
			return !prevState;
		});
	};

	return (
		<React.Fragment>
			<div className={classes.Container}>
				<MainNavigation
					mainPageAddress={props.mainPageAddress}
					drawerToggleClick={sideDrawerToggleHandler}
					sideDrawerIsVisible={sideDrawerIsVisible}
					navigationItemsDesktopView={true}
					closeSideDrawer={closeSideDrawerHandler}
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
