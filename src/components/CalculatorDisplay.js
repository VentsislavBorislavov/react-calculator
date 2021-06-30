import React from 'react';
import { useSelector } from 'react-redux';

function CalculatorDisplay() {
	const { expression, display } = useSelector((state) => state.calculator);

	return (
		<div id="display">
			<span className="expression">{expression}</span>
			<span className="current-number">{display}</span>
		</div>
	);
}

export default CalculatorDisplay;
