document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    let currentInput = '';
    let operator = '';
    let firstOperand = '';

 
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            handleButtonClick(e.target.dataset.value);
        });
    });

   
    clearButton.addEventListener('click', () => {
        clearCalculator();
    });

    equalsButton.addEventListener('click', () => {
        calculateResult();
    });

    function handleButtonClick(value) {
        if (value === undefined) return;

        if (isOperator(value)) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    }

    function handleNumber(value) {
       
        if (value === '.' && currentInput.includes('.')) return;

        currentInput += value;
        display.textContent = currentInput;
    }

    function handleOperator(value) {
        if (currentInput === '' && value !== '-') return; 

        if (firstOperand === '') {
            firstOperand = currentInput;
        } else if (operator) {
            firstOperand = operate(firstOperand, currentInput, operator);
            display.textContent = firstOperand;
        }

        operator = value;
        currentInput = '';
    }

    function calculateResult() {
        if (firstOperand === '' || currentInput === '' || operator === '') return;

        display.textContent = operate(firstOperand, currentInput, operator);
        currentInput = '';
        operator = '';
        firstOperand = '';
    }

    function clearCalculator() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        display.textContent = '0';
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function operate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': 
                if (b === 0) {
                    return 'Error'; 
                }
                return (a / b).toString();
            default: return b.toString();
        }
    }
});
