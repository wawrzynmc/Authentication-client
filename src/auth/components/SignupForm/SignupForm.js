// * -- libraries imports
import React, { useState } from 'react';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Passwords from '../../../shared/components/FormElements/Input/Passwords/Passwords';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import EmailSent from '../../../shared/components/UIElements/Modal/SuccessModal/EmailSent/EmailSent';

// ---- functions / hooks
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
	VALIDATOR_EMAIL,
	VALIDATOR_ONLY_LETTERS,
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
	const [reset, setReset] = useState(false);
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();
	const [formState, inputHandler, setFormData, clearFormData] = useForm(
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
		// console.log(event.target);
		event.target.reset();
		const { name, email, password1, password2 } = formState.inputs;

		try {
			await sendRequest(
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

			// event.target.reset();
		} catch (err) {}
	};

	const resetHandler = () => {
		clearFormData();
		setReset((prevState) => !prevState);
	};

	return (
		<React.Fragment>
			<EmailSent
				msg={msg}
				show={requestSent}
				onClear={clearRequestSent}
			/>
			<ErrorModal
				error={msg}
				onClear={clearMsg}
				show={!requestSent && !!msg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<form
				className={classes.Form}
				onSubmit={authSubmitHandler}
				onReset={resetHandler}
			>
				<Input
					id="name"
					element="input"
					type="text"
					placeholder="Name"
					validators={[
						VALIDATOR_MINLENGTH(4),
						VALIDATOR_MAXLENGTH(32),
						VALIDATOR_ONLY_LETTERS(),
					]}
					initialErrorMsg="Please enter a name."
					onInput={inputHandler}
					initialValue={formState.inputs.name.value}
					reset={reset}
				/>
				<Input
					id="email"
					element="input"
					type="email"
					placeholder="E-mail"
					validators={[VALIDATOR_EMAIL()]}
					initialErrorMsg="Please enter a valid email address."
					onInput={inputHandler}
					reset={reset}
				/>
				<Passwords
					password1Validate
					validators={[VALIDATOR_MINLENGTH(6)]}
					onInput={inputHandler}
					reset={reset}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					signup
				</Button>
			</form>
		</React.Fragment>
	);
};

export default SignupForm;
