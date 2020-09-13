import React, {useState} from 'react'

import MainNavigation from '../../shared/components/Navigation/MainNavigation/MainNavigation'
import SideDrawer from '../../shared/components/Navigation/SideDrawer/SideDrawer'

import classes from './Layout.module.css'

const Layout = (props) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const closeSideDrawerHandler = () => {
		setSideDrawerIsVisible(false);
    };
    
    const sideDrawerToggleHandler = () => {
		setSideDrawerIsVisible(prevState => {
            console.log(!prevState)
            return !prevState
        });
	};

    return(
        <React.Fragment>
            <div className={classes.Container}>
                <MainNavigation
                    drawerToggleClick = {sideDrawerToggleHandler}
                    sideDrawerIsVisible = {sideDrawerIsVisible}
                    />
                <SideDrawer
                    sideDrawerIsVisible = {sideDrawerIsVisible}
                    closeSideDrawer = {closeSideDrawerHandler}
                >

                </SideDrawer>
                <main>{props.children}</main>
            </div>
        </React.Fragment>
    )
}

export default Layout