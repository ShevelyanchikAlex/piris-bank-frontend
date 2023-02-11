const EMAIL_REGEX = /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^([A-Za-z0-9_]{4,30})$/;
const NAME_REGEX = /^([A-Za-z0-9_ ]{1,30})$/;

const EMAIL_ERROR_MESSAGE = 'Enter a valid email in the joe@abc.com format';
const PASSWORD_ERROR_MESSAGE = 'Password length must not be less than 4 characters and greater than\n' +
    ' 30 characters and can only contain letters, numbers and underscores';
const NAME_ERROR_MESSAGE = 'Name length must not be less than 1 and greater than' +
    ' 30 characters';
const PASSWORD_EQUALS_ERROR_MESSAGE = 'Password and Repeat Password aren\'t same';

class UserValidator {
    static validateName(name) {
        let errorMessage = '';
        if (!NAME_REGEX.test(name)) {
            errorMessage = NAME_ERROR_MESSAGE;
        }
        return errorMessage;
    }

    static validateEmail(email) {
        let errorMessage = '';
        if (!EMAIL_REGEX.test(email)) {
            errorMessage = EMAIL_ERROR_MESSAGE;
        }
        return errorMessage;
    }

    static validatePassword(password) {
        let errorMessage = '';
        if (!PASSWORD_REGEX.test(password)) {
            errorMessage = PASSWORD_ERROR_MESSAGE;
        }
        return errorMessage;
    }

    static checkEqualsPasswords(password, repeatPassword) {
        let errorMessage = '';
        if (password !== repeatPassword) {
            errorMessage = PASSWORD_EQUALS_ERROR_MESSAGE;
        }
        return errorMessage;
    }

    static validateValuesForLogin(email, password) {
        let emailErrorMessage = this.validateEmail(email);
        let passwordErrorMessage = this.validatePassword(password);
        return {
            emailErrorMessage,
            passwordErrorMessage
        }
    }

    static validateValuesForSignUp(name, email, password, repeatPassword) {
        let nameErrorMessage = this.validateName(name);
        let emailErrorMessage = this.validateEmail(email);
        let passwordErrorMessage = this.validatePassword(password);
        let repeatPasswordErrorMessage = this.validatePassword(repeatPassword);
        let equalsPasswordsErrorMessage = this.checkEqualsPasswords(password, repeatPassword);
        return {
            nameErrorMessage,
            emailErrorMessage,
            passwordErrorMessage,
            repeatPasswordErrorMessage,
            equalsPasswordsErrorMessage
        }
    }
}

export default UserValidator;