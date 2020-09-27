// * -- libraries imports
import React, { useReducer, useEffect, useState } from 'react';

// * -- my own imports
// ---- components

// ---- functions
import { validate } from '../../../utils/validators';
import { capitalizeString } from '../../../utils/utils';

// ---- styles
import classes from './Input.module.scss';

/**
 * Reducer
 * * ACTIONS:
 * 		@type: CHANGE
 * 			@description: runs on every change of input value and performs validation
 * 		@type: TOUCH
 * 			@description: runs when field was touched and set input 'wasTouched' property to true
 */
const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			console.log('inside CHANGE', action.validators);
			return {
				...state,
				value: action.val,
				...validate(
					capitalizeString(action.id),
					action.val,
					action.validators
				),
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
/**
 * TODO:
 * 		* add regex for name, that could have only letters in name (without special characters etc.)
 *
 */
// component
const Input = (props) => {
	const [inputType, setInputType] = useState(props.type);
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || '',
		wasTouched: false,
		isValid: props.initialValid || false,
		metaData: {},
		errorMsg: 'Invalid input',
	});

	// useEffect to check validity of
	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, onInput, value, isValid]);

	// -- functions
	const changeHandler = (event) => {
		console.log(props.validators);
		dispatch({
			type: 'CHANGE',
			id: event.target.id,
			val: event.target.value,
			validators: props.validators,
		});
	};

	const touchHandler = (event) => {
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
			{!inputState.isValid && inputState.wasTouched && (
				<p>{inputState.errorMsg}</p>
			)}
		</div>
	);
};

export default Input;
