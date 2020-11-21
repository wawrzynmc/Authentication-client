// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './DrawerToggle.module.scss';

const DrawerToggle = (props) => {
	const lineClassName = `
		${classes.DrawerToggleLine} 
		${props.transform ? classes.DrawerToggleLine_toggled : null}
	`;

	return (
		<div
			className={`${classes.DrawerToggle} `}
			onClick={props.drawerToggleClick}
		>
			<div className={lineClassName}></div>
			<div className={lineClassName}></div>
			<div className={lineClassName}></div>
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
