let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const display = document.getElementById('display')
const previousDisplay = document.getElementById('previousDisplay')
const numberBtns = document.querySelectorAll('[number]')
const operatorBtns = document.querySelectorAll('[operator]')
const clearBtn = document.getElementById('clearBtn')
const deleteBtn = document.getElementById('deleteBtn')
const equalsBtn = document.getElementById('equalsBtn')
const decimalBtn = document.getElementById('decimalBtn')

numberBtns.forEach((button) => 
    button.addEventListener('click', () => appendNumber(button.textContent))
)
operatorBtns.forEach((button) =>
    button.addEventListener('click', () => appendOperation(button.textContent))
)
clearBtn.addEventListener('click', clearText)
deleteBtn.addEventListener('click', deleteText)
equalsBtn.addEventListener('click', evaluate)
decimalBtn.addEventListener('click', appendDecimal)

function appendNumber(content) {
    if (display.textContent === '0' || shouldResetScreen)
        resetScreen()
    display.textContent += content
}

function appendOperation(operator) {
    if (currentOperation !== null)
        evaluate()
        firstOperand = display.textContent
        currentOperation = operator
        previousDisplay.textContent = `${firstOperand} ${currentOperation}`
        shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen)
        return
    if (currentOperation === '/' && display.textContent === '0') {
        alert("You can't divide by 0!")
        return
    }
    secondOperand = display.textContent
    display.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
    previousDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function appendDecimal() {
    if (shouldResetScreen)
        resetScreen()
    if (display.textContent === '')
        display.textContent = '0'
    if (display.textContent.includes('.'))
        return
    display.textContent += '.'
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function clearText() {
    display.textContent = '0'
    previousDisplay.textContent =''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function deleteText() {
    display.textContent = display.textContent.toString().slice(0, -1)
}

function resetScreen() {
    display.textContent = ''
    shouldResetScreen = false
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}   

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            if (b === 0)
                return null
            else 
                return divide(a, b)
        default:
            return null
    }
}