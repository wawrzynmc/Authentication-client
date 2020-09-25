import React from 'react';

import classes from './PasswordMeter.module.scss';

const PasswordMeter = (props) => {
	return (
		<div className={classes.Meter}>
			<span
				className={`
                    ${classes.Meter__type}
                    ${classes.Meter__type_first} 
					${+props.passwordStrength >= 0 && classes.weak}
					${+props.passwordStrength >= 1 && classes.medium}
					${+props.passwordStrength === 2 && classes.strong}
                `}
			></span>
			<span
				className={`
                    ${classes.Meter__type} 
                    ${classes.Meter__type_second} 
					${+props.passwordStrength >= 1 && classes.medium}
					${+props.passwordStrength === 2 && classes.strong}
                `}
			></span>
			<span
				className={`
                    ${classes.Meter__type}
                    ${classes.Meter__type_third} 
                    ${+props.passwordStrength === 2 && classes.strong}

                `}
			></span>
		</div>
	);
};

export default PasswordMeter;
