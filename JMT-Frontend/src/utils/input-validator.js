/** Class applies various input validation related logic to UI components */
class InputValidator {
  constructor() {
    this.errors = {};
  }

  isEmail(email) {
    const regex = /^\w+([.-]?\w+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*(\.\w{2,15})+$/;
    return regex.test(email);
  }

  isDisplayName(name) {
    const regex = /^[a-zA-Z0-9]{3,12}$/;
    return regex.test(name);
  }

  isPassword(password) {
    const regex = /^[a-zA-Z0-9~!@#$%^&*()_+,.\][/\\]{6,20}$/;
    return regex.test(password);
  }

  isEmpty(input) {
    return input === null || input === '';
  }
}

export default new InputValidator();
