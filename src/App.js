import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from "./routers/HtmlRouters";
import 'normalize-css/normalize.css'
import './styles/styles.scss';
import configureStore from "./store/configureStore";
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from './selectors/expenses'

const store = configureStore();

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
	description: 'Water Bill',
	amount: 100,
	createdAt: 1000
}));

const expenseTwo = store.dispatch(addExpense({
	description: 'Gas Bill',
	amount: 1000,
	createdAt: -1000
}));

store.dispatch(setTextFilter('bill'));
store.dispatch(setTextFilter('water'));



ReactDOM.render(<AppRouter/>, document.getElementById("app"))
