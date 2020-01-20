import React from 'react';
import {connect} from 'react-redux';
import {setTextFilter} from "../actions/filters";
import {sortByAmount} from "../actions/filters";
import {sortByDate} from "../actions/filters";

const ExpenseListFilters = (props) => (
	<div>
		<input type="text"
		       value={props.filters.text}
		       onChange={(e) => {
		       	props.dispatch(setTextFilter(e.target.value));
		       }}
		/>
		<select value={props.filters.sortBy} onChange={
			(e) => {
				const targetValue = e.target.value;
				if (targetValue === 'date') {
					props.dispatch(sortByDate());
				} else if (targetValue === 'amount') {
					props.dispatch(sortByAmount());
				}
			}
		}>
			<option value="date">Date</option>
			<option value="amount">Amount</option>
		</select>
	</div>
);

const mapStateToProps = (state) => {
	return {
		filters: state.filters
	};
};

export default connect(mapStateToProps)(ExpenseListFilters);