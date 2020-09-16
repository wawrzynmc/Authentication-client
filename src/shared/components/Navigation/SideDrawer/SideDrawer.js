import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../../UIElements/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
	const nodeRef = useRef(null);

	console.log('Rednering Side Drawer');

	return (
		<React.Fragment>
			{props.sideDrawerIsVisible && (
				<Backdrop onClick={props.closeSideDrawer} />
			)}

			<CSSTransition
				in={props.sideDrawerIsVisible}
				nodeRef={nodeRef}
				timeout={300}
				classNames={{
					enter: classes.Enter,
					enterActive: classes.EnterActive,
					exit: classes.Exit,
					exitActive: classes.ExitActive,
				}}
				mountOnEnter
				unmountOnExit>
				<aside ref={nodeRef} className={classes.SideDrawer}>
					{props.sideDrawerIsVisible && <NavigationItems />}
				</aside>
			</CSSTransition>
		</React.Fragment>
	);
};

export default SideDrawer;
