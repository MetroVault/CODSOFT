const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let calculation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            calculation = '';
            display.value = '';
        } else if (value === '=') {
            try {
                // Replace '×' and '÷' with '*' and '/' for eval()
                const evalString = calculation.replace(/×/g, '*').replace(/÷/g, '/');
                display.value = eval(evalString);
                calculation = display.value.toString();
            } catch (error) {
                display.value = 'Error';
                calculation = '';
            }
        } else if (value === '←') {
            // Remove the last character from the calculation
            calculation = calculation.slice(0, -1);
            display.value = calculation;
        } else if (value === '²') {
            // Square the last number
            let lastNumberMatch = calculation.match(/(\d+\.?\d*)$/);
            if (lastNumberMatch) {
                let lastNumber = lastNumberMatch[0];
                calculation = calculation.replace(/(\d+\.?\d*)$/, `(${lastNumber}**2)`);
            }
        } else {
            calculation += value;
        }

        display.value = calculation;
    });
});
