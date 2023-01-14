import { useRef, useState } from "react";

enum Operators {
    add, substract, multiply, divide
}

export const useCalculator = () => {

    const [number, setNumber] = useState('0');
    const [lastNumber, setLastNumber] = useState('0');

    const lastOperation = useRef<Operators>();

    const clean = () => {
        setNumber('0');
        setLastNumber('0');
    }

    const buildNumber = (textNumber: string) => {
        // Do not accept double number
        if (number.includes('.') && textNumber === '.') {
            return;
        }

        if (number.startsWith('0') || number.startsWith('-0')) {
            // decimal dot
            if (textNumber === '.') {
                setNumber(number + textNumber);

                // Evaluate if it is another zero, and there is a dot
            } else if (textNumber === '0' && number.includes('.')) {
                setNumber(number + textNumber);

                // Evaluate if it is diferent to zero and haven't a dot
            } else if (textNumber !== '0' && !number.includes('.')) {
                setNumber(textNumber);

                // Avoid 0000.00
            } else if (textNumber === '0' && !number.includes('.')) {
                setNumber(number);
            } else {
                setNumber(number + textNumber);
            }
        } else {
            setNumber(number + textNumber);
        }

    }

    const positiveNegative = () => {
        if (number.includes('-')) {
            setNumber(number.replace('-', ''));
        } else {
            setNumber('-' + number)
        }
    }

    const deleteNumber = () => {
        if (number.length === 2 && number.startsWith('-')) {
            setNumber('0'); 
        } else if (number.length === 1) {
            setNumber('0');
        } else {
            setNumber(number.slice(0, -1));
        }
    }

    const replaceNumByLast = () => {
        if (number.endsWith('.')) {
            setLastNumber(number.slice(0, -1));
        } else {
            setLastNumber(number);
        }
        setNumber('0');
    }

    const btnDivide = () => {
        replaceNumByLast();
        lastOperation.current = Operators.divide;
    }
    const btnMultiply = () => {
        replaceNumByLast();
        lastOperation.current = Operators.multiply;
    }
    const btnAdd = () => {
        replaceNumByLast();
        lastOperation.current = Operators.add;
    }
    const btnSubstract = () => {
        replaceNumByLast();
        lastOperation.current = Operators.substract;
    }

    const calculate = () => {
        const num1 = Number(number);
        const num2 = Number(lastNumber);

        switch (lastOperation.current) {
            case Operators.add:
                setNumber(`${num1 + num2}`);
                break;

            case Operators.substract:
                setNumber(`${num2 - num1}`);
                break;

            case Operators.multiply:
                setNumber(`${num1 * num2}`);
                break;

            case Operators.divide:
                setNumber(`${num2 / num1}`);
                break;
                
        }

        setLastNumber('0');

    }

    return {
        lastNumber,
        number,
        btnAdd,
        btnSubstract,
        btnMultiply,
        btnDivide,
        calculate,
        clean,
        buildNumber,
        positiveNegative,
        deleteNumber,
    }
}