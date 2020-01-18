import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

// FUNCTIONS
// ADD EXPENSE

const addExpense = (
	{
		description = '',
		note = '',
		amount = 0,
		createdAt = 0
	} = {}
) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

const removeExpense = ({id} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

// CREATE YOUR REDUCERS
// REDUCER ONE: EXPENSES
const expensesReducerDefaultState = [];

const expensesReducer = (state =  expensesReducerDefaultState, action) => {
	switch (action.type)  {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		case 'REMOVE_EXPENSE':
			return state.filter(({id}) => id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
			if (expense.id === action.id) {
				return {
					...expense,
					...action.updates
				};
			} else {
				return expense;
			};
		});
		default:
			return state
	}
};








// REDUCER TWO: FILTERS

const setTextFilter = (text='') => ({
	type: 'SET_TEXT_FILTER',
	text
});

const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
	type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
});

const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
});

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'amount',
	startDate: undefined,
	endDate: undefined
};

const filtersReducer = (state =  filtersReducerDefaultState, action) => {
	switch (action.type)  {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			};
		default:
			return state
	}
};





// COMBINE YOUR REDUCERS
const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;

	}).sort((a, b) => {
		if (sortBy === 'date' ) {
			return a.createdAt < b.createdAt ? 1 : -1
		} else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1
		}
	});
};

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});



// // TESTING EXPENSE REDUCERS
const expenseOne = store.dispatch(addExpense({
	description: 'Rent',
	amount: 100,
	createdAt: 1000
}));

const expenseTwo = store.dispatch(addExpense({
	description: 'Coffee',
	amount: 1000,
	createdAt: -1000
}));
//
// store.dispatch(removeExpense({
// 	id: expenseOne.expense.id
// }));
//
//
// store.dispatch(editExpense(
// 	expenseTwo.expense.id, {amount: 9300}
// ));
//
// // TESTING FILTER REDUCERS
// store.dispatch(setTextFilter('rent'));
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
//
// store.dispatch(setStartDate(-10000));
// store.dispatch(setEndDate(0));
// store.dispatch(setEndDate(100000));
// store.dispatch(setStartDate());

