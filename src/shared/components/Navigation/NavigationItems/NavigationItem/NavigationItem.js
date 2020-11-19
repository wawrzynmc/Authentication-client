// * -- libraries imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './NavigationItem.module.scss';

const NavigationItem = (props) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink
				to={{
					pathname: props.link,
					search: props.search,
				}}
				isActive={(match, location) => {
					if (props.link === location.pathname) {
						switch (location.pathname) {
							case '/':
								if (!props.search) {
									return true;
								} else {
									return false;
								}
							case '/auth':
								if (props.search) {
									const locationQuery = new URLSearchParams(
										location.search
									);
									const searchQuery = new URLSearchParams(
										props.search
									);
									const locationAction = locationQuery.get(
										'action'
									);
									const searchAction = searchQuery.get(
										'action'
									);

									return (
										locationAction === searchAction ||
										(searchAction === 'signin' &&
											!locationAction)
									);
								} else {
									return false;
								}
							default:
								return true;
						}
					} else {
						return false;
					}
				}}
				activeClassName={classes.active}
				exact={props.exact}
				onClick={props.closeSideDrawer}
			>
				{props.children}
			</NavLink>
		</li>
	);
};

// * -- prop types
NavigationItem.propTypes = {
	/** redirect url */
	link: PropTypes.string,
	/** search params */
	search: PropTypes.string,
	/** exact route */
	exact: PropTypes.bool,
	/** close side drawer function */
	closeSideDrawer: PropTypes.func,
	/** Inline components/values */
	children: PropTypes.any,
};

export default NavigationItem;
