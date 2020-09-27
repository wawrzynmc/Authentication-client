// * -- libraries imports
import React from 'react';

// * -- my own imports
// ---- components

// ---- functions
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
} from '../../../shared/utils/validators';

// ---- styles
import classes from './SigninForm.module.scss';

const SigninForm = (props) => {
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
				id="email"
				element="input"
				type="email"
				placeholder="E-mail"
				validators={[VALIDATOR_EMAIL()]}
				errorText="Please enter a valid email address."
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				singin
			</Button>
		</form>
	);
};

export default SigninForm;
