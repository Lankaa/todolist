import { 
  ADD_TODO, 
  EDIT_TODO, 
  REMOVE_TODO,
  COMPLETE_TODO, 
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_NOT_COMPLETED} from '../constants/action-types';

import uuid from 'uuid'
import { combineReducers } from "redux";

const initialState = {
  items: [{id: uuid(), title: 'ARRR', completed: false}],
  visability: SHOW_ALL,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
          return  {
            items: [
              ...state.items,
              {
                id: uuid(),
                title: action.title,
                completed: false
              }
            ]
          }
        case REMOVE_TODO:
          return { 
            items: state.items.filter(item => item.id !== action.id)
          }
        case EDIT_TODO:
          return { 
            items: state.items.map(item => item.id === action.id
              ? ({...item, title: action.title})
              : item
            )
          }
        case COMPLETE_TODO:
          return { 
            items: state.items.map(item => item.id === action.id 
              ? {...item, completed: !item.completed} 
              : item
            )
          }
        case SHOW_ALL:
          return {items: state.items};
        case SHOW_COMPLETED:
          return {items: state.items.filter(item => item.completed)};
        case SHOW_NOT_COMPLETED:
          return {items: state.items.filter(item => !item.completed)};
        default:
          return state;
      }
};

export default combineReducers({ todo: rootReducer });