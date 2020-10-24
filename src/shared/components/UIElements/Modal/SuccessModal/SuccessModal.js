import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../Modal';
import Button from '../../../FormElements/Button/Button';

const SuccessModal = (props) => {
	const { t } = useTranslation(['translation']);
	return (
		<Modal
			onCancel={props.onClear}
			header={t('Modals.SuccessModal.title')}
			iconClass="far fa-check-circle"
			show={props.show}
			footer={
				<Button onClick={props.onClear}>
					{t('Buttons.Confirmation')}
				</Button>
			}
			backdropStyle={{ zIndex: 300 }}
			type="success"
		>
			{props.children}
		</Modal>
	);
};

export default SuccessModal;
