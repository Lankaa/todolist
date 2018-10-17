import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem'
import uuid from 'uuid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

const mapStateToProps = state => {
    return { items: state.todo.items };
};

TodoList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        completed: PropTypes.bool
        })
    )
  };

export default connect(mapStateToProps)(TodoList);