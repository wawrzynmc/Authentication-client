import React from 'react';
import SuccessModal from '../SuccessModal';
import { useTranslation } from 'react-i18next';

import classes from './EmailSent.module.scss';

const EmailSent = (props) => {
	const { t } = useTranslation(['successes']);
	return (
		<SuccessModal {...props}>
			<p>{t(`${props.msg}`)}</p>
			<div className={classes.Content}>
				<i
					className={`${classes.Content__envelope} ${classes.Content__envelopeOpened} far fa-envelope-open`}
				></i>
				<i
					className={`${classes.Content__envelope} ${classes.Content__envelopeClosed} far fa-envelope`}
				></i>
			</div>
		</SuccessModal>
	);
};

export default EmailSent;
