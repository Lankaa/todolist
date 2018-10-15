import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

ReactDOM.render(<TodoApp />, document.getElementById('root'));
