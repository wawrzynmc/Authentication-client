/** @namespace Password */

// * -- libraries imports
import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- components
import PasswordMeter from '../PasswordMeter/PasswordMeter';

// ---- functions
import { validate } from '../../../../../utils/validators';
import { capitalizeString } from '../../../../../utils/utils';
import { VALIDATOR_PASSWORD } from '../../../../../utils/validators';

// ---- styles
import classes from './Password.module.scss';

/**
 * Receive data associated with component i.a. action type
 * @function inputReducer
 * @memberof Password
 * @param {object} state: contain initial and final state of data
 * @param {object} action: return the action object
 */
const inputReducer = (state, action) => {
	switch (action.type) {
		// runs on every change of input value and performs validation
		case 'CHANGE':
			const { isValid, metaData, errorMsg } = validate(
				capitalizeString(action.id),
				action.val,
				action.validators
			);
			return {
				...state,
				value: action.val,
				isValid: isValid,
				errorMsg: errorMsg,
				passwordStrength: metaData.passwordStrength,
			};
		// runs when field was touched and set input 'wasTouched' property to true
		case 'TOUCH':
			return {
				...state,
				wasTouched: true,
			};
		// runs when type of input changed (password <-> text)
		case 'CHANGE_TYPE':
			return {
				...state,
				inputType: state.inputType === 'password' ? 'text' : 'password',
			};
		default:
			return state;
	}
};

/**
 * Render Password component
 * @category FormElements
 * @component
 * @memberof Password
 */
const Password = (props) => {
	const { id, onInput } = props;
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue,
		wasTouched: false,
		isValid: props.initialValid,
		inputType: 'password',
		passwordStrength: 0,
		errorMsg: props.initialErrorMsg,
	});
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, onInput, value, isValid]);

	const changeHandler = (event) => {
		let validators = [...props.validators];

		if (props.validate) {
			validators.push(VALIDATOR_PASSWORD());
		}

		dispatch({
			type: 'CHANGE',
			id: event.target.id,
			val: event.target.value,
			validators: validators,
		});
	};

	const touchHandler = (event) => {
		dispatch({
			type: 'TOUCH',
		});
	};

	const changeTypeHandler = (event) => {
		dispatch({
			type: 'CHANGE_TYPE',
		});
	};

	return (
		<div
			className={`
                ${classes.FormControl} 
                ${
					!inputState.isValid &&
					inputState.wasTouched &&
					classes.FormControl_invalid
				}`}
		>
			{props.withLabel && <label htmlFor={props.id}>{props.label}</label>}
			<input
				id={props.id}
				type={inputState.inputType}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
			{inputState.value && (
				<span
					onClick={changeTypeHandler}
					className={`
							${classes.FormControl__ShowPassword}
						`}
				>
					{inputState.inputType === 'password' ? (
						<i className="fas fa-eye"></i>
					) : (
						<i className="fas fa-eye-slash"></i>
					)}
				</span>
			)}
			{!inputState.isValid && inputState.wasTouched && (
				<p>{inputState.errorMsg}</p>
			)}
			{props.validate && inputState.value && (
				<PasswordMeter passwordStrength={inputState.passwordStrength} />
			)}
		</div>
	);
};

// * -- prop types
Password.propTypes = {
	/** Input id*/
	id: PropTypes.string,
	/** Initial value of input*/
	initialValue: PropTypes.string,
	/** Placeholder for input*/
	placeholder: PropTypes.string,
	/** Label for input*/
	label: PropTypes.string,
	/** Defines, if input with have label above them*/
	withLabel: PropTypes.bool,
	/** Defines if password should have its strength validate */
	validate: PropTypes.bool,
	/** Defines if password is initially valid */
	initialValid: PropTypes.bool,
	/** Initial error msg for field */
	initialErrorMsg: PropTypes.string,
	/** Validators for input */
	validators: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			val: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			regex: PropTypes.string,
			passwordToCompare: PropTypes.string,
		})
	),
	/** Function that fires when input has changed*/
	onInput: PropTypes.func,
};

// * -- default props
Password.defaultProps = {
	id: 'password',
	initialValue: '',
	placeholder: 'Password',
	label: 'Password',
	withLabel: false,
	validate: false,
	initialValid: false,
	initialErrorMsg: 'Must be valid password.',
	validators: [],
	onInput: (id, value, isValid) => {
		// eslint-disable-next-line no-console
		console.log(id, value, isValid);
	},
};

export default Password;
