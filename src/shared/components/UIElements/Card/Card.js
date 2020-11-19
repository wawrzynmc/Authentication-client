// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './Card.module.scss';

const Card = (props) => {
	let attachedClasses = [];
	if (props.information) {
		attachedClasses.push(classes.Card_information);
	}

	return (
		<div
			className={`${classes.Card} ${attachedClasses.join(' ')}`}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

// * -- prop types
PropTypes.propTypes = {
	/** styling toggle */
	information: PropTypes.bool,
	/** external styles */
	style: PropTypes.object,
};

export default Card;
