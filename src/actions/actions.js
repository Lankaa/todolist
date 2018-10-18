import { 
    ADD_TODO, 
    EDIT_TODO, 
    REMOVE_TODO, 
    COMPLETE_TODO,
    SET_VISABILITY } from '../constants/action-types';

export const addToDo = title => ({ type: ADD_TODO, title });

export const removeToDo = id => ({ type: REMOVE_TODO, id });

export const editToDo = (id, title) =>  ({ type: EDIT_TODO, id, title });

export const toggleCompleteToDo = id => ({ type: COMPLETE_TODO, id});

export const setVisability = (filter) => ({ type: SET_VISABILITY, filter })