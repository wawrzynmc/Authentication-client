/** @namespace Input */

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
 * Receive data associated with component i.a. action type
 * @function inputReducer
 * @memberof Input
 * @param {object} state: contain initial and final state of data
 * @param {object} action: return the action object
 */
const inputReducer = (state, action) => {
	switch (action.type) {
		// runs on every change of input value and performs validation
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
		// runs when field was touched and set input 'wasTouched' property to true
		case 'TOUCH':
			return {
				...state,
				wasTouched: true,
			};
		// runs when value of 'reset' property has changed. That action reset field and its state
		case 'RESET': {
			return {
				...state,
				value: '',
				wasTouched: false,
				isValid: action.initialValid,
				errorMsg: action.initialErrorMsg,
			};
		}
		case 'CHANGE_ERROR_MSG': {
			return {
				...state,
				errorMsg: action.initialErrorMsg,
			};
		}
		default:
			return state;
	}
};
/**
 * Render Input component
 * @category FormElements
 * @component
 * @memberof Input
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

	useEffect(() => {
		dispatch({
			type: 'CHANGE_ERROR_MSG',
			initialErrorMsg: props.initialErrorMsg,
		});
	}, [props.initialErrorMsg]);

	/**
	 * @public
	 * @param {object} event event object
	 * @summary Call for inputReducer with CHANGE action
	 * */
	const changeHandler = (event) => {
		dispatch({
			type: 'CHANGE',
			id: event.target.id,
			val: event.target.value,
			validators: props.validators,
		});
	};

	/**
	 * @public
	 * @param {object} event event object
	 * @description: Call for inputReducer with CHANGE action
	 * */
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
	/** Input id*/
	id: PropTypes.string.isRequired,
	/** Tag of input*/
	element: PropTypes.oneOf(['input', 'textarea']).isRequired,
	/** Type of input*/
	type: PropTypes.oneOf(['email', 'number', 'text', 'tel', 'url']).isRequired,
	/** Number of rows for textarea*/
	rows: PropTypes.number,
	/** Initial value of input*/
	initialValue: PropTypes.string,
	/** Placeholder for input*/
	placeholder: PropTypes.string,
	/** Label for input*/
	label: PropTypes.string,
	/** Defines, if input with have label above them*/
	withLabel: PropTypes.bool,
	/** Defines if input is initially valid*/
	initialValid: PropTypes.bool,
	/** Initial error message for field*/
	initialErrorMsg: PropTypes.string,
	/** If value has changed, then reset of input begins*/
	reset: PropTypes.bool,
	/** Validators for input */
	validators: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			val: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			regex: PropTypes.any,
			passwordToCompare: PropTypes.string,
		})
	),
	/** Function that fires when input has changed*/
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
	onInput: (id, value, isValid) => {
		// eslint-disable-next-line no-console
		console.log(id, value, isValid);
	},
};

export default Input;
