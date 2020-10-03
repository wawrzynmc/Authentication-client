import React from 'react';

import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = (props) => {
	return (
		<div
			className={`${props.asOverlay && classes.LoadingSpinner__overlay}`}
		>
			<div className={classes.LoadingSpinner__dualRing}></div>
		</div>
	);
};

export default LoadingSpinner;
