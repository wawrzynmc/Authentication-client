import React, { useReducer, useEffect, useState } from 'react';

import { validate } from '../../../utils/validators';
import PasswordMeter from './PasswordMeter/PasswordMeter';

import classes from './Input.module.scss';

// create Reducer
const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.val,
				...validate(action.val, action.validators),
			};
		case 'TOUCH':
			return {
				...state,
				wasTouched: true,
			};

		default:
			return state;
	}
};

// component
const Input = (props) => {
	const [inputType, setInputType] = useState(props.type);
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || '',
		wasTouched: false,
		isValid: props.initialValid || false,
		metaData: {},
	});

	// useEffect to check validity of
	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, onInput, value, isValid]);

	// -- functions
	const changeHandler = (event) => {
		dispatch({
			type: 'CHANGE',
			val: event.target.value,
			validators: props.validators,
		});
	};

	const touchHandler = (event) => {
		console.log('Touch')
		dispatch({
			type: 'TOUCH',
		});
	};

	const showPasswordToggle = (event) => {
		setInputType((prevState) => {
			return prevState === 'password' ? 'text' : 'password';
		});
	};

	// -- variables
	const element =
		props.element === 'input' ? (
			<input
				id={props.id}
				type={inputType}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows || 3}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		);

	// -- return JSX
	return (
		<div
			className={`${classes.FormControl} ${
				!inputState.isValid &&
				inputState.wasTouched &&
				classes.FormControl_invalid
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{props.isPassword && inputState.value && (
				<span
					onClick={showPasswordToggle}
					className={`
						${classes.ShowPassword}
					`}
				>
					{inputType === 'password' ? (
						<i className="fas fa-eye"></i>
					) : (
						<i class="fas fa-eye-slash"></i>
					)}
				</span>
			)}
			{!inputState.isValid && inputState.wasTouched && (
				<p>{props.errorText}</p>
			)}
			{props.isPassword && props.validatePassword && inputState.value && (
				<PasswordMeter
					passwordStrength={inputState.metaData.passwordStrength}
				/>
			)}
		</div>
	);
};

export default Input;
