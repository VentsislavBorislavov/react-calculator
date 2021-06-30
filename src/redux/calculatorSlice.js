import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	firstNumber: undefined,
	secondNumber: undefined,
	display: 0,
	result: undefined,
	expression: '',
	operator: '',
	updatingNum2: false
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState,
	reducers: {
		updateDisplay: (state, action) => {
			state.display = action.payload;
		},
		updateResult: (state, action) => {
			state.result = action.payload;
		},
		updateFirstNumber: (state, action) => {
			state.firstNumber = action.payload;
		},
		updateSecondNumber: (state, action) => {
			state.secondNumber = action.payload;
		},
		updateOperator: (state, action) => {
			state.operator = action.payload;
		},
		updateExpression: (state, action) => {
			state.expression = action.payload;
		},
		setUpdatingNum2: (state, action) => {
			state.updatingNum2 = action.payload;
		},
		clear: (state) => {
			return Object.assign({}, initialState, { history: state.history });
		},
		retype: (state, action) => {
			return Object.assign({}, initialState, { history: state.history, display: action.payload });
		}
	}
});

export const {
	updateDisplay,
	updateFirstNumber,
	updateSecondNumber,
	updateResult,
	updateOperator,
	updateExpression,
	clear,
	setUpdatingNum2,
	retype
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
