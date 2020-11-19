// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './MainHeader.module.scss';

const MainHeader = (props) => {
	return <header className={classes.MainHeader}>{props.children}</header>;
};

// * -- prop types
MainHeader.propTypes = {
	/** Inline components */
	children: PropTypes.any,
};

export default MainHeader;
