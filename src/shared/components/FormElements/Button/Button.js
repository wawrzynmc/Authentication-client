import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.scss';

const Button = (props) => {
	console.log(props.small)
	let attachedClasses = `${classes.Button} 
		${props.inverse && classes.Button_inverse} 
		${props.danger && classes.Button_danger}
		${props.information && classes.Button_information}
		${props.ghost && classes.Button_ghost}
		${props.small && classes.Button_small}
		${props.big && classes.Button_big}
	`;

	if (props.href) {
		return (
			<a className={attachedClasses} href={props.href}>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link to={props.to} exact={props.exact} className={attachedClasses}>
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
		>
			{props.children}
		</button>
	);
};

export default Button;
