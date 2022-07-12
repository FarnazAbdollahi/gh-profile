import React, { createContext, useReducer } from 'react';

const initialState = {
    profileInfo: null,
    userRepos: null,
};

export const Store = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INFO':
            return { ...state, profileInfo: { ...action.value } }
        case 'SET_REPOS':
            return { ...state, userRepos: [...action.value] }
        case 'SET_REPOS_TO_Null':
            return { ...state, userRepos: null }
        default:
            return state;
    }
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};

export const setInfo = (data, dispatch) => {
    dispatch({
        type: 'SET_INFO',
        value: data,
    })
};
export const setRepos = (data, dispatch) => {
    dispatch({
        type: 'SET_REPOS',
        value: data,
    })
};
export const setReposToNull = (dispatch) => {
    dispatch({
        type: 'SET_REPOS_TO_Null'

    })
};