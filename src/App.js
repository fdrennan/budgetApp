import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import 'normalize-css/normalize.css'
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
	<div>
		This is from my dashboard component
	</div>
);

const AddExpensePage = () => (
	<div>
		This is my add expense component
	</div>
);


const routes = (
    <BrowserRouter>
	    <Route path="/" component={ExpenseDashboardPage} exact={true}/>
	    <Route path="/create" component={AddExpensePage}></Route>
    </BrowserRouter>

);

ReactDOM.render(routes, document.getElementById("app"))
