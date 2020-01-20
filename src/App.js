import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
// PERSONAL MADE
import AppRouter from "./routers/HtmlRouters";
import configureStore from "./store/configureStore";
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";
import getVisibleExpenses from './selectors/expenses'
// CSS
import 'normalize-css/normalize.css'
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({
	description: 'Water Bill',
	amount: 100,
	createdAt: 1000
}));

store.dispatch(addExpense({
	description: 'Gas Bill',
	amount: 1000,
	createdAt: -1000
}));

store.dispatch(addExpense({
	description: 'Rent',
	amount: 11234,
	createdAt: 2000
}));


const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
