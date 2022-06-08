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
    el.addEventListener("focus", (e) => {
      let hint = e.target.dataset.hint;
      showHint(hint);
    });
  }
});

/**
 * genererates hint value
 * @param {Array} values array of values to put into hint
 * @param {HTMLElement} hint hint element to put data
 * @returns null
 */
function genHint(values, hint) {
  //values: { met,text } - {boolean,string}
  hint.innerHTML = null;
  for (let elem of values) {
    let line = document.createElement("p");

    let icon = elem.met ? hint_correctIcon : hint_incorrectIcon;
    let className = elem.met ? hint_correctClass : hint_incorrectClass;

    line.classList.add(className);
    line.appendChild(icon);
    line.append(elem.text);

    hint.appendChild(line);
  }
}

function updateHint(conditions) {
  let val = [];
  for (let condition of conditions) {
    let met = condition.check ? true : false;
    val.push({ met: met, text: condition.text });
  }
  return val;
}

function showHint(id) {
  let hintID = "#" + id;
  let hint = document.querySelector(hintID);
  if (hint === currentHint) return;
  if (currentHint != null) currentHint.style.display = "none";
  currentHint = hint;
  genHint(
    updateHint([
      { check: 1 !== 1, text: "cos" },
      { check: 1 !== 1, text: "cos1" },
    ]),
    hint
  );
  hint.style.display = "block";
  console.log(hint);
}
