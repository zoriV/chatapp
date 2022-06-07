const usernameMinCharacters = 3,
  usernameMaxCharacters = 20,
  passwordRegexUppercase = /[A-D]/,
  passwordRegexLowercase = /[a-d]/,
  passwordRegexNumber = /[1-9]/,
  passwordRegexSpecial = /[^A-Za-z0-9]/;

/**
 * check if username is correct
 * @param {string} username
 * @returns boolean
 */
function validateUsername(username) {
  let isCorrect = false;
  if (username.length > 3 && username.lenght <= 20) {
    isCorrect = true;
  }
  return isCorrect;
}

/**
 * check if password is correct:
 * @param {string} password
 * @returns booleans
 */
function validatePassword(password) {
  let ret = {
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  };
  ret.upperCase = password.match(passwordRegexUppercase);
  ret.lowerCase = password.match(passwordRegexLowercase);
  ret.number = password.match(passwordRegexNumber);
  ret.specialChar = password.match(passwordRegexSpecial);
  return ret;
}

module.exports = {
  validatePassword,
  validateUsername,
};
