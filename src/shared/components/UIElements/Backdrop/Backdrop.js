// * -- libraries imports
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './Backdrop.module.scss';

const Backdrop = (props) => {
	return ReactDOM.createPortal(
		<div
			className={classes.Backdrop}
			onClick={props.onClick}
			style={props.style}
		></div>,
		document.getElementById('backdrop-hook')
	);
};

// * -- prop types
Backdrop.propTypes = {
	/** onClick handler */
	onClick: PropTypes.func,
	/** external styles */
	style: PropTypes.object,
};

export default Backdrop;
