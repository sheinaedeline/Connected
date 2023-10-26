'use client';
import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

// Define the initial state
const initialState = {
  accountId: null,
};

// Define actions (for setting account ID, etc.)
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_ID':
      return { ...state, accountId: action.payload };
    default:
      return state;
  }
};

// Create a context provider
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for using the user data
export function useUserData() {
  return useContext(UserContext);
}
