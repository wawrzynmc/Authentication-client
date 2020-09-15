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
		marker.current.style.bottom = `27px`;
		marker.current.style.left = `${event.target.offsetLeft}px`;
		marker.current.style.width = `${event.target.offsetWidth}px`;
		marker.current.style.animation = '';
	};

	const navigationMouseOutHandler = (event) => {
		console.log('adsad');
		// marker.current.style.bottom= '0px'
		// marker.current.style.width = `0px`
		marker.current.style.animation = `${classes.xd} 2s both`;
	};

	// Maybe on mouseOut focus on active link?

	return (
		<nav
			className={classes.Navigation}
			onMouseLeave={navigationMouseOutHandler}
		>
			<ul className={attachedClasses.join(' ')}>
				<div className={classes.marker} ref={marker}></div>
				{/* NOT LOGGED IN */}
				{!auth.isLoggedIn && (
					<NavigationItem
						link="/auth/login"
						exact
						mouseOver={navigationItemMouseOverHandler}
					>
						Login
					</NavigationItem>
				)}
				{!auth.isLoggedIn && (
					<NavigationItem
						link="/auth/signup"
						exact
						mouseOver={navigationItemMouseOverHandler}
					>
						Signup
					</NavigationItem>
				)}

				{/* LOGGED IN */}
				{auth.isLoggedIn && (
					<NavigationItem
						link="/"
						mouseOver={navigationItemMouseOverHandler}
						exact
					>
						Main
					</NavigationItem>
				)}
				{auth.isLoggedIn && (
					<NavigationItem
						link="/protected/admin"
						exact
						mouseOver={navigationItemMouseOverHandler}
					>
						Protected Admin
					</NavigationItem>
				)}

				{auth.isLoggedIn && (
					<NavigationItem
						link="/protected/user"
						exact
						mouseOver={navigationItemMouseOverHandler}
					>
						Protected User
					</NavigationItem>
				)}
			</ul>
		</nav>
	);
};

export default NavigationItems;
