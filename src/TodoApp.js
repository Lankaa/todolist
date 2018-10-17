import React from 'react';
import './TodoApp.css';
import TodoList from './TodoList'
import { connect } from 'react-redux'
import { addToDo } from './actions/actions'

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

	render() {
		return (
			<div className='todo'>
				<h2>To Do List</h2>
				<div className='header'>
					<input 
							className='input' 
							value={this.state.value} 
							onChange={this.handleChange}
							placeholder='Input to do'
					/>

					<button className='add_btn' onClick={this.add}>Add</button>
				</div>
				
				 <TodoList /> 
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
    return {
      addTodo: item => dispatch(addToDo(item))
    };
};

export default connect(null, mapDispatchToProps)(TodoApp);