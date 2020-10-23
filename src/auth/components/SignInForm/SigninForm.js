// * -- libraries imports
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();
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
	const [formState, inputHandler, clearFormData] = useForm(
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

	const showSendEmailModal = useMemo(() => !!msg && status === 401, [
		msg,
		status,
	]);

	const showErrorModal = useMemo(
		() => !requestSent && status !== 401 && !!msg,
		[msg, status, requestSent]
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
			clearFormData();
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<SendEmail
				show={showSendEmailModal}
				onClear={clearRequestSent}
				onSend={sendActivationEmailHandler}
				email={showSendEmailModal && formState.inputs.email.value}
			/>
			<EmailSent
				show={requestSent}
				msg={msg}
				onClear={clearRequestSent}
			/>
			<ErrorModal error={msg} onClear={clearMsg} show={showErrorModal} />
			{isLoading && <LoadingSpinner asOverlay />}
			<form className={classes.Form} onSubmit={authSubmitHandler}>
				<Input
					id="email"
					element="input"
					type="email"
					placeholder={t(
						'Authentication.SignInForm.activePanel.email'
					)}
					validators={[VALIDATOR_EMAIL()]}
					initialErrorMsg="Please enter a valid email address."
					onInput={inputHandler}
					reset={requestSent}
				/>
				<Password
					id="password"
					onInput={inputHandler}
					reset={requestSent}
				/>
				<div className={classes.ForgotPasswordWrapper}>
					<Link to={'/account/forgot-password'}>
						Forgot password?
					</Link>
				</div>
				<Button type="submit" disabled={!formState.isValid}>
					singin
				</Button>
			</form>
		</React.Fragment>
	);
};

export default React.memo(SigninForm);
