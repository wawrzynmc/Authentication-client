import React from 'react';

import classes from './Form.module.scss';

const Form = (props) => {
	let attachedClasses = [classes.Container];
	if (props.rightPanelActive) {
		attachedClasses.push(classes.Container_secondPanelActive);
	}
	return (
		<div className={attachedClasses.join(' ')}>
			<div
				className={`${classes.FormContainer} ${classes.FormContainer_signup}`}
			>
				<form action="#">
					<h1 className={classes.FormContainer__Title}>
						Create Account
					</h1>
					<div className={classes.FormContainer__Socials}>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-google-plus-g"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-linkedin-in"></i>
						</a>
					</div>
					<span className={classes.FormContainer__paragraph}>
						or fill the form
					</span>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<input type="password" placeholder="Password" />
					<button>Sign Up</button>
				</form>
			</div>
			<div
				className={`${classes.FormContainer} ${classes.FormContainer_signin}`}
			>
				<form action="#">
					<h1 className={classes.FormContainer__Title}>Sign in</h1>
					<div className={classes.FormContainer__Socials}>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-google-plus-g"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-linkedin-in"></i>
						</a>
					</div>
					<span className={classes.FormContainer__paragraph}>
						or fill the form
					</span>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<button>Sign In</button>
				</form>
			</div>
			<div className={classes.OverlayContainer}>
				<div className={classes.OverlayContainer__Overlay}>
					<div
						className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_first}`}
					>
						<h1 className={classes.OverlayContainer__Title}>
							Welcome Back
						</h1>
						<span className={classes.OverlayContainer__Information}>
							<p>
								Enter your personal details, <br />
								log in and have fun!
							</p>
							<h1>
								<span>or</span>
							</h1>
						</span>
						<button
							className={classes.Ghost}
							onClick={props.togglePannels}
						>
							Sign Up
						</button>
					</div>
					<div
						className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_second}`}
					>
						<h1 className={classes.OverlayContainer__Title}>
							First Time Here?
						</h1>
						<span className={classes.OverlayContainer__Information}>
							<p>
								Enter your personal details, <br />
								create an account and start the journey!
							</p>
							<h1>
								<span>or</span>
							</h1>
						</span>
						<button
							className={classes.Ghost}
							onClick={props.togglePannels}
						>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Form;

/* 

*/
