import React, { useReducer, useEffect, useState, useRef } from 'react';

import { validate } from '../../../../utils/validators';
import PasswordMeter from './PasswordMeter/PasswordMeter';

import classes from './Passwords.module.scss';

/* case 'CHANGE':
			return {
				...state,
				value: action.val,
				...validate(action.val, action.validators),
            }; */

// create Reducer
const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				[action.id]: {
					...state[action.id],
					value: action.val,
				},
			};
		case 'TOUCH':
			return {
				...state,
				wasTouched: true,
			};
		case 'CHANGE_TYPE':
			console.log('adas', state[action.id]);
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
			metaData: {
				id: props.password1Id || 'password1',
				placeholder: props.password1Placeholder || 'Password',
				label: props.password1Label || 'Password',
				passwordStrength: 0,
				validatePassword: props.password1Validate || false,
				reference: password1Ref,
			},
		},
		[props.password2Id || 'password2']: {
			value: props.password2initialValue || '',
			wasTouched: false,
			isValid: props.password2initialValid || false,
			inputType: 'password',
			metaData: {
				id: props.password2Id || 'password2',
				placeholder:
					props.password2Placeholder || 'Password confirmation',
				label: props.password2Label || 'Password confirmation',
				passwordStrength: 0,
				validatePassword: props.password2Validate || false,
				reference: password2Ref,
			},
		},
	});

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
		console.log('Change');
		dispatch({
			type: 'CHANGE',
			val: event.target.value,
			id: event.target.id,
			// validators: props.validators,
		});
	};

	const touchHandler = (event) => {
		console.log('Touch');
		dispatch({
			type: 'TOUCH',
		});
	};

	// here i have to get id of password (password1, event)
	const changeTypeHandler = (event, passwordId) => {
		console.log('Change type');
        console.log('dasdas', event);
        console.log(passwordId);
		dispatch({
			id: passwordId,
			type: 'CHANGE_TYPE',
		});
	};
	console.log('dasda', passwordsState);

	let passwordsInputs = Object.keys(passwordsState).map((password) => {
		const data = passwordsState[password];
		console.log(data);
		return (
			<div
				className={`${classes.FormControl} ${
					!data.isValid &&
					data.wasTouched &&
					classes.FormControl_invalid
				}`}
			>
				<label htmlFor={data.id}></label>
				<input
					id={data.metaData.id}
					type={data.metaData.inputType}
					placeholder={data.metaData.placeholder}
					onChange={changeHandler}
					// onBlur={touchHandler}
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
						{data.metaData.inputType === 'password' ? (
							<i className="fas fa-eye"></i>
						) : (
							<i class="fas fa-eye-slash"></i>
						)}
					</span>
				)}
				{!data.isValid && data.wasTouched && <p>{props.errorText}</p>}
				{data.metaData.validatePassword && data.value && (
					<PasswordMeter
						passwordStrength={data.metaData.passwordStrength}
					/>
				)}
			</div>
		);
	});

	return <React.Fragment>{passwordsInputs}</React.Fragment>;
};

export default Input;
