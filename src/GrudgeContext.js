import React, {
  useCallback,
  useReducer,
  createContext
} from 'react';

import initialState from './initialState';
import id from 'uuid/v4';
const ADD_GRUDGE = 'ADD_GRUDGE';
const FORGIVE_GRUDGE = 'FORGIVE_GRUDGE';
export const GrudgeContext = createContext();

const GrudgeProvider = ({ children }) => {

    const reducer = (state, action) => {
        if (action.type === ADD_GRUDGE) {
            return [action.payload, ...state];
        }
        if (action.type === FORGIVE_GRUDGE) {
            return state.map((grudge) => {
                if (grudge.id === action.payload.id) {
                    return {
                        ...grudge,
                        forgiven: !grudge.forgiven
                    };
                }
                return grudge;
            });
        }
        return state;
    };
    const [grudges, dispatch] = useReducer(reducer, initialState);

    const addGrudge = ({ person, reason }) => {
        dispatch({
            type: ADD_GRUDGE,
            payload: {
            id: id(),
            forgiven: false,
            person,
            reason
            }
        })
        };

    const toggleForgiveness = (id) => {
        dispatch({
            type: FORGIVE_GRUDGE,
            payload: {
            id
            }
        });
        };

    const value = { addGrudge, toggleForgiveness, grudges };

    return (
        <GrudgeContext.Provider value={value}>
            {children}
        </GrudgeContext.Provider>
    );
};

export default GrudgeProvider;
