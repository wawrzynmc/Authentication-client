// * -- libraries imports
import React from 'react';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Passwords from '../../../shared/components/FormElements/Input/Passwords/Passwords';

// ---- functions
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from '../../../shared/utils/validators';

// ---- styles
import classes from './SignupForm.module.scss';

/**
 * Signup Component
 * * PARAMS:
 * ! WARNINGS:
 *      ! name of fileds in formState has to match with ids of inputs
 */
const SignupForm = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler, setFormData] = useForm(
		{
			name: {
				value: '',
				isValid: false,
			},
			email: {
				value: '',
				isValid: false,
			},
			password1: {
				value: '',
				isValid: false,
			},
			password2: {
				value: '',
				isValid: false,
			},
		},
		false
	);
	return (
		<form className={classes.Form} action="#">
			<Input
				id="name"
				element="input"
				type="text"
				placeholder="Name"
				validators={[VALIDATOR_MINLENGTH(6)]}
				initialErrorMsg="Please enter a name."
				onInput={inputHandler}
			/>
			<Input
				id="email"
				element="input"
				type="email"
				placeholder="E-mail"
				validators={[VALIDATOR_EMAIL()]}
				initialErrorMsg="Please enter a valid email address."
				onInput={inputHandler}
			/>
			<Passwords
				password1Validate
				validators={[VALIDATOR_MINLENGTH(6)]}
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				signup
			</Button>
		</form>
	);
};

export default SignupForm;
