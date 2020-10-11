import React from 'react';

import classes from './DrawerToggle.module.scss';

const DrawerToggle = (props) => {
	let attachedClasses = [classes.DrawerToggle];

	if (props.transform) {
		attachedClasses.push(classes.Toggle);
	}

	return (
		<div className={attachedClasses.join(' ')} onClick={props.onClick}>
			<div className={classes.DrawerToggleLine}></div>
			<div className={classes.DrawerToggleLine}></div>
			<div className={classes.DrawerToggleLine}></div>
		</div>
	);
};

export default DrawerToggle;
