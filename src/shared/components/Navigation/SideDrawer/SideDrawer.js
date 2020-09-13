import React from 'react'
import ReactDOM from 'react-dom'
import {CSSTransition} from 'react-transition-group';

import Logo from '../Logo/Logo'
import Backdrop from '../../UIElements/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'

import classes from './SideDrawer.module.css'

const SideDrawer = (props) => {
    const content = (
        <CSSTransition in={props.sideDrawerIsVisible} timeout={200} classNames={{
            enter: classes.Enter,
            enterActive: classes.EnterActive,
            exit: classes.Exit,
            exitActive: classes.ExitActive
        }} mountOnEnter unmountOnExit>
            <aside className={classes.SideDrawer} onClick = {props.closeSideDrawer}>
                {props.children}
            </aside>
        </CSSTransition>
    )

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer