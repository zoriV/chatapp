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
    el.addEventListener("focus", function () {
      let hint = this.dataset.hint;
      showHint(hint);
    });
  }
});

/**
 * genererates hint value
 * @param {Array} values array of values to put into hint
 * @returns null
 */
function genHint(values, hint) {
  //values: { met,text } - {boolean,string}
  hint.innerHTML = null;
  for (i = 0; i < values.length; i++) {
    let line = document.createElement("p");
    line.appendChild(values[i].met ? hint_correctIcon : hint_incorrectIcon);
    line.append(values[i].text);
    line.classList.add(values[i].met ? hint_correctClass : hint_incorrectClass);
    hint.appendChild(line);

    line = undefined;
  }
}

function showHint(id) {
  hintID = "#" + id;
  hint = document.querySelector(hintID);
  if (hint === currentHint) return;
  if (currentHint != null) currentHint.style.display = "none";
  currentHint = hint;
  genHint(
    [
      { met: false, text: "cos1" },
      { met: false, text: "cos2" },
      { met: true, text: "cos3" },
    ],
    hint
  );
  hint.style.display = "block";
  console.log(hint);
}

function updateHint(params) {}
