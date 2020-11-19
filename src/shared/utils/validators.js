/** @namespace validators */

/**
 * @typedef {Object} ValidationReply
 * @property {boolean} ValidationReply.isValid defines if value is valid based on provided validators
 * @property {string} ValidationReply.errorMsg error message
 * @property {object} ValidationReply.metaData additional data
 * @property {number} ValidationReply.metaData.passwordStrength password strength
 */

// * -- validators names
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_ONLY_LETTERS = 'ONLY_LETTERS';
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_PASSWORDS_COHERESION = 'PASSWORD_COHERESION';

// * -- regexes
const emailRegex = new RegExp(
	"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);

const onlyLettersRegex = new RegExp('^[A-Za-z]+$');

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

/**
 * Compute password strength
 * @function analyzePassword
 * @memberof validators
 * @param {string} password password value
 * @returns {number} password strength (0-2)
 */
const analyzePassword = (password) => {
	let result = 0;
	if (strongPassword.test(password)) {
		result = 2;
	} else if (mediumPassword.test(password)) {
		result = 1;
	}
	return result;
};

// * -- export validators
/**
 * Check if field is not empty
 * @function VALIDATOR_REQUIRE
 * @memberof validators
 * @returns {{type: string}}
 */
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });

/**
 * Check if file is in appropriate format
 * @function VALIDATOR_FILE
 * @memberof validators
 * @returns {{type: string}}
 */
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });

/**
 * Check if field value has appropriate length
 * @function VALIDATOR_MINLENGTH
 * @memberof validators
 * @param {string} val
 * @returns {{type: string, val: string}}
 */
export const VALIDATOR_MINLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val: val,
});

/**
 * Check if field value has appropriate length
 * @function VALIDATOR_MAXLENGTH
 * @memberof validators
 * @param {string} val
 * @returns {{type: string, val: string}}
 */
export const VALIDATOR_MAXLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MAXLENGTH,
	val: val,
});

/**
 * Check if field value has appropriate value
 * @function VALIDATOR_MIN
 * @memberof validators
 * @param {string} val
 * @returns {{type: string, val: string}}
 */
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });

/**
 * Check if field value has appropriate value
 * @function VALIDATOR_MAX
 * @memberof validators
 * @param {string} val
 * @returns {{type: string, val: string}}
 */
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });

/**
 * Check if field value has appropriate value
 * @function VALIDATOR_MAX
 * @memberof validators
 * @returns {{type: string, regex: RegExp}}
 */
export const VALIDATOR_EMAIL = () => ({
	type: VALIDATOR_TYPE_EMAIL,
	regex: emailRegex,
});

/**
 * Validate password
 * @function VALIDATOR_PASSWORD
 * @memberof validators
 * @returns {{type: string}}
 */
export const VALIDATOR_PASSWORD = () => ({ type: VALIDATOR_TYPE_PASSWORD });

/**
 * Check if passwords are the same
 * @function VALIDATOR_PASSWORDS_COHERESION
 * @memberof validators
 * @param {string} passwordToCompare password to comparision
 * @returns {{type: string, passwordToCompare: string}}
 */
export const VALIDATOR_PASSWORDS_COHERESION = (passwordToCompare) => ({
	type: VALIDATOR_TYPE_PASSWORDS_COHERESION,
	passwordToCompare,
});

/**
 * Check if passwords has only letters
 * @function VALIDATOR_ONLY_LETTERS
 * @memberof validators
 * @returns {{type: string, regex: RegExp}}
 */
export const VALIDATOR_ONLY_LETTERS = () => ({
	type: VALIDATOR_TYPE_ONLY_LETTERS,
	regex: onlyLettersRegex,
});

/**
 * Main validation functions
 * @function validate
 * @memberof validators
 * @param {string} id field id
 * @param {string} value field value
 * @param {Array} validators array of validators
 * @returns {ValidationReply}
 */
export const validate = (id, value, validators) => {
	let isValid = true,
		metaData = {
			passwordStrength: 0,
		},
		errorMsg = '',
		caseBoolean,
		errorData = {};

	for (const validator of validators) {
		if (validator.type === VALIDATOR_TYPE_PASSWORDS_COHERESION) {
			caseBoolean = validator.passwordToCompare === value;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `Passwords have to match.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_PASSWORD) {
			metaData.passwordStrength = analyzePassword(value);
		}
		if (validator.type === VALIDATOR_TYPE_EMAIL) {
			caseBoolean = validator.regex.test(value);
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `Must be a valid email.`;
			}
		}
		// * casual cases
		if (validator.type === VALIDATOR_TYPE_REQUIRE) {
			caseBoolean = value.trim().length > 0;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} is required.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
			caseBoolean = value.trim().length >= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} has to have at least ${validator.val} characters.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
			caseBoolean = value.trim().length <= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} has to have at most ${validator.val} characters.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MIN) {
			caseBoolean = +value >= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} value must be greater than or equal to ${validator.val}.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MAX) {
			caseBoolean = +value <= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} value must be lower than or equal to ${validator.val}.`;
			}
		}

		if (validator.type === VALIDATOR_TYPE_ONLY_LETTERS) {
			caseBoolean = validator.regex.test(value);
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `Only alphabetical characters allowed.`;
			}
		}
	}

	return {
		isValid,
		metaData,
		errorMsg,
		errorData,
	};
};
