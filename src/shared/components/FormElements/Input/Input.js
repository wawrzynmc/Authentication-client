// * -- libraries imports
import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

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
		case 'RESET': {
			return {
				...state,
				value: '',
				wasTouched: false,
				isValid: action.initialValid,
				errorMsg: action.initialErrorMsg,
			};
		}
		default:
			return state;
	}
};
/**
 * Input Component
 * * PARAMS:
 * 		* all params that include 'input' in its name, have its equivalent for 'password2'
 *  	@param id
 * 			@type: string
 * 			@description: id of input
 * 			@required
 *  	@param element
 * 			@type: string
 * 			@description: type of input (textarea / input)
 * 			@required
 *  	@param type
 * 			@type: string
 * 			@description: type of input
 * 			@required
 *  	@param rows
 * 			@type: number
 * 			@description: number of rows for textarea
 * 			@default: 3
 * 		@param initialValue
 * 			@type: string
 * 			@description: initial value of input
 * 			@default ''
 * 		@param placeholder
 * 			@type: string
 * 			@description: placeholder for input
 * 			@default: ''
 * 		@param label
 * 			@type: string
 * 			@description: label for input
 * 			@default: ''
 *		@param withLabel
 * 			@type: boolean
 * 			@description: defines, if input with have label above them
 * 			@default: false
 *  	@param initialValid
 * 			@type: boolean
 * 			@description: defines if input is initially valid
 * 			@default: false
 * 		@param initialErrorMsg
 * 			@type: string
 * 			@description: initial error msg for field
 * 			@default: 'Must be valid'
 * 		@param validators
 * 			@type: array of objects
 * 			@description: include validators for input
 * 		@param onInput
 * 			@type: function
 * 			@description: runs every time when password: id, value, validity or reference to onInput changed
 *  TODO :
 * 		* add regex for name, that could have only letters in name (without special characters etc.)
 */
const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue,
		wasTouched: false,
		isValid: props.initialValid,
		errorMsg: props.initialErrorMsg,
	});

	// useEffect to check validity of
	const { id, onInput, reset } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, onInput, value, isValid]);

	useEffect(() => {
		dispatch({
			type: 'RESET',
			isValid: props.initialValid,
			initialErrorMsg: props.initialErrorMsg,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reset]);

	// -- functions
	const changeHandler = (event) => {
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

	const element =
		props.element === 'input' ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={props.id}
				rows={props.rows}
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
			{props.withLabel && <label htmlFor={props.id}>{props.label}</label>}
			{element}
			{!inputState.isValid && inputState.wasTouched && (
				<p>{inputState.errorMsg}</p>
			)}
		</div>
	);
};

// * -- prop types
Input.propTypes = {
	id: PropTypes.string.isRequired,
	element: PropTypes.oneOf(['input', 'textarea']).isRequired,
	type: PropTypes.oneOf(['email', 'number', 'text', 'tel', 'url']).isRequired,
	rows: PropTypes.number,
	initialValue: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	withLabel: PropTypes.bool,
	initialValid: PropTypes.bool,
	initialErrorMsg: PropTypes.string,
	validators: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			val: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			regex: PropTypes.any,
			passwordToCompare: PropTypes.string,
		})
	),
	onInput: PropTypes.func,
};

// * -- default props
Input.defaultProps = {
	initialValue: '',
	rows: 3,
	placeholder: '',
	label: '',
	withLabel: false,
	initialValid: false,
	initialErrorMsg: 'Must be valid.',
	validators: [],
	onInput: (id, value, isValid) => {},
};

export default Input;
