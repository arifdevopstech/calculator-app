let currentInput = '';
let operator = '';
let result = '';

function appendNumber(num) {
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    operator = op;
    result = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let num1 = parseFloat(result);
    let num2 = parseFloat(currentInput);
    switch(operator) {
        case '+':
            currentInput = num1 + num2;
            break;
        case '-':
            currentInput = num1 - num2;
            break;
        case '*':
            currentInput = num1 * num2;
            break;
        case '/':
            currentInput = num1 / num2;
            break;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    result = '';
    operator = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}
