// * -- libraries imports
import React from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './PasswordMeter.module.scss';

/**
 * Render PasswordMeter component
 * @category FormElements
 * @component
 */
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

// * -- prop types
PasswordMeter.propTypes = {
	/** Defines password strength*/
	passwordStrength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PasswordMeter;
