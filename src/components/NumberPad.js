import React from 'react';
import Button from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateDisplay, retype, setUpdatingNum2 } from '../redux/calculatorSlice';

function NumberPad() {
	const dispatch = useDispatch();
	const { display, firstNumber, secondNumber, result, updatingNum2 } = useSelector((state) => state.calculator);
	const handleClick = (value) => {
		if (!display) {
			dispatch(updateDisplay(value === '.' ? '0.' : value));
		} else if (typeof result === 'number') {
			dispatch(retype(value));
		} else if (firstNumber && !updatingNum2) {
			dispatch(setUpdatingNum2(true));
			dispatch(updateDisplay(value));
		} else if (display) {
			const newDisplayValue = display + value === '00' ? 0 : display + value;
			dispatch(updateDisplay(newDisplayValue));
		}
	};

	const changeSign = (value) => {
		if (secondNumber && display) {
			dispatch(retype(Number(display) * -1));
		} else if (firstNumber && display) {
			dispatch(updateDisplay(Number(display) * -1));
		} else if (display) {
			dispatch(retype(Number(display) * -1));
		}
	};

	const renderNumpadButtons = (value, id, click = handleClick, classes = '') => {
		return <Button content={value} id={id} handleClick={click} classes={classes} />;
	};
	return (
		<div className="number-pad">
			{renderNumpadButtons('7', 'seven')}
			{renderNumpadButtons('8', 'eight')}
			{renderNumpadButtons('9', 'nine')}
			{renderNumpadButtons('4', 'four')}
			{renderNumpadButtons('5', 'five')}
			{renderNumpadButtons('6', 'six')}
			{renderNumpadButtons('1', 'one')}
			{renderNumpadButtons('2', 'two')}
			{renderNumpadButtons('3', 'three')}
			{renderNumpadButtons('+/-', 'change', changeSign, 'btn-change-sign')}
			{renderNumpadButtons('0', 'zero')}
			{renderNumpadButtons('.', 'decimal', handleClick, 'btn-decimal')}
		</div>
	);
}

export default NumberPad;
