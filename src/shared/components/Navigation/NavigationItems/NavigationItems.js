import React, {useContext} from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

import { AuthContext } from '../../../context/auth-context';

import classes from './NavigationItems.module.css'

const NavigationItems = (props) => {
    const auth = useContext(AuthContext);

    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Link1</NavigationItem>
            <NavigationItem link="/" exact>Link2</NavigationItem>
            <NavigationItem link="/" exact>Link3</NavigationItem>
            <NavigationItem link="/" exact>Link4</NavigationItem>
        </ul>
    )
}

export default NavigationItems