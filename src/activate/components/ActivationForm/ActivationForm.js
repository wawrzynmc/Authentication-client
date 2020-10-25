// * -- libraries imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import TextBetweenLines from '../../../shared/components/UIElements/Text/TextBetweenLines/TextBetweenLines';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import EmailSent from '../../../shared/components/UIElements/Modal/SuccessModal/EmailSent/EmailSent';

// ---- functions / hooks
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { VALIDATOR_EMAIL } from '../../../shared/utils/validators';

// ---- styles
import classes from './ActivationForm.module.scss';

/**
 * Signup Component
 * * PARAMS:
 * ! WARNINGS:
 *      ! name of fileds in formState has to match with ids of inputs
 */
const ActivationForm = (props) => {
	const { t } = useTranslation(['translation', 'successes']);
	const [isRedirectToSignup, setIsRedirectToSignup] = useState(true);
	const [activationFailed, setActivationFailed] = useState(false);
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();
	const [formState, inputHandler, setFormData, clearFormData] = useForm(
		{},
		true
	);
	const history = useHistory();

	const changeModeHandler = () => {
		setFormData(
			{
				email: {
					value: '',
					isValid: false,
				},
			},
			false
		);
		setActivationFailed(true);
	};

	const activationSubmitHandler = async (event) => {
		event.preventDefault();

		if (!activationFailed) {
			try {
				await sendRequest(
					`${process.env.REACT_APP_SERVER_API_URL}/account/activate`,
					'POST',
					JSON.stringify({
						token: props.token,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
				history.push({
					pathname: '/auth',
					search: '?action=signin',
					state: {
						success: true,
						message: t('successes:ACTIVATION_SUCCESS'),
					},
				});
			} catch (err) {
				if (err.status === 401) {
					changeModeHandler();
				} else {
					setFormData({}, false);
					setIsRedirectToSignup(false);
				}
			}
		} else {
			try {
				await sendRequest(
					`${process.env.REACT_APP_SERVER_API_URL}/account/send-activation-email`,
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
				clearFormData();
			} catch (err) {
				if (err.status === 403) {
					setFormData({ ...formState.inputs }, false);
					setIsRedirectToSignup(false);
				}
			}
		}
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
			<form className={classes.Form} onSubmit={activationSubmitHandler}>
				{activationFailed && (
					<Input
						id="email"
						element="input"
						type="email"
						placeholder={t('translation:Form.email.placeholder')}
						validators={[VALIDATOR_EMAIL()]}
						initialErrorMsg={t(
							'translation:Form.email.initialErrorMsg'
						)}
						reset={requestSent}
						onInput={inputHandler}
					/>
				)}
				<Button
					type="submit"
					disabled={!formState.isValid}
					style={{ padding: '1rem 2.5rem' }}
				>
					{activationFailed
						? t('translation:Buttons.SendEmail')
						: t('translation:Buttons.ActivateAccount')}
				</Button>
			</form>
			<TextBetweenLines>
				{t('translation:Activation.or')}
			</TextBetweenLines>
			<Button
				inverse
				to={{
					pathname: '/auth',
					search: `?action=${
						isRedirectToSignup ? 'signup' : 'signin'
					}`,
				}}
			>
				{isRedirectToSignup
					? t('translation:Buttons.SignUp')
					: t('translation:Buttons.SignIn')}
			</Button>
		</React.Fragment>
	);
};

export default ActivationForm;
