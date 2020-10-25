// * -- libraries imports
import React from 'react';
import { useTranslation } from 'react-i18next';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import EmailSent from '../../../shared/components/UIElements/Modal/SuccessModal/EmailSent/EmailSent';

// ---- functions / hooks
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { VALIDATOR_EMAIL } from '../../../shared/utils/validators';

// ---- styles
import classes from './ForgotPasswordForm.module.scss';

const ForgotPasswordForm = (props) => {
	const { t } = useTranslation(['translation']);
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const forgotPasswordSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/forgot-password`,
				'PUT',
				JSON.stringify({
					email: formState.inputs.email.value,
				}),
				{
					'Content-Type': 'application/json',
				}
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
			<ErrorModal
				error={msg}
				onClear={clearMsg}
				show={!requestSent && !!msg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<form
				className={classes.Form}
				onSubmit={forgotPasswordSubmitHandler}
			>
				<Input
					id="email"
					element="input"
					type="email"
					placeholder={t('Form.email.placeholder')}
					validators={[VALIDATOR_EMAIL()]}
					initialErrorMsg={t('Form.email.initialErrorMsg')}
					onInput={inputHandler}
					withLabel
					label={t('Form.email.placeholder')}
					reset={requestSent}
				/>

				<Button
					type="submit"
					disabled={!formState.isValid}
					style={{ padding: '1rem 2.5rem' }}
				>
					{t('Buttons.SendEmail')}
				</Button>
			</form>
		</React.Fragment>
	);
};

export default ForgotPasswordForm;
