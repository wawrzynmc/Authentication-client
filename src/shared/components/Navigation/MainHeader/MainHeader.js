// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './MainHeader.module.scss';

/**
 * Render MainHeader component
 * @category Navigation
 * @component
 */
const MainHeader = (props) => {
	return <header className={classes.MainHeader}>{props.children}</header>;
};

// * -- prop types
MainHeader.propTypes = {
	/** Inline components */
	children: PropTypes.any,
};

export default MainHeader;
