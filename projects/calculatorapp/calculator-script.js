// Get all necessary elements
const finalResult = document.querySelector('.final-result input');
const preResult = document.querySelector('.pre-result input');
const buttons = document.querySelectorAll('button');

// Variables to hold the current expression and result
let currentExpression = '';
let previousResult = '';
let openParenthesesCount = 0; // Track unmatched opening parentheses

// Function to update the display
function updateDisplay() {
    finalResult.value = currentExpression || '0'; // Display current expression
    preResult.value = previousResult; // Display live result or evaluation
}

// Function to evaluate an expression safely
function evaluateExpression(expression) {
    try {
        return eval(expression).toString(); // Safely evaluate
    } catch (err) {
        return ''; // Return empty if invalid
    }
}

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');

        if (value === 'clear') {
            // Clear everything
            currentExpression = '';
            previousResult = '';
            openParenthesesCount = 0; // Reset parentheses count
            updateDisplay();
        } else if (value === 'backspace') {
            // Remove the last character
            const lastChar = currentExpression.slice(-1);
            if (lastChar === '(') {
                openParenthesesCount--; // Adjust parentheses count
            } else if (lastChar === ')') {
                openParenthesesCount++;
            }
            currentExpression = currentExpression.slice(0, -1);
            previousResult = evaluateExpression(currentExpression); // Update live result
            updateDisplay();
        } else if (value === '()') {
            // Handle parentheses insertion
            if (openParenthesesCount === 0 || ['+', '-', '*', '/', '('].includes(currentExpression.slice(-1))) {
                // Add opening parenthesis if start or after an operator
                currentExpression += '(';
                openParenthesesCount++;
            } else if (openParenthesesCount > 0 && !['+', '-', '*', '/', '('].includes(currentExpression.slice(-1))) {
                // Add closing parenthesis if valid
                currentExpression += ')';
                openParenthesesCount--;
            }
            previousResult = evaluateExpression(currentExpression); // Update live result
            updateDisplay();
        } else if (value === '=') {
            // Final evaluation of the expression
            try {
                previousResult = evaluateExpression(currentExpression); // Evaluate the expression
                currentExpression = previousResult; // Update display with the result
                preResult
                openParenthesesCount = 0; // Reset parentheses count
                updateDisplay();
                finalResult.style.color = "green";
                
            } catch (err) {  
                // Reset on error
                currentExpression = '';
                previousResult = '';
                openParenthesesCount = 0;
                updateDisplay();
            }
        } else if (value === '+/-') {
            // Toggle the sign of the expression
            if (currentExpression && !isNaN(currentExpression)) {
                currentExpression = (parseFloat(currentExpression) * -1).toString();
            }
            updateDisplay();
        } else {
            // Append the value to the current expression
            const lastChar = currentExpression.slice(-1);

            if (['+', '-', '*', '/'].includes(value)) {
                // Prevent consecutive operators
                if (['+', '-', '*', '/'].includes(lastChar)) {
                    currentExpression = currentExpression.slice(0, -1);
                }
            }
            currentExpression += value;

            // Update live result safely
            previousResult = evaluateExpression(currentExpression);
            updateDisplay();
            finalResult.style.color = "black";
        }
    });
});

// Set focus on the final result input
finalResult.focus();
