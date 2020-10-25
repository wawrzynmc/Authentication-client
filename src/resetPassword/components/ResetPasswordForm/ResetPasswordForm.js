// * -- libraries imports
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// * -- my own imports
// ---- components
import Passwords from '../../../shared/components/FormElements/Input/Passwords/Passwords';
import Button from '../../../shared/components/FormElements/Button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

// ---- functions / hooks
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';

// ---- styles
import classes from './ResetPasswordForm.module.scss';

const ForgotPasswordForm = (props) => {
	const { t } = useTranslation(['translation', 'successes']);
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
	} = useHttpClient();
	const history = useHistory();

	const [formState, inputHandler, clearFormData] = useForm(
		{
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

	const resetPasswordSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/reset-password`,
				'PUT',
				JSON.stringify({
					password: formState.inputs.password1.value,
					token: props.token,
				}),
				{
					'Content-Type': 'application/json',
				}
			);
			clearFormData();
			history.push({
				pathname: '/auth',
				search: '?action=signin',
				state: {
					success: true,
					message: t('successes:PWD_CHANGED_SUCCESS'),
				},
			});
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={msg}
				onClear={clearMsg}
				show={!requestSent && !!msg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<form
				className={classes.Form}
				onSubmit={resetPasswordSubmitHandler}
			>
				<Passwords
					password1Validate
					validators={[VALIDATOR_MINLENGTH(6)]}
					onInput={inputHandler}
					reset={requestSent}
					password1Placeholder={t(
						'translation:Form.password.placeholder'
					)}
					password2Placeholder={t(
						'translation:Form.passwordConfirmation.placeholder'
					)}
					initialErrorMsg={t(
						'translation:Form.password.initialErrorMsg'
					)}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					{t('Buttons.Confirmation')}
				</Button>
			</form>
		</React.Fragment>
	);
};

export default ForgotPasswordForm;
