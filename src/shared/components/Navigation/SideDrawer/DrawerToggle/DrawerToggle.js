import React from 'react';

import './DrawerToggle.module.css';
import classes from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
    let attachedClasses = [classes.DrawerToggle]

    if (props.transform) {
        attachedClasses.push(classes.Toggle)
    }

	return (
		// add animation - CSS Transition
		<div className={attachedClasses.join(" ")} onClick={props.onClick}>
			<div className={classes.DrawerToggleLine}></div>
			<div className={classes.DrawerToggleLine}></div>
			<div className={classes.DrawerToggleLine}></div>
		</div>
	);
};

export default DrawerToggle;
