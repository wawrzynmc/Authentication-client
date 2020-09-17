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
					<h1>Create Account</h1>
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
					<span>or use your email for registration</span>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button>Sign Up</button>
				</form>
			</div>
			<div
				className={`${classes.FormContainer} ${classes.FormContainer_signin}`}
			>
				<form action="#">
					<h1>Sign in</h1>
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
					<span>or use your account</span>
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
						<h1>Welcome Back!</h1>
						<p>
							To keep connected with us please login with your
							personal info
						</p>
						<button
							className={classes.Ghost}
							onClick={props.togglePannels}
						>
							Sign In
						</button>
					</div>
					<div
						className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_second}`}
					>
						<h1>Hello, Friend!</h1>
						<p>
							Enter your personal details and start journey with
							us
						</p>
						<button
							className={classes.Ghost}
							onClick={props.togglePannels}
						>
							Sign Up
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
