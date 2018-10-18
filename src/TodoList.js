import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem'
import uuid from 'uuid'

class TodoList extends React.Component {
    render() {
        return (
            <ul className='todo__list'>
            {this.props.items.map(item => <TodoItem
                key={uuid()}
                item={item}
            />)}
    </ul>
        )
    }
}
export default TodoList;