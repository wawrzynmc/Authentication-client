import React, { useContext, useRef } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import { AuthContext } from '../../../context/auth-context';

import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
	const auth = useContext(AuthContext);
	const marker = useRef(null);

	let attachedClasses = [classes.NavigationItems];

	if (props.desktopView) {
		attachedClasses.push(classes.Desktop);
	} else {
		attachedClasses.push(classes.Mobile);
	}

	const navigationItemMouseOverHandler = (event) => {
		let isActive = event.target.className
			.split(' ')
			.filter((className) => className.includes('active'));

		if (!isActive.length) {
			marker.current.style.opacity = '1';
			marker.current.style.bottom = `28.5px`;
			marker.current.style.left = `${event.target.offsetLeft}px`;
			marker.current.style.width = `${event.target.offsetWidth}px`;
			marker.current.style.animation = '';
		}
	};

	const navigationMouseOutHandler = (event) => {
		marker.current.style.left = '0px';
		marker.current.style.opacity = '0';
		marker.current.style.width = `0px`;

		// marker.current.style.animation = `${classes.xd} 10s both`;
	};

	// Maybe on mouseOut focus on active link?

	return (
		<nav
			className={classes.Navigation}
			onMouseLeave={navigationMouseOutHandler}>
			<ul className={attachedClasses.join(' ')}>
				<div className={classes.marker} ref={marker}></div>
				{/* NOT LOGGED IN */}
				{!auth.isLoggedIn && (
					<NavigationItem
						link="/auth/login"
						exact
						mouseOver={navigationItemMouseOverHandler}
						mouseOut={navigationMouseOutHandler}>
						Login
					</NavigationItem>
				)}
				{!auth.isLoggedIn && (
					<NavigationItem
						link="/auth/signup"
						exact
						mouseOver={navigationItemMouseOverHandler}
						mouseOut={navigationMouseOutHandler}>
						Signup
					</NavigationItem>
				)}

				{/* LOGGED IN */}
				{auth.isLoggedIn && (
					<NavigationItem
						link="/"
						mouseOver={navigationItemMouseOverHandler}
						exact>
						Main
					</NavigationItem>
				)}
				{auth.isLoggedIn && (
					<NavigationItem
						link="/protected/admin"
						exact
						mouseOver={navigationItemMouseOverHandler}>
						Protected Admin
					</NavigationItem>
				)}

				{auth.isLoggedIn && (
					<NavigationItem
						link="/protected/user"
						exact
						mouseOver={navigationItemMouseOverHandler}>
						Protected User
					</NavigationItem>
				)}
			</ul>
		</nav>
	);
};

export default NavigationItems;
