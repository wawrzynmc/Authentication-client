// * -- libraries imports
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

// * -- my own imports
// ---- components
import Backdrop from '../Backdrop/Backdrop';

// ---- styles
import classes from './Modal.module.scss';

const ModalOverlay = (props) => {
	const content = (
		<div
			className={`${classes.Modal} ${props.className}`}
			style={props.style}
		>
			<header
				className={`${classes.Modal__header} ${props.headerClassName}`}
			>
				<span>
					<i
						className={`${props.iconClass} ${classes.Modal__icon} 
						${props.type === 'success' ? classes.Modal__iconSuccess : null}
						${props.type === 'error' ? classes.Modal__iconError : null}`}
					></i>
				</span>
				<h2>{props.header}</h2>
				<span>
					<i
						className={`${props.iconClass} ${classes.Modal__icon} 
						${props.type === 'success' ? classes.Modal__iconSuccess : null}
						${props.type === 'error' ? classes.Modal__iconError : null}`}
					></i>
				</span>
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
					<span className={classes.Modal__horizontalLine}></span>
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
	const nodeRef = useRef(null);

	return (
		<React.Fragment>
			{props.show && (
				<Backdrop
					onClick={props.onCancel}
					style={props.backdropStyle}
				/>
			)}
			<CSSTransition
				in={props.show}
				nodeRef={nodeRef}
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
