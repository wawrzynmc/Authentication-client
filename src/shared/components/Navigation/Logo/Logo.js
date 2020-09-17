import React from 'react';

import logo from '../../../../assets/images/logo.png';

import classes from './Logo.module.scss';

const Logo = (props) => {
	let attachedClasses = [classes.Logo];

	if (props.navigation) {
		attachedClasses.push(classes.NavigationLogo);
	}

	return (
		<div
			className={attachedClasses.join(' ')}
			style={{ height: props.height }}
		>
			<img src={logo} alt="logo" />
		</div>
	);
};

export default Logo;
