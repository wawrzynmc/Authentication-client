// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './Card.module.scss';

const Card = (props) => {
	return (
		<div
			className={`${classes.Card} ${props.className}`}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

// * -- prop types
PropTypes.propTypes = {
	/** external styles */
	style: PropTypes.object,
};

export default Card;
