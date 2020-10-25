// * -- libraries imports
import React from 'react';
import { useTranslation } from 'react-i18next';

// * -- my own imports
// ---- components
import Card from '../../shared/components/UIElements/Card/Card';
import ForgotPasswordForm from '../components/ForgotPasswordForm/ForgotPasswordForm';

// ---- styles
import classes from './ForgotPassword.module.scss';

const ForgotPassword = (props) => {
	const { t } = useTranslation(['translation']);
	return (
		<Card>
			<h1 className={classes.Header}>{t('ForgotPassword.title')}</h1>
			<p className={classes.Information}>{t('ForgotPassword.info')}</p>
			<span className={classes.HorizontalLine}></span>
			<ForgotPasswordForm />
		</Card>
	);
};

export default ForgotPassword;
