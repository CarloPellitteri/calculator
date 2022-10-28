// ACCESS TO HTML BUTTONS

const calcButtons = [...document.querySelectorAll(".calc-button")];

// STATE

const initialState = {
  clicked: "",
  term1: "",
  operator: "",
  term2: "",
};

let state = { ...initialState };

// OTHER FUNCTIONS

const isOperator = (arg) => {
  if (arg === "+" || arg === "-" || arg === "*" || arg === "/" || arg === "%") {
    return true;
  }
};

const lastIsPoint = (toVerify) => {
  if (toVerify[toVerify.length - 1] === ".") {
    return true;
  }
};

// DISPLAY RENDER INITIAL

var displayText = document.querySelector(".display-text");
displayText.innerHTML = `${state.term1}${state.operator}${state.term2}`;

// var displayResultText = document.querySelector(".display-result-text");
// displayResultText.innerHTML = state.displayResultValue;

const render = () => {
  console.log(state);
  displayText.innerHTML = `${state.term1}${state.operator}${state.term2}`;
};

// OPERATIONS

const sum = () => {
  state.term1 = Number(state.term1 + state.term2);
  state.operator = "";
  state.term2 = "";
};
const subtraction = () => {
  state.term1 = Number(state.term1 - state.term2);
  state.operator = "";
  state.term2 = "";
};
const multiplication = () => {
  state.term1 = Number(state.term1 * state.term2);
  state.operator = "";
  state.term2 = "";
};
const division = () => {
  state.term1 = Number(state.term1 / state.term2);
  state.operator = "";
  state.term2 = "";
};
const percentage = () => {
  state.term1 = Number((state.term2 / 100) * state.term1);
  state.operator = "";
  state.term2 = "";
};

// HANDLEBUTTONS

const handleNumber = () => {
  if (state.operator === "" && state.term2 === "") {
    state.term1 = Number(`${state.term1}${state.clicked}`);
    return;
  }
  if (state.term1 !== "" && isOperator(state.operator)) {
    state.term2 = Number(`${state.term2}${state.clicked}`);
    return;
  }
};

const handleOperator = () => {
  if (lastIsPoint(state.term1)) {
    state.term1 = Number(state.term1);
  }
  if (lastIsPoint(state.term2)) {
    state.term2 = Number(state.term2);
  }
  if (displayText.innerHTML === "") {
    return;
  }
  if (state.operator === "") {
    state.operator = state.clicked;
    return;
  }
  if (isOperator(state.operator) && state.term2 !== "") {
    handleEqual();
    state.operator = state.clicked;
    return;
  }
  if (isOperator(state.operator) && state.term2 === "") {
    return;
  }
};

const handleEqual = () => {
  if (lastIsPoint(state.term1)) {
    state.term1 = Number(state.term1);
  }
  if (lastIsPoint(state.term2)) {
    state.term2 = Number(state.term2);
  }
  if (state.operator === "+") {
    sum();
    return;
  }
  if (state.operator === "-") {
    subtraction();
    return;
  }
  if (state.operator === "*") {
    multiplication();
    return;
  }
  if (state.operator === "/") {
    division();
    return;
  }
  if (state.operator === "%") {
    percentage();
    return;
  }
};

const handleTransform = () => {
  if (displayText.innerHTML === "") {
    return;
  }
  if (state.operator === "") {
    state.term1 = state.term1 * -1;
  }
  if (isOperator(state.operator)) {
    state.term2 = state.term2 * -1;
  }
};

const handlePoint = () => {
  if (state.term1 !== "" && state.operator === "") {
    if (!Number.isInteger(state.term1) || typeof state.term1 === "string") {
      return;
    } else {
      state.term1 = `${state.term1}${state.clicked}`;
    }
  }
  if (state.term1 !== "" && isOperator(state.operator) && state.term2 === "") {
    return;
  }
  if (state.term2 !== "" && isOperator(state.operator)) {
    if (!Number.isInteger(state.term2) || typeof state.term2 === "string") {
      return;
    } else {
      state.term2 = `${state.term2}${state.clicked}`;
    }
  }
};

const handleReset = () => {
  state = { ...initialState };
};

const handleCancel = () => {
  if (state.operator === "") {
    state.term1 = Math.trunc(state.term1 / 10);
  }
  if (isOperator(state.operator) && state.term2 === "") {
    state.operator = "";
  }
  if (state.term2 !== "") {
    state.term2 = Math.trunc(state.term2 / 10);
  }
  if (state.term1 === 0) {
    state.term1 = "";
  }
  if (state.term2 === 0) {
    state.term2 = "";
  }
};

// EVENT CLICK

const handleButtonClick = (event) => {
  state.clicked = event.target.innerText;

  const isNumber = !Number.isNaN(Number(state.clicked));

  if (isNumber) {
    handleNumber();
  }
  if (isOperator(state.clicked)) {
    handleOperator();
  }
  if (state.clicked === "=") {
    handleEqual();
  }
  if (state.clicked === "+/-") {
    handleTransform();
  }
  if (state.clicked === ".") {
    handlePoint();
  }
  if (state.clicked === "AC") {
    handleReset();
  }
  if (state.clicked === "C") {
    handleCancel();
  }
  render();
};

// ADD E)VENTS

calcButtons.forEach((item) => {
  item.addEventListener("click", handleButtonClick);
});
