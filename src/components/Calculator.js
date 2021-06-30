import React from 'react';
import Button from './Button';
import NumberPad from './NumberPad';
import CalculatorDisplay from './CalculatorDisplay';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateExpression,
	updateDisplay,
	updateSecondNumber,
	updateOperator,
	updateFirstNumber,
	updateResult,
	clear,
	retype,
	setUpdatingNum2
} from '../redux/calculatorSlice';

const calculate = (n1, n2, operator) => {
	const first = Number(n1),
		second = Number(n2);
	switch (operator) {
		case '+':
			return first + second;
		case '-':
			return first - second;
		case '*':
			return first * second;
		case '/':
			return first / second;
		default:
			return;
	}
};

//Creates expression string based off the
//things that had been passed as arguments

const getExpression = (first, operator, second) => {
	if (second != null && operator) {
		return `${first} ${operator} ${second} =`;
	} else if (operator) {
		return `${first} ${operator} `;
	} else {
		return `${first} =`;
	}
};

const isUndefined = (thing) => {
	return typeof thing === 'undefined';
};

function Calculator() {
	const { firstNumber, secondNumber, display, operator, history } = useSelector((state) => state.calculator);
	const dispatch = useDispatch();

	const handleOperator = (value) => {
		// This checks if we are adding the //
		//first number in the calculator so it
		//can add operator when needed and not when there is no first number
		if (display && isUndefined(firstNumber)) {
			console.log(updateDisplay().type);
			dispatch(updateFirstNumber(display));
			dispatch(updateOperator(value));
			const expr = getExpression(display, value);
			dispatch(updateExpression(expr));
		} else if (!isUndefined(firstNumber) && !isUndefined(secondNumber)) {
			// This checks if we have full expression and we want
			//to work with the result as new number and it sets the first
			//number equeal to the current result
			dispatch(retype(display));
			dispatch(updateFirstNumber(display));
			dispatch(updateOperator(value));
			dispatch(updateExpression(getExpression(display, value)));
		}
	};

	const handleEquals = (value) => {
		// This sets the end result of the equation to the first
		//number because there are no operators and the second
		//number is impossible to have
		if (display && !operator) {
			dispatch(updateDisplay(display));
			const expr = getExpression(display, null, null);
			dispatch(updateExpression(expr));
			dispatch(updateResult(Number(display)));
			// This updates the final result and the second number
		} else if (!isUndefined(firstNumber) && operator && display && isUndefined(secondNumber)) {
			dispatch(updateSecondNumber(display));
			const result = calculate(firstNumber, display, operator);
			dispatch(updateDisplay(result));
			dispatch(updateResult(result));
			const expr = getExpression(firstNumber, operator, display);
			dispatch(updateExpression(expr));

			//This sets the value of the first number to be equal
			//to the result and then uses it to operate with the
			//second number to create new result aka result += secondNumber
		} else if (!isUndefined(firstNumber) && !isUndefined(secondNumber)) {
			dispatch(updateFirstNumber(display));
			const result = calculate(display, secondNumber, operator);
			dispatch(updateDisplay(result));
			dispatch(updateResult(result));
			dispatch(updateExpression(getExpression(display, operator, secondNumber)));
		}
		// Adding to the history
		dispatch(setUpdatingNum2(false));
	};

	const handleClear = (value) => {
		dispatch(clear());
	};

	return (
		<div className="calculator">
			<div>
				<CalculatorDisplay />
				<div className="keyboard">
					<div className="head">
						<Button content={'CA'} id={'clear'} classes="btn-clear" handleClick={handleClear} />
						<Button content={'*'} id={'multiply'} handleClick={handleOperator} classes="btn-operator" />
						<Button content={'/'} id={'subtract'} handleClick={handleOperator} classes="btn-operator" />
					</div>
					<NumberPad />
					<div className="side">
						<Button content={'+'} id={'add'} handleClick={handleOperator} classes="btn-operator" />
						<Button content={'-'} id={'devide'} handleClick={handleOperator} classes="btn-operator" />
						<Button content={'='} id={'equals'} handleClick={handleEquals} classes={'btn-equals'} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Calculator;
