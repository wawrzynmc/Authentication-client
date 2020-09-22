import React from 'react';

import classes from './Card.module.scss';

const Card = (props) => {
	let attachedClasses = [];
    if (props.information) {
        attachedClasses.push(classes.Card_information)
    }

	return (
		<div className={`${classes.Card} ${attachedClasses.join(' ')}`} style={props.style}>
			{props.children}
		</div>
	);
};

export default Card;
