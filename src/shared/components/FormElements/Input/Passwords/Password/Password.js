import React, { useReducer } from 'react';
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
 * Reducer
 * * ACTIONS:
 * 		@type: CHANGE
 * 			@description: runs on every change of input value and performs validation
 * 		@type: TOUCH
 * 			@description: runs when field was touched and set input 'wasTouched' property to true
 * 		@type: CHANGE_TYPE
 * 			@description: runs when type of input changed (password <-> text)
 */
const inputReducer = (state, action) => {
	switch (action.type) {
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
		case 'TOUCH':
			return {
				...state,
				wasTouched: true,
			};

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
 * TODO:
 * 		* add regex for name, that could have only letters in name (without special characters etc.)
 *
 */

const Password = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue,
		wasTouched: false,
		isValid: props.initialValid,
		inputType: 'password',
		passwordStrength: 0,
		errorMsg: props.initialErrorMsg,
	});

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
	id: PropTypes.string,
	initialValue: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	withLabel: PropTypes.bool,
	validate: PropTypes.bool,
	initialValid: PropTypes.bool,
	initialErrorMsg: PropTypes.string,
	validators: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			val: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			regex: PropTypes.string,
			passwordToCompare: PropTypes.string,
		})
	),
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
};

export default Password;
