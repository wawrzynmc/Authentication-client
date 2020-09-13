import React from 'react';
import { CSSTransition } from 'react-transition-group';

import classes from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
	let attachedClasses = [classes.DrawerToggle];

	if (props.transform) {
		attachedClasses.push(classes.Toggle);
	}

	console.log('Render Drawer Toggle')

	return (
		<div className={attachedClasses.join(" ")} onClick={props.onClick}>
			<div className={classes.DrawerToggleLine}></div>
			<div className={classes.DrawerToggleLine}></div>
			<div className={classes.DrawerToggleLine}></div>
		</div>
	);
};

export default DrawerToggle;
