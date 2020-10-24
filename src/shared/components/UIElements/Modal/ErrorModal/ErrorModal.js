import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../Modal';
import Button from '../../../FormElements/Button/Button';

const ErrorModal = (props) => {
	const { t } = useTranslation(['translation', 'errors']);
	return (
		<Modal
			onCancel={props.onClear}
			header={t('Modals.ErrorModal.title')}
			iconClass="fas fa-exclamation-triangle"
			type="error"
			show={props.show}
			footer={
				<Button onClick={props.onClear}>
					{t('Buttons.Confirmation')}
				</Button>
			}
			backdropStyle={{ zIndex: 300 }}
		>
			<p>{`${t(`errors:${props.error}`)}`}</p>
		</Modal>
	);
};

export default ErrorModal;
