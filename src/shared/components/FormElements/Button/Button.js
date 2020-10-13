import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.scss';

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

export default Button;
