// * -- libraries imports
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

// * -- my own imports
// ---- components
import Backdrop from '../Backdrop/Backdrop';

// ---- styles
import classes from './Modal.module.css';

const ModalOverlay = (props) => {
	const content = (
		<div
			className={`${classes.Modal} ${props.className}`}
			style={props.style}
		>
			<header
				className={`${classes.Modal__header} ${props.headerClassName}`}
			>
				<h2>{props.header}</h2>
			</header>
			<form
				onSubmit={
					props.onSubmit
						? props.onSubmit
						: (event) => event.preventDefault()
				}
			>
				<div
					className={`${classes.Modal__content} ${props.contentClassName}`}
				>
					{props.children}
				</div>
				<footer
					className={`${classes.Modal__footer} ${props.footerClassName}`}
				>
					{props.footer}
				</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById('modal-hook')
	);
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				timeout={200}
				classNames={{
					enter: classes.Modal_enter,
					enterActive: classes.Modal_enterActive,
					exit: classes.Modal_exit,
					exitActive: classes.Modal_exitActive,
				}}
				mountOnEnter
				unmountOnExit
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
