import { 
  ADD_TODO, 
  EDIT_TODO, 
  REMOVE_TODO,
  COMPLETE_TODO,
  SET_VISABILITY,
  visabilityFilters} from '../constants/action-types';

import uuid from 'uuid'
import { combineReducers } from "redux";

const initialState = {
  items: [{id: uuid(), title: 'ARRR', completed: false}],
  visabilityFilter: visabilityFilters.SHOW_ALL,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
          return  {
            ...state,
            items: [
              ...state.items,
              {
                id: uuid(),
                title: action.title,
                completed: false
              }
            ],
          }
        case REMOVE_TODO:
          return {
            ...state,
            items: state.items.filter(item => item.id !== action.id)
          }
        case EDIT_TODO:
          return { 
            ...state,
            items: state.items.map(item => item.id === action.id
              ? ({...item, title: action.title})
              : item
            )
          }
        case COMPLETE_TODO:
          return { 
            ...state,
            items: state.items.map(item => item.id === action.id 
              ? {...item, completed: !item.completed} 
              : item
            )
          }
        case SET_VISABILITY:
          return {
            ...state,
            visabilityFilter: action.filter
          };
        default:
          return state;
      }
};

export default combineReducers({ todo: rootReducer });