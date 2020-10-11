// * -- libraries imports
import React, { useContext } from 'react';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Password from '../../../shared/components/FormElements/Input/Passwords/Password/Password';
import Button from '../../../shared/components/FormElements/Button/Button';

// ---- functions
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import { VALIDATOR_EMAIL } from '../../../shared/utils/validators';

// ---- styles
import classes from './SigninForm.module.scss';

/**
 * Signup Component
 * * PARAMS:
 * ! WARNINGS:
 *      ! name of fileds in formState has to match with ids of inputs
 */
const SigninForm = (props) => {
	const auth = useContext(AuthContext);
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

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		const { email, password } = formState.inputs;
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/signin`,
				'POST',
				JSON.stringify({
					email: email.value,
					password: password.value,
				}),
				{ 'Content-Type': 'application/json' }
			);
			console.log(responseData);
			auth.login(responseData.userId, responseData.token);
		} catch (err) {}
	};

	return (
		<form className={classes.Form} onSubmit={authSubmitHandler}>
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
