import React, { useState, useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';
const ADD_GRUDGE = 'ADD_GRUDGE';
const FORGIVE_GRUDGE = 'FORGIVE_GRUDGE';

const Application = () => {
  // const [grudges, setGrudges] = useState(initialState);
  const reducer = (state, action) => {
    if (action.type === ADD_GRUDGE) {
      return [action.payload, ...state];
    }
    if (action.type === FORGIVE_GRUDGE) {
      return state.map(grudge => {
        if (grudge.id === action.payload.id) {
          return { ...grudge, forgiven: !grudge.forgiven }
        }
        return grudge;
      })
    }
    return state;
  }

  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(({person, reason}) => {
    dispatch({
      type: ADD_GRUDGE,
      payload: {
        id: id(),
        forgiven: false,
        person,
        reason
      }
    });
  }, [dispatch]);

  const toggleForgiveness = useCallback(id => {
    dispatch({
      type: FORGIVE_GRUDGE,
      payload: {
        id
      }
    });
  }, [dispatch]);

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
