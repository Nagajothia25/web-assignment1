
const display = document.getElementById("display");

let currentInput = "0";
let previousValue = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {
    if (currentInput === "Error") {
        currentInput = "0";
    }

    if (shouldReset) {
        currentInput = "0";
        shouldReset = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (currentInput === "Error") return;

    if (operator !== null && !shouldReset) {
        calculate();
    }

    previousValue = Number(currentInput);
    operator = selectedOperator;
    shouldReset = true;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return null;
    }
    return a / b;
}

function calculate() {
    if (operator === null || previousValue === null) {
        return;
    }

    const currentValue = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = add(previousValue, currentValue);
            break;
        case "-":
            result = subtract(previousValue, currentValue);
            break;
        case "*":
            result = multiply(previousValue, currentValue);
            break;
        case "/":
            result = divide(previousValue, currentValue);
            break;
        default:
            return;
    }

    if (result === null || !Number.isFinite(result)) {
        currentInput = "Error";
    } else {
        currentInput = String(
            Number(result.toPrecision(12))
        );
    }

    previousValue = null;
    operator = null;
    shouldReset = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    previousValue = null;
    operator = null;
    shouldReset = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput === "Error" || shouldReset) {
        currentInput = "0";
        shouldReset = false;
    } else {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "" || currentInput === "-") {
            currentInput = "0";
        }
    }

    updateDisplay();
}

// Optional keyboard support
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        appendNumber(key);
    } else if (key === ".") {
        appendNumber(".");
    } else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Backspace") {
        deleteLast();
    }
});
