import React from 'react';

import Modal from '../Modal';
import Button from '../../../FormElements/Button/Button';

const QuestionModal = (props) => {
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
						{props.button1InlineText || 'confirm'}
					</Button>
					<Button
						style={{ padding: '1rem 3.5rem', width: '40%' }}
						onClick={props.onClear}
					>
						{props.button2InlineText || 'cancel'}
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
