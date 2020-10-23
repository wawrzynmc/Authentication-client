// * -- libraries imports
import React from 'react';
import { useTranslation } from 'react-i18next';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import Passwords from '../../../shared/components/FormElements/Input/Passwords/Passwords';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import SendEmail from '../../../shared/components/UIElements/Modal/QuestionModal/SendEmail/SendEmail';
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
	const { t } = useTranslation(['translation', 'error']);
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
			// !  ---- temp solution
			resetForm();
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

	// !  ---- temp solution
	const resetForm = () => {
		clearFormData();
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
				show={!requestSent && status !== 401 && !!msg}
				error={msg}
				onClear={clearMsg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<form className={classes.Form} onSubmit={authSubmitHandler}>
				<Input
					id="name"
					element="input"
					type="text"
					placeholder={t('Form.name.placeholder')}
					validators={[
						VALIDATOR_MINLENGTH(4),
						VALIDATOR_MAXLENGTH(32),
						VALIDATOR_ONLY_LETTERS(),
					]}
					initialErrorMsg={t('Form.name.initialErrorMsg')}
					onInput={inputHandler}
					initialValue={formState.inputs.name.value}
					reset={requestSent}
				/>
				<Input
					id="email"
					element="input"
					type="email"
					placeholder={t('Form.email.placeholder')}
					validators={[VALIDATOR_EMAIL()]}
					initialErrorMsg={t('Form.email.initialErrorMsg')}
					onInput={inputHandler}
					reset={requestSent}
				/>
				<Passwords
					password1Validate
					validators={[VALIDATOR_MINLENGTH(6)]}
					onInput={inputHandler}
					reset={requestSent}
					password1Placeholder={t('Form.password.placeholder')}
					password2Placeholder={t(
						'Form.passwordConfirmation.placeholder'
					)}
					initialErrorMsg={t('Form.password.initialErrorMsg')}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					{t('Authentication.SignUpForm.activePanel.button')}
				</Button>
			</form>
		</React.Fragment>
	);
};

export default SignupForm;
