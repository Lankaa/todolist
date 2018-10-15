import React from 'react';
import './TodoItem.css'


class TodoItem extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            value: this.props.item.title,
            isEditActive: false,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleClick() {
        const {isEditActive, value} = this.state;
        const {edit, item} = this.props;

        if (isEditActive) {
            edit(item.id, value);
        }

        this.setState(state => ({
            isEditActive: !state.isEditActive,
        }));
    }

    render() {
        return (
                <li 
                    className={this.props.item.completed ? 'todo__item completed' : 'todo__item'} 
                    onClick={(e) => this.props.complete(this.props.item, e)}
                >
                    { !this.state.isEditActive ?
                        this.props.item.title
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
                    <div className='remove' onClick={(e) => this.props.remove(this.props.item.id, e)}> &#x2715; </div>
                </li>
        )
    }
}

export default TodoItem;