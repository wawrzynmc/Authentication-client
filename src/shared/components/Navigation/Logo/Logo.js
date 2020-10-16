// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- assets
import logo from '../../../../assets/images/logo.png';

// ---- styles
import classes from './Logo.module.scss';

/**
 * Render Logo component
 * @category Navigation
 * @component
 */
const Logo = (props) => {
	return (
		<div
			className={`
				${classes.Logo}
				${props.navigation ? classes.NavigationLogo : null}
			`}
			style={{ height: props.height }}
		>
			<img src={logo} alt="logo" />
		</div>
	);
};

// * -- prop types
Logo.propTypes = {
	/** Defines special style if logo will be placed in navigation */
	navigation: PropTypes.bool,
	/** Defines heigth of element */
	height: PropTypes.string,
};

export default Logo;
