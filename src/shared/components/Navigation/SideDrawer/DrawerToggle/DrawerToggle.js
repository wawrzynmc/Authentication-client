// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
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

// * -- prop types
DrawerToggle.propTypes = {
	/** Toggle drawer */
	transform: PropTypes.bool,
	/** onClick handler */
	onClick: PropTypes.func,
};

export default DrawerToggle;
