class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '^':
                computation = Math.pow(prev, current)
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    scientificFunction(func) {
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return

        switch (func) {
            case 'sin':
                this.currentOperand = Math.sin(current * Math.PI / 180)
                break
            case 'cos':
                this.currentOperand = Math.cos(current * Math.PI / 180)
                break
            case 'tan':
                this.currentOperand = Math.tan(current * Math.PI / 180)
                break
            case '√':
                this.currentOperand = Math.sqrt(current)
                break
            case 'log':
                this.currentOperand = Math.log10(current)
                break
            case 'ln':
                this.currentOperand = Math.log(current)
                break
            case '!':
                this.currentOperand = this.factorial(current)
                break
            case 'π':
                this.currentOperand = Math.PI
                break
            case 'e':
                this.currentOperand = Math.E
                break
            case '(':
                this.currentOperand = this.currentOperand.toString() + '('
                break
            case ')':
                this.currentOperand = this.currentOperand.toString() + ')'
                break
        }
    }

    factorial(n) {
        if (n < 0) return NaN
        if (n === 0 || n === 1) return 1
        let result = 1
        for (let i = 2; i <= n; i++) {
            result *= i
        }
        return result
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-action="calculate"]')
const deleteButton = document.querySelector('[data-action="delete"]')
const allClearButton = document.querySelector('[data-action="clear"]')
const scientificButtons = document.querySelectorAll('[data-scientific]')
const previousOperandTextElement = document.getElementById('previous-operand')
const currentOperandTextElement = document.getElementById('current-operand')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

scientificButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.scientificFunction(button.innerText)
        calculator.updateDisplay()
    })
})

// Manejo de teclado
document.addEventListener('keydown', (e) => {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(
            e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key
        )
        calculator.updateDisplay()
    } else if (e.key === 'Enter' || e.key === '=') {
        calculator.compute()
        calculator.updateDisplay()
    } else if (e.key === 'Backspace') {
        calculator.delete()
        calculator.updateDisplay()
    } else if (e.key === 'Escape') {
        calculator.clear()
        calculator.updateDisplay()
    }
})