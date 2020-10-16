// * -- libraries imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- styles
import classes from './Button.module.scss';

/**
 * Render Button component
 * @category FormElements
 * @component
 */
const Button = (props) => {
	let attachedClasses = `${classes.Button} 
		${props.inverse && classes.Button_inverse} 
		${props.danger && classes.Button_danger}
		${props.information && classes.Button_information}
		${props.ghost && classes.Button_ghost}
		${props.small && classes.Button_small}
		${props.big && classes.Button_big}
		${props.to && classes.Button_href}
	`;

	if (props.href) {
		return (
			<a
				className={attachedClasses}
				href={props.href}
				style={props.style}
			>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link to={props.to} className={attachedClasses} style={props.style}>
				{props.children}
			</Link>
		);
	}
	return (
		<button
			className={attachedClasses}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
			style={props.style}
		>
			{props.children}
		</button>
	);
};

// * -- prop types
Button.propTypes = {
	/** Defines inverse style of button  */
	inverse: PropTypes.bool,
	/** Defines danger style of button  */
	danger: PropTypes.bool,
	/** Defines information style of button  */
	information: PropTypes.bool,
	/** Defines ghost style of button  */
	ghost: PropTypes.bool,
	/** Defines small style of button  */
	small: PropTypes.bool,
	/** Defines big style of button  */
	big: PropTypes.bool,
	/** Defines if button is disabled */
	disabled: PropTypes.bool,
	/** Defines to property of button that is used as redirection parameter  */
	to: PropTypes.string,
	/** Defines href parameter  */
	href: PropTypes.string,
	/** Button value */
	children: PropTypes.string,
	/** Button type*/
	type: PropTypes.string,
	/** Inline styles for component */
	style: PropTypes.object,
	/** Function that runs whenever button was clicked */
	onClick: PropTypes.func,
};

// * -- default props
Button.defaultProps = {
	inverse: false,
	danger: false,
	information: false,
	ghost: false,
	small: false,
	big: false,
	disabled: false,
};

export default Button;
