import React from 'react';
import './TodoItem.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { removeToDo, editToDo, toggleCompleteToDo } from './actions/actions'

class TodoItem extends React.Component {
    state = {
        value: this.props.item.title,
        isEditActive: false,
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    handleClick = () => {
        const {isEditActive, value} = this.state;

        if (isEditActive) {
            this.props.editTodo(this.props.item.id, value);
        }

        this.setState(state => ({
            isEditActive: !state.isEditActive,
        }));
    }

    toggleComplete = (e) => {
        if (e.target.tagName === 'LI') {
            this.props.toggleCompleteTodo(this.props.item.id);
        }
    }

    remove = () => {
        this.props.removeTodo(this.props.item.id);
    }

    render() {
        const {title, completed} = this.props.item;

        return (
                <li 
                    className={completed ? 'todo__item completed' : 'todo__item'} 
                    onClick={this.toggleComplete}
                >
                    { !this.state.isEditActive ?
                        title
                    : null}

                    {this.state.isEditActive ?
                        <input 
                            className='input__edit' 
                            type='text' 
                            value={this.state.value} 
                            onChange={this.handleChange}
                        />
                    : null}

                    <div 
                        className='edit' 
                        onClick={this.handleClick}
                    > 
                        &#x2710;
                    </div>
                    <div className='remove' onClick={this.remove}> &#x2715; </div>
                </li>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      removeTodo: id => dispatch(removeToDo(id)),
      editTodo: (id, title) => dispatch(editToDo(id, title)),
      toggleCompleteTodo: id => dispatch(toggleCompleteToDo(id))
    };
};

TodoItem.propTypes = {
    removeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    toggleCompleteTodo: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(TodoItem);