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
			className={`${classes.Logo} ${props.className}`}
			style={{ height: props.height }}
		>
			<img src={logo} alt={props.alt || 'logo'} />
		</div>
	);
};

// * -- prop types
Logo.propTypes = {
	/** Defines heigth of element */
	height: PropTypes.string,
};

export default Logo;
