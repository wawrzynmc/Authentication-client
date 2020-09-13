import React, { useContext} from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import { AuthContext } from '../../../context/auth-context';

import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
    const auth = useContext(AuthContext);
    
    let attachedClasses = [classes.NavigationItems];
    
    if (props.desktopView) {
        attachedClasses.push(classes.Desktop)
    } else {
        attachedClasses.push(classes.Mobile)
    }
   
	return (
		<nav className={classes.Navigation}>
			<ul className={attachedClasses.join(" ")}>
				<NavigationItem link="/auth" exact>
					Main Page
				</NavigationItem>
				<NavigationItem link="/" exact>
					Link2
				</NavigationItem>
				<NavigationItem link="/" exact>
					Link3
				</NavigationItem>
				<NavigationItem link="/" exact>
					Link4
				</NavigationItem>
			</ul>
		</nav>
	);
};

export default NavigationItems;
