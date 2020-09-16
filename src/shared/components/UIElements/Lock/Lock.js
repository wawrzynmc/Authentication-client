import React from 'react';
import classes from './Lock.module.scss';

const Lock = (props) => {
	return (
		<div className={`${classes.Lock}`} onClick={props.lockClick}>
			<svg viewBox="0 0 100 100">
				<path
					y="50"
					className={`${classes.LockTop} ${
						props.closed ? classes.LockTopLoaded : null
					}`}
					d="M64,50V18.7C64,12,58.9,6.6,52.6,6.6h-3.5c-6.3,0-11.3,5.4-11.3,15.1v25.9"
				/>
				<circle
					className={classes.LockOutline}
					cx="50.9"
					cy="65.4"
					r="27"
				/>
				<path
					className={classes.LockBody}
					d="M50.9,41.4c-13.2,0-24,10.7-24,24c0,13.2,10.7,24,24,24c13.2,0,24-10.7,24-24C74.9,52.2,64.1,41.4,50.9,41.4z M56.2,61.9
            c-1.1,1.5-1.3,3-1.3,4.8c0.1,3,0.1,6.1,0,9.1c-0.1,2.8-1.6,4.4-4,4.5c-2.5,0.1-4.3-1.6-4.5-4.4c-0.1-1.9,0-3.9,0-5.8c0,0,0,0,0,0
            c0-1.4,0.1-2.8,0-4.2c-0.2-1.3-0.5-2.7-1.2-3.8c-1.5-2.7-1.1-6.3,1.1-8.3c2.4-2.2,6-2.3,8.6-0.2C57.3,55.5,58,59.2,56.2,61.9z"
				/>
				<path
					className={classes.LockSpinner}
					d="M73.3,65.7c0,12.2-9.9,22.1-22.1,22.1">
					<animateTransform
						attributeType="xml"
						attributeName="transform"
						type="rotate"
						from="0 50.9 65.4"
						to="360 50.9 65.4"
						dur="0.8s"
						repeatCount="indefinite"
					/>
				</path>
			</svg>
		</div>
	);
};

export default Lock;
