'use client';
import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [userType, setUserType] = useState('');
  const [jwtToken, setJwtToken] = useState('');

  const store = {
    loggedIn: [loggedIn, setLoggedIn],
    accountId: [accountId, setAccountId],
    userType: [userType, setUserType],
    jwtToken: [jwtToken, setJwtToken]
  }

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}

export default UserContextProvider;