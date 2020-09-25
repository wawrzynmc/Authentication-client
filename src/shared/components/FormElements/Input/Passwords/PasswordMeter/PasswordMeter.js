import React from 'react';

import classes from './PasswordMeter.module.scss';

const PasswordMeter = (props) => {
	return (
		<div className={classes.Meter}>
			<span
				className={`
                    ${classes.Meter__type}
                    ${classes.Meter__type_weak} 
                    ${
						+props.passwordStrength >= 0 &&
						classes.Meter__type_weak_active
					}
                `}
			></span>
			<span
				className={`
                    ${classes.Meter__type} 
                    ${classes.Meter__type_medium} 
                    ${
						+props.passwordStrength >= 1 &&
						classes.Meter__type_medium_active
					}
                `}
			></span>
			<span
				className={`
                    ${classes.Meter__type}
                    ${classes.Meter__type_strong} 
                    ${
						+props.passwordStrength === 2 &&
						classes.Meter__type_strong_active
					}

                `}
			></span>
		</div>
	);
};

export default PasswordMeter;
