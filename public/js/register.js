const registerForm = document.querySelector("#registerForm"),
  hint_correctClass = "met",
  hint_incorrectClass = "notMet",
  hint_correctIcon = document.createElement("i"),
  hint_incorrectIcon = document.createElement("i");
var currentHint = null;
hint_incorrectIcon.classList.add("fa-solid", "fa-xmark");
hint_correctIcon.classList.add("fa-solid", "fa-check");

Array.from(registerForm.elements).forEach((el) => {
  if (
    el.nodeName == "INPUT" &&
    el.type !== "submit" &&
    el.type !== "checkbox" &&
    el.type !== "email"
  ) {
    // el.addEventListener("focus", (e) => {
    //   let input = e.target;
    //   let hint = input.dataset.hint;
    //   let hintType = input.dataset.hinttype;
    //   let value = input.value;
    //   showHint(hint, getHintValues(hintType, value));
    // });
    el.addEventListener("input", (e) => {
      let input = e.target;
      let hint = input.dataset.hint;
      let hintType = input.dataset.hinttype;
      let value = input.value;
      showHint(hint, getHintValues(hintType, value));
    });
  }
});

function getHintValues(hintType, value) {
  let hintContents = [];
  if (hintType === "user") {
    hintContents.push(
      {
        check: !value.match(/[^a-zA-Z0-9\-\_]/),
        text: "Tylko litery, cyfry oraz znaki: _ i -",
      },
      {
        check: value.length > 3 && value.length <= 20,
        text: "Od 3 do 20 znaków",
      }
    );
  } else if (hintType === "pass") {
    hintContents.push(
      {
        check: value.match(/[A-Z]/),
        text: "Minimum 1 duża litera",
      },
      {
        check: value.match(/[^a-zA-Z0-9\-\_ ]/),
        text: "Minimum 1 znak specjalny",
      },
      {
        check: value.length >= 9,
        text: "Minimum 9 znaków",
      },
      {
        check: value.match(/[1-9]/),
        text: "Minimum 1 cyfra",
      }
    );
  } else if (hintType === "passCheck") {
    let password = document.querySelector("#password").value;
    hintContents.push({
      check: value === password,
      text: "Zgodność podanych haseł",
    });
  }
  return hintContents;
}

function genHint(values, hint) {
  //values: { met,text } - {boolean,string}
  hint.innerHTML = null;
  for (let elem of values) {
    let line = document.createElement("p");

    let icon = elem.met ? hint_correctIcon : hint_incorrectIcon;
    let className = elem.met ? hint_correctClass : hint_incorrectClass;

    line.classList.add(className);
    line.appendChild(icon.cloneNode(true));
    line.append(elem.text);

    hint.appendChild(line);
  }
}

function getHintValue(conditions) {
  let val = [];
  for (let condition of conditions) {
    let met = condition.check ? true : false;
    val.push({ met: met, text: condition.text });
  }
  return val;
}

function showHint(id, values) {
  let hintID = "#" + id;
  let hint = document.querySelector(hintID);
  // if (hint === currentHint) return;
  if (currentHint != null) currentHint.style.display = "none";
  currentHint = hint;
  genHint(getHintValue(values), hint);
  hint.style.display = "block";
}

function checkAllData(data) {
  let errorMessage = new String();
  const { username, email, password, passwordCheck } = data;
  let usernameCorrect =
      !username.match(/[^a-zA-Z0-9\-\_]/) &&
      username.length > 3 &&
      username.length <= 20,
    mailCorrect = true,
    passwordCorrect =
      password.match(/[A-B]/) &&
      password.match(/[1-9]/) &&
      password.match(/[^a-zA-Z0-9\-\_ ]/),
    passwordCheckCorrect = password === passwordCheck;

  return {
    correct:
      usernameCorrect && mailCorrect && passwordCorrect && passwordCheckCorrect,
    message: errorMessage,
  };
}

//CHANGE PASSWORD VISIBILITY
function switchPasswordVisibility(passElem, icon) {
  passElem.type == "text"
    ? (passElem.type = "password")
    : (passElem.type = "text");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}
