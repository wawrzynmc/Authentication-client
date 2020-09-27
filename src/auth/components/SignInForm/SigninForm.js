// * -- libraries imports
import React from 'react';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Password from '../../../shared/components/FormElements/Input/Passwords/Password/Password';
import Button from '../../../shared/components/FormElements/Button/Button';

// ---- functions
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from '../../../shared/utils/validators';

// ---- styles
import classes from './SigninForm.module.scss';

/**
 * Signup Component
 * * PARAMS:
 * ! WARNINGS:
 *      ! name of fileds in formState has to match with ids of inputs
 */
const SigninForm = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);
	return (
		<form className={classes.Form} action="#">
			<Input
				id="email"
				element="input"
				type="email"
				placeholder="E-mail"
				validators={[VALIDATOR_EMAIL()]}
				initialErrorMsg="Please enter a valid email address."
				onInput={inputHandler}
			/>
			<Password id="password" onInput={inputHandler} />
			<Button type="submit" disabled={!formState.isValid}>
				singin
			</Button>
		</form>
	);
};

export default SigninForm;
