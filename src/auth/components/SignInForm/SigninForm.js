// * -- libraries imports
import React, { useContext, useCallback, useState } from 'react';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Password from '../../../shared/components/FormElements/Input/Passwords/Password/Password';
import Button from '../../../shared/components/FormElements/Button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import SendEmail from '../../../shared/components/UIElements/Modal/QuestionModal/SendEmail/SendEmail';
import EmailSent from '../../../shared/components/UIElements/Modal/SuccessModal/EmailSent/EmailSent';

// ---- functions
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import { VALIDATOR_EMAIL } from '../../../shared/utils/validators';

// ---- styles
import classes from './SigninForm.module.scss';

/**
 * Signin Component
 * @type {Component}
 * @category Auth
 */
const SigninForm = (props) => {
	console.log('Render SignIn Form');
	const [reset, setReset] = useState(false);
	const auth = useContext(AuthContext);
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
		status,
	} = useHttpClient();
	const [formState, inputHandler, setFormData, clearFormData] = useForm(
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
			const {
				token,
				user: { id, role },
			} = responseData;
			auth.login(id, role, token);
		} catch (err) {}
	};

	const sendActivationEmailHandler = async (event) => {
		clearRequestSent(); // close modal

		const { email } = formState.inputs;
		try {
			await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/send-activation-email`,
				'POST',
				JSON.stringify({
					email: email.value,
				}),
				{ 'Content-Type': 'application/json' }
			);
			resetForm();
		} catch (err) {}
	};

	const resetForm = () => {
		clearFormData();
		setReset((prevState) => !prevState);
	};

	return (
		<React.Fragment>
			<SendEmail
				show={!!msg && status === 401}
				onClear={clearRequestSent}
				onSend={sendActivationEmailHandler}
				email={formState.inputs.email.value}
			/>
			<EmailSent
				show={requestSent}
				msg={msg}
				onClear={clearRequestSent}
			/>
			<ErrorModal
				error={msg}
				onClear={clearMsg}
				show={!requestSent && status !== 401 && !!msg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<form className={classes.Form} onSubmit={authSubmitHandler}>
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
				<Password id="password" onInput={inputHandler} reset={reset} />
				<Button type="submit" disabled={!formState.isValid}>
					singin
				</Button>
			</form>
		</React.Fragment>
	);
};

export default React.memo(SigninForm);
