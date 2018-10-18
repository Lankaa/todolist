import React from 'react';
import './TodoApp.css';
import TodoList from './TodoList'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToDo, setVisability } from './actions/actions'
import { visabilityFilters } from './constants/action-types'
import { createSelector } from 'reselect'

class TodoApp extends React.Component {
	
	state = {
		value: ''
	}

	handleChange = (e) => {
		this.setState({value: e.target.value});
	}

	add = (e) => {
		if (this.state.value.length !== 0) {
			this.props.addTodo(this.state.value);
			this.setState({value: ''});
		}
		else alert('You must write something at first')

		e.preventDefault();
	}

	showAll = () => this.props.setVisability(visabilityFilters.SHOW_ALL);

	showCompleted = () => this.props.setVisability(visabilityFilters.SHOW_COMPLETED);

	showNotCompleted = () => this.props.setVisability(visabilityFilters.SHOW_NOT_COMPLETED);

	render() {
		return (
			<div className='todo'>
				<h2>To Do List</h2>
				<div className='header'>
					<div className='add-wrapper'>
						<input 
							className='input' 
							value={this.state.value} 
							onChange={this.handleChange}
							placeholder='Input to do'
						/>

					<button className='add_btn' onClick={this.add}>Add</button>
					</div>
					
					<div className='filter-wrapper'>
						<label className='filter'>
							<input 
								type='radio' 
								name='filter'
								onClick={this.showAll}
								defaultChecked />All</label>
						<label className='filter'>
							<input 
								type='radio' 
								name='filter'
								onClick={this.showCompleted} />Completed</label>
						<label className='filter'>
							<input 
								type='radio' 
								name='filter'
								onClick={this.showNotCompleted} /> Not Completed</label>
					</div>
					
				</div>
				
				 <TodoList items={this.props.items} />
				 
			</div>
		)
	}
}

const getVisability = (state) => state.todo.visabilityFilter;
const getTodos = (state) => state.todo.items;

const filter = createSelector(
	[ getVisability, getTodos ],
	(filter, todos) => {
			switch (filter) {
		case visabilityFilters.SHOW_ALL:
		  return todos
		case visabilityFilters.SHOW_COMPLETED:
		  return todos.filter(t => t.completed)
		case visabilityFilters.SHOW_NOT_COMPLETED:
		  return todos.filter(t => !t.completed)
		default: return todos
	  }
	}
)

const mapStateToProps = state => {
    return {
		items: filter(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
	  addTodo: id => dispatch(addToDo(id)),
	  setVisability: filter => dispatch(setVisability(filter))
    };
};

TodoApp.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
        }).isRequired
	).isRequired,
	addTodo: PropTypes.func.isRequired,
	setVisability: PropTypes.func.isRequired
  };

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);