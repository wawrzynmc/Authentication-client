// * -- libraries imports
import React from 'react';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Passwords from '../../../shared/components/FormElements/Input/Passwords/Passwords';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import EmailSent from '../../../shared/components/UIElements/Modal/SuccessModal/EmailSent/EmailSent';

// ---- functions
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
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
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();
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

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		const { name, email, password1, password2 } = formState.inputs;

		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/signup`,
				'POST',
				JSON.stringify({
					name: name.value,
					email: email.value,
					password1: password1.value,
					password2: password2.value,
				}),
				{ 'Content-Type': 'application/json' }
			);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<EmailSent
				msg={msg}
				show={requestSent}
				onClear={clearRequestSent}
			/>
			<ErrorModal error={msg} onClear={clearMsg} />
			{isLoading && <LoadingSpinner asOverlay />}
			<form className={classes.Form} onSubmit={authSubmitHandler}>
				<Input
					id="name"
					element="input"
					type="text"
					placeholder="Name"
					validators={[
						VALIDATOR_MINLENGTH(4),
						VALIDATOR_MAXLENGTH(32),
					]}
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
		</React.Fragment>
	);
};

export default SignupForm;
