/*-------------------------------- Constants --------------------------------*/
const calculator = document.querySelector('#calculator');

/*-------------------------------- Variables --------------------------------*/
let displayValue = '0'; // Initial display value
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display');

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', handleButtonClick);

/*-------------------------------- Functions --------------------------------*/
function handleButtonClick(event) {
  if (event.target.classList.contains('button')) {
    const buttonValue = event.target.innerText;

    // Determine action based on button value
    if (isNumber(buttonValue)) {
      inputNumber(buttonValue);
    } else if (isOperator(buttonValue)) {
      inputOperator(buttonValue);
    } else if (buttonValue === '=') {
      calculate();
    } else if (buttonValue === 'C') {
      clearCalculator();
    }

    updateDisplay();
  }
}

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}

function inputNumber(number) {
  if (displayValue === '0' || waitingForSecondOperand) {
    displayValue = number;
    waitingForSecondOperand = false;
  } else {
    displayValue += number;
  }
}

function inputOperator(op) {
  if (operator !== null && !waitingForSecondOperand) {
    calculate();
  }
  firstOperand = parseFloat(displayValue);
  operator = op;
  waitingForSecondOperand = true;
}

function calculate() {
  const secondOperand = parseFloat(displayValue);
  let result = 0;

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        alert("Error: Division by zero!");
        clearCalculator();
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  displayValue = result.toString();
  firstOperand = result;
  operator = null;
  waitingForSecondOperand = false;
}

function clearCalculator() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

function updateDisplay() {
  display.textContent = displayValue;
}
