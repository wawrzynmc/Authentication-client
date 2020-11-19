// * -- libraries imports
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- components
import Backdrop from '../../UIElements/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';

// ---- styles
import classes from './SideDrawer.module.scss';

const SideDrawer = (props) => {
	const nodeRef = useRef(null);

	return (
		<React.Fragment>
			{props.sideDrawerIsVisible && (
				<Backdrop onClick={props.closeSideDrawer} />
			)}

			<CSSTransition
				in={props.sideDrawerIsVisible}
				nodeRef={nodeRef}
				timeout={300}
				classNames={{
					enter: classes.Enter,
					enterActive: classes.EnterActive,
					exit: classes.Exit,
					exitActive: classes.ExitActive,
				}}
				mountOnEnter
				unmountOnExit
			>
				<aside ref={nodeRef} className={classes.SideDrawer}>
					{props.sideDrawerIsVisible && (
						<NavigationItems
							closeSideDrawer={props.closeSideDrawer}
						/>
					)}
				</aside>
			</CSSTransition>
		</React.Fragment>
	);
};
// * -- prop types
SideDrawer.propTypes = {
	/** function that close side drower */
	closeSideDrawer: PropTypes.func,
	/** toggle side drawer visibility */
	sideDrawerIsVisible: PropTypes.bool,
};

export default SideDrawer;
