import React, { useReducer, useEffect, useState, useRef } from 'react';

import { validate } from '../../../../utils/validators';
import { capitalizeString } from '../../../../utils/utils';
import { VALIDATOR_PASSWORDS_COHERESION } from '../../../../utils/validators';
import PasswordMeter from './PasswordMeter/PasswordMeter';

import classes from './Passwords.module.scss';

// create Reducer
const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			const { isValid, metaData, errorMsg } = validate(
				capitalizeString(action.id1),
				action.val,
				action.validators
			);
			console.log(errorMsg)
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
		default:
			return state;
	}
};

// component
const Input = (props) => {
	const password1Ref = useRef(null);
	const password2Ref = useRef(null);

	const [passwordsState, dispatch] = useReducer(inputReducer, {
		[props.password1Id || 'password1']: {
			value: props.password1initialValue || '',
			wasTouched: false,
			isValid: props.password1initialValid || false,
			inputType: 'password',
			passwordStrength: 0,
			errorMsg: 'Must be valid password.',
			metaData: {
				id: props.password1Id || 'password1',
				placeholder: props.password1Placeholder || 'Password',
				label: props.password1Label || 'Password',
				validatePassword: props.password1Validate || true,
				reference: password1Ref,
			},
		},
		[props.password2Id || 'password2']: {
			value: props.password2initialValue || '',
			wasTouched: false,
			isValid: props.password2initialValid || false,
			inputType: 'password',
			passwordStrength: 0,
			errorMsg: 'Must be valid password.',
			metaData: {
				id: props.password2Id || 'password2',
				placeholder:
					props.password2Placeholder || 'Password confirmation',
				label: props.password2Label || 'Password confirmation',
				validatePassword: props.password2Validate || false,
				reference: password2Ref,
			},
		},
	});

	console.log('state', passwordsState);

	// useEffect to check validity of
	const { onInput } = props;
	const {
		password1: password1Data,
		password2: password2Data,
	} = passwordsState;

	// password1 onInput
	// useEffect(() => {
	// 	onInput(password1Data.id, password1Data.value, password1Data.isValid);
	// }, [onInput, password1Data.id, password1Data.value, password1Data.isValid]);

	// password2 onInput
	// useEffect(() => {
	// 	onInput(password2Data.id, password2Data.value, password2Data.isValid);
	// }, [onInput, password2Data.id, password2Data.value, password2Data.isValid]);

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

		const validators = [VALIDATOR_PASSWORDS_COHERESION(cohersionValArg)];

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
		console.log('Touch');
		dispatch({
			type: 'TOUCH',
			id: event.target.id,
		});
	};

	// here i have to passed inputId, because event is calling onto the eye icon, not input
	const changeTypeHandler = (inputId, event) => {
		console.log('Change type');
		dispatch({
			type: 'CHANGE_TYPE',
			id: inputId,
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
				<label htmlFor={data.id}></label>
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
							${classes.ShowPassword}
						`}
					>
						{data.inputType === 'password' ? (
							<i className="fas fa-eye"></i>
						) : (
							<i class="fas fa-eye-slash"></i>
						)}
					</span>
				)}
				{!data.isValid && data.wasTouched && <p>{data.errorMsg}</p>}
				{data.metaData.validatePassword && data.value && (
					<PasswordMeter passwordStrength={data.passwordStrength} />
				)}
			</div>
		);
	});

	return <React.Fragment>{passwordsInputs}</React.Fragment>;
};

export default Input;
