// 'use client';
// import React, { createContext, useState } from 'react';

// export const UserContext = createContext({
//     loggedIn: false,
//     hideRight: true,
//     accountId: null,
//     userType: null,
//     jwtToken: null,
//     profileLink: null,
//     projectLink: null
// });

// export const UserContextProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [hideRight, setHideRight] = useState(true);
//   const [accountId, setAccountId] = useState('');
//   const [userType, setUserType] = useState('');
//   const [jwtToken, setJwtToken] = useState('');
//   const [profileLink, setProfileLink] = useState('');
//   const [projectLink, setProjectLink] = useState('');

//   const store = {
//     loggedIn: [loggedIn, setLoggedIn],
//     hideRight: [hideRight, setHideRight],
//     accountId: [accountId, setAccountId],
//     userType: [userType, setUserType],
//     jwtToken: [jwtToken, setJwtToken],
//     profileLink: [profileLink, setProfileLink],
//     projectLink: [projectLink, setProjectLink]
//   }

//   return <UserContext.Provider value={store}>{children}</UserContext.Provider>
// }

// export default UserContext;