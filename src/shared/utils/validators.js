// validators names
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD';
const VALIDATOR_TYPE_FILE = 'FILE';

// regex
const emailRegex = new RegExp(
	"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);

/* 
	- at least six or more characters 
		- && (and) at least 1. lowercase alphabetical character && at least 1 uppercase alphabetical character
		- || (or) at least 1. lowercase alphabetical character && at least 1 numeric character
		- || (or) at least 1 uppercase alphabetical character  && at least 1 numeric character
*/
const mediumPassword = new RegExp(
	'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);
/* 
	-  at least 1. lowercase alphabetical character
	- && (and) at least 1 uppercase alphabetical character
	- && at least 1 numeric character
	- && at least one special character
	- && eight characters or longer
*/
const strongPassword = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

// functions
const analyzePassword = (password) => {
	let result = 0;
	if (strongPassword.test(password)) {
		result = 2;
	} else if (mediumPassword.test(password)) {
		result = 1;
	}
	return result;
};

// export validators
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MAXLENGTH,
	val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({
	type: VALIDATOR_TYPE_EMAIL,
	regex: emailRegex,
});
export const VALIDATOR_PASSWORD = () => ({ type: VALIDATOR_TYPE_PASSWORD });

export const validate = (value, validators) => {
	let isValid = true,
		metaData = {};

	for (const validator of validators) {
		if (validator.type === VALIDATOR_TYPE_REQUIRE) {
			isValid = isValid && value.trim().length > 0;
		}
		if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
			isValid = isValid && value.trim().length >= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
			isValid = isValid && value.trim().length <= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MIN) {
			isValid = isValid && +value >= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_MAX) {
			isValid = isValid && +value <= validator.val;
		}
		if (validator.type === VALIDATOR_TYPE_EMAIL) {
			console.log(validator.regex.test(value));
			isValid = isValid && validator.regex.test(value);
		}
		if (validator.type === VALIDATOR_TYPE_PASSWORD) {
			metaData.passwordStrength = analyzePassword(value);
		}
	}

	return {
		isValid,
		metaData,
	};
};
