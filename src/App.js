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

const EditExpensePage = () => (
	<div>
		This is my edit expense page
	</div>
);

const HelpPage = () => (
	<div>
		This is my help page
	</div>
);


const routes = (
    <BrowserRouter>
	    <Route path="/" component={ExpenseDashboardPage} exact={true}/>
	    <Route path="/create" component={AddExpensePage} ></Route>
		<Route path="/edit" component={EditExpensePage} ></Route>
		<Route path="/help" component={HelpPage} ></Route>
    </BrowserRouter>

);

ReactDOM.render(routes, document.getElementById("app"))
