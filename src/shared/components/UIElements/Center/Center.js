import React from 'react';

import classes from './Center.module.scss';

const Center = (props) => {
	return <div className={classes.Center}>{props.children}</div>;
};

export default Center;
