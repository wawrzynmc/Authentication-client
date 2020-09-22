import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const NavigationItem = (props) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink
				to={{
					pathname: props.link,
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

export default NavigationItem;
