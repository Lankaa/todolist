import React from 'react';
import './TodoApp.css';
import TodoList from './TodoList'
import uuid from 'uuid' 
import { connect } from 'react-redux'

class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			items: [{id: uuid(), title: 'ARRR', completed: false}],
		}

	this.add = this.add.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.handleChildRemove = this.handleChildRemove.bind(this);
	this.handleChildComplete = this.handleChildComplete.bind(this);
	this.handleChildEdit = this.handleChildEdit.bind(this);
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	handleChildEdit(id, title) {
		this.setState({
			items: this.state.items.map(item => item.id === id
				? ({...item, title})
				: item
			)
		})
	}

	handleChildRemove(removeId) {
		this.setState(prevState => {
			const items = prevState.items.filter(item => item.id !== removeId);
			return {items};
		})
	}

	handleChildComplete(itemCurrent, e) {

		if (e.target.tagName === 'LI') {

			this.setState({
				items: this.state.items.map(item => item.id === itemCurrent.id ? 
					{title: itemCurrent.title, completed: !itemCurrent.completed, id: itemCurrent.id} : item
				)
			})
		}
	}

	add(e) {
		// let itemsLength = this.state.items.length;

		if (this.state.value.length !== 0) {
			this.setState({
					value: '',
					items: [ ...this.state.items, {id: uuid(), title: this.state.value, completed: false} ]
				})
		}

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
				
				 <TodoList 
						 items={this.state.items} 
						 remove={this.handleChildRemove} 
						 edit={this.handleChildEdit}
						 complete={this.handleChildComplete}
				/> 
			</div>
		)
	}
}

export default TodoApp;