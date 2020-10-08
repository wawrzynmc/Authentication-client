import React from 'react';

import classes from './TextBetweenLines.module.scss';

const TextBetweenLines = (props) => {
	return (
		<p className={classes.TextBetweenLines}>
			<span>{props.children}</span>
		</p>
	);
};

export default TextBetweenLines;
