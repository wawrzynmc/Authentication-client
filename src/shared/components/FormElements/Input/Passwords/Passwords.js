// * -- libraries imports
import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// * -- my own imports
// ---- components
import PasswordMeter from './PasswordMeter/PasswordMeter';

// ---- functions
import { validate } from '../../../../utils/validators';
import { capitalizeString } from '../../../../utils/utils';
import {
	VALIDATOR_PASSWORDS_COHERESION,
	VALIDATOR_PASSWORD,
} from '../../../../utils/validators';

// ---- styles
import classes from './Passwords.module.scss';

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
				capitalizeString(action.id1),
				action.val,
				action.validators
			);
			// below statement is required due to don't change the order of {password1:{}, password2:{}} in object
			if (action.id1 === Object.keys(state)[0]) {
				return {
					[action.id1]: {
						...state[action.id1],
						value: action.val,
						passwordStrength: metaData.passwordStrength,
						isValid,
						errorMsg,
					},
					[action.id2]: {
						...state[action.id2],
						isValid: isValid,
					},
				};
			} else {
				return {
					[action.id2]: {
						...state[action.id2],
						isValid: isValid,
					},
					[action.id1]: {
						...state[action.id1],
						value: action.val,
						passwordStrength: metaData.passwordStrength,
						isValid,
						errorMsg,
					},
				};
			}
		case 'TOUCH':
			return {
				...state,
				[action.id]: {
					...state[action.id],
					wasTouched: true,
				},
			};
		case 'CHANGE_TYPE':
			return {
				...state,
				[action.id]: {
					...state[action.id],
					inputType:
						state[action.id].inputType === 'password'
							? 'text'
							: 'password',
				},
			};
		case 'RESET':
			const password1Data = action.password1;
			const password2Data = action.password2;
			return {
				[password1Data.id]: {
					...state[password1Data.id],
					value: password1Data.initialValue,
					isValid: password1Data.initialValid,
					wasTouched: false,
					passwordStrength: 0,
				},
				[password2Data.id]: {
					...state[password2Data.id],
					value: password2Data.initialValue,
					isValid: password2Data.initialValid,
					wasTouched: false,
					passwordStrength: 0,
				},
			};
		default:
			return state;
	}
};

/**
 * Passwords Component
 * * PARAMS:
 * 		* all params that include 'password1' in its name, have its equivalent for 'password2'
 *  	@param password1Id
 * 			@type: string
 * 			@description: id of password1
 * 			@default = 'password1'
 * 		@param password1initialValue
 * 			@type: string
 * 			@description: initial value of password1
 * 			@default ''
 * 		@param password1Placeholder
 * 			@type: string
 * 			@description: placeholder for password1
 * 			@default: 'Password' (password1) / 'Password Confirmation' (password2)
 * 		@param password1Label
 * 			@type: string
 * 			@description: label for password1
 * 			@default: 'Password' (password1) / 'Password Confirmation' (password2)
 * 		@param password1Validate
 * 			@type: boolean
 * 			@description: defines if password1 should have its strength validate
 * 			@default: false
 *  	@param password1initialValid
 * 			@type: boolean
 * 			@description: defines if password1 is initially valid
 * 			@default: false
 * 		@param withLabels
 * 			@type: boolean
 * 			@description: defines, if passwords with have label above them
 * 			@default: false
 * 		@param initialErrorMsg
 * 			@type: string
 * 			@description: initial error msg for field
 * 			@default: 'Must be valid'
 * 		@param validators
 * 			@type: array of objects
 * 			@description: include validators for both password type inputs
 * 		@param onInput
 * 			@type: function
 * 			@description: runs every time when password: id, value, validity or reference to onInput changed
 *  TODO :
 */
const Passwords = (props) => {
	// create references for inputs
	const password1Ref = useRef(null);
	const password2Ref = useRef(null);

	const [passwordsState, dispatch] = useReducer(inputReducer, {
		[props.password1Id || 'password1']: {
			value: props.password1initialValue,
			wasTouched: false,
			isValid: props.password1initialValid,
			inputType: 'password',
			passwordStrength: 0,
			errorMsg: props.initialErrorMsg,
			metaData: {
				id: props.password1Id,
				placeholder: props.password1Placeholder,
				label: props.password1Label,
				validate: props.password1Validate,
				reference: password1Ref,
			},
		},
		[props.password2Id || 'password2']: {
			value: props.password2initialValue,
			wasTouched: false,
			isValid: props.password2initialValid,
			inputType: 'password',
			passwordStrength: 0,
			errorMsg: props.initialErrorMsg,
			metaData: {
				id: props.password2Id,
				placeholder: props.password2Placeholder,
				label: props.password2Label,
				validate: props.password2Validate,
				reference: password2Ref,
			},
		},
	});

	const { onInput } = props;
	const {
		password1: password1Data,
		password2: password2Data,
	} = passwordsState;

	useEffect(() => {
		onInput(
			password1Data.metaData.id,
			password1Data.value,
			password1Data.isValid
		);
	}, [
		onInput,
		password1Data.metaData.id,
		password1Data.value,
		password1Data.isValid,
	]);

	useEffect(() => {
		onInput(
			password2Data.metaData.id,
			password2Data.value,
			password2Data.isValid
		);
	}, [
		onInput,
		password2Data.metaData.id,
		password2Data.value,
		password2Data.isValid,
	]);

	// reset
	useEffect(() => {
		dispatch({
			type: 'RESET',
			password1: {
				id: props.password1Id,
				initialValid: props.password1initialValid,
				initialValue: props.password1initialValue,
			},
			password2: {
				id: props.password2Id,
				initialValid: props.password2initialValid,
				initialValue: props.password2initialValue,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.reset]);

	// passwords onInput

	// -- functions
	const changeHandler = (event) => {
		const target = event.target;
		const password1Id = password1Ref.current.id;
		const password2Id = password2Ref.current.id;
		const password1Value = password1Ref.current.value;
		const password2Value = password2Ref.current.value;
		const cohersionValArg =
			target.id === password1Id ? password2Value : password1Value;
		const id2 = event.target.id === password1Id ? password2Id : password1Id;

		// set up validators (cohersion validators is always provided)
		const validators = [VALIDATOR_PASSWORDS_COHERESION(cohersionValArg)];

		// check if password1 / 2 has to be validate
		if (target.id === password1Id) {
			if (passwordsState[password1Id].metaData.validate) {
				validators.push(VALIDATOR_PASSWORD());
			}
		} else {
			if (passwordsState[password2Id].metaData.validate) {
				validators.push(VALIDATOR_PASSWORD());
			}
		}

		if (props.validators) {
			validators.push(...props.validators);
		}

		dispatch({
			type: 'CHANGE',
			val: target.value,
			id1: target.id,
			id2: id2,
			validators: validators,
		});
	};

	const touchHandler = (event) => {
		dispatch({
			type: 'TOUCH',
			id: event.target.id,
		});
	};

	const changeTypeHandler = (inputId, event) => {
		dispatch({
			type: 'CHANGE_TYPE',
			id: inputId, // inputId, because event is calling onto the eye icon, not input
		});
	};

	let passwordsInputs = Object.keys(passwordsState).map((password) => {
		const data = passwordsState[password];
		return (
			<div
				className={`${classes.FormControl} ${
					!data.isValid &&
					data.wasTouched &&
					classes.FormControl_invalid
				}`}
				key={data.metaData.id}
			>
				{props.withLabels && (
					<label htmlFor={data.id}>{data.metaData.label}</label>
				)}
				<input
					id={data.metaData.id}
					type={data.inputType}
					placeholder={data.metaData.placeholder}
					onChange={changeHandler}
					onBlur={touchHandler}
					value={data.value}
					ref={data.metaData.reference}
				/>
				{data.value && (
					<span
						onClick={() => changeTypeHandler(data.metaData.id)}
						className={`
							${classes.FormControl__ShowPassword}
						`}
					>
						{data.inputType === 'password' ? (
							<i className="fas fa-eye"></i>
						) : (
							<i className="fas fa-eye-slash"></i>
						)}
					</span>
				)}
				{!data.isValid && data.wasTouched && <p>{data.errorMsg}</p>}
				{data.metaData.validate && data.value && (
					<PasswordMeter passwordStrength={data.passwordStrength} />
				)}
			</div>
		);
	});

	return <React.Fragment>{passwordsInputs}</React.Fragment>;
};

// * -- prop types
Passwords.propTypes = {
	password1Id: PropTypes.string,
	password2Id: PropTypes.string,
	password1initialValue: PropTypes.string,
	password2initialValue: PropTypes.string,
	password1Placeholder: PropTypes.string,
	password2Placeholder: PropTypes.string,
	password1Label: PropTypes.string,
	password2Label: PropTypes.string,
	password1Validate: PropTypes.bool,
	password2Validate: PropTypes.bool,
	password1initialValid: PropTypes.bool,
	password2initialValid: PropTypes.bool,
	withLabels: PropTypes.bool,
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
Passwords.defaultProps = {
	password1Id: 'password1',
	password2Id: 'password2',
	password1initialValue: '',
	password2initialValue: '',
	password1Placeholder: 'Password',
	password2Placeholder: 'Password confirmation',
	password1Label: 'Password',
	password2Label: 'Password confirmation',
	password1Validate: false,
	password2Validate: false,
	password1initialValid: false,
	password2initialValid: false,
	withLabels: false,
	initialErrorMsg: 'Must be valid password.',
	validators: [],
	onInput: (id, value, isValid) => {},
};

export default Passwords;
