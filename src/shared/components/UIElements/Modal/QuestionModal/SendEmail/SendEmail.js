import React from 'react';
import { useTranslation } from 'react-i18next';

import QuestionModal from '../QuestionModal';

const SendEmail = (props) => {
	const { t } = useTranslation(['translation']);
	return (
		<QuestionModal
			header={t('Modals.QuestionModal.SendEmail.title')}
			button1InlineText={t('Modals.QuestionModal.SendEmail.button')}
			{...props}
		>
			<p>{t('Modals.QuestionModal.SendEmail.info')}</p>
		</QuestionModal>
	);
};

export default SendEmail;
