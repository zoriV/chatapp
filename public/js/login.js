const passwordInput = document.querySelector("#password"),
  showhideButton = document.querySelector("#showhide"),
  form = document.querySelector("#loginForm"),
  messageContainer = document.querySelector("#messageContaier"),
  messageBox = document.querySelector("#messageBox");

function switchPasswordVisibility(passElem, icon) {
  passElem.type == "text"
    ? (passElem.type = "password")
    : (passElem.type = "text");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

function setError(message) {
  if (!Boolean(message) || message.length === 0) {
    messageContainer.style.display = "none"; //? hide message if error is empty
    return;
  }
  messageContainer.style.display = "flex";
  messageBox.querySelector("#message").innerText = message;
}

showhideButton.addEventListener("click", (e) => {
  switchPasswordVisibility(passwordInput, e.target);
});

const errorMessages = {
  insertData: "Wprowadź dane", //? data is empty - password & username
  insertUsername: "Wprowadź nazwę użytkownika", //? username is empty
  insertPassword: "Wprowadź hasło", //? password is empty
  usernameIncorrect: "Nazwa użytkownika jest niepoprawna", //? when username is incorrect - lenght > 20, contains special characters
  userNotExist: "Użytkownik nie istnieje", //? user doesn't exist
  passwordIncorrect: "Wprowadzone hasło jest niepoprawne", //? password is incorrect
  unknownError: "Logowanie nieudane",
};

function isDataCorrect(
  data_username,
  data_password,
  callback = function () {}
) {
  if (!Boolean(data_username) && !Boolean(data_password)) {
    callback(errorMessages.insertData);
    return false;
  }
  if (!Boolean(data_username)) {
    callback(errorMessages.insertUsername);
    return false;
  }
  if (!Boolean(data_password)) {
    callback(errorMessages.insertPassword);
    return false;
  }
  return true;
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let data = {
//     username: form.elements.username.value,
//     password: form.elements.password.value,
//   };
//   if (
//     !isDataCorrect(data.username, data.password, (message) => {
//       setError(message);
//     })
//   )
//     return;
//   fetch("/login/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       if (!data.userExist) {
//         setError(errorMessages.userNotExist);
//         return;
//       }
//       setError();
//     });
// });
