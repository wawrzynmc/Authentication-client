// * -- libraries imports
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// * -- my own imports
// ---- components
import Card from '../../shared/components/UIElements/Card/Card';
import ResetPasswordForm from '../components/ResetPasswordForm/ResetPasswordForm';

// ---- styles
import classes from './ResetPassword.module.scss';

const ResetPassword = (props) => {
	const { t } = useTranslation(['translation']);
	const incomingToken = useParams().token;

	return (
		<Card>
			<h1 className={classes.Header}>
				{t('translation:ResetPassword.title')}
			</h1>
			<p className={classes.Information}>
				{t('translation:ResetPassword.info')}
			</p>
			<span className={classes.HorizontalLine}></span>
			<ResetPasswordForm token={incomingToken} />
		</Card>
	);
};

export default ResetPassword;
