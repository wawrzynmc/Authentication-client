import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../Modal';
import Button from '../../../FormElements/Button/Button';

const QuestionModal = (props) => {
	const { t } = useTranslation(['translation']);
	return (
		<Modal
			onCancel={props.onClear}
			header={props.header}
			iconClass="fas fa-question"
			show={props.show}
			footer={
				<React.Fragment>
					<Button
						style={{ padding: '1rem 3.5rem', width: '40%' }}
						onClick={props.onSend}
					>
						{props.button1InlineText ||
							t('Buttons.Confirmation')}
					</Button>
					<Button
						style={{ padding: '1rem 3.5rem', width: '40%' }}
						onClick={props.onClear}
					>
						{props.button2InlineText || t('Buttons.Cancel')}
					</Button>
				</React.Fragment>
			}
			backdropStyle={{ zIndex: 300 }}
			type="question"
		>
			{props.children}
		</Modal>
	);
};

export default QuestionModal;
