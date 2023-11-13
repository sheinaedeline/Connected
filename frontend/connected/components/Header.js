'use client';
import Logo from "./Logo.js";
import { useState, useEffect, useContext } from "react";
import Link from "next/link.js";
import HeaderRight from "./HeaderRight.js";
import { useRouter } from "next/navigation.js";
// import { UserContext } from '../context/UserContext.js';

export default function Header() {
  const router = useRouter();
//   const userCtx = useContext(UserContext);
//   const loggedInState = userCtx.loggedIn[0];
//   const userTypeState = userCtx.userType[0];
//   const hideRight = userCtx.hideRight;
//   console.log("test", hide);

  // Routes to show logo only
  // const routesToHideElements = ['/login', '/register'];
  // const [hide, setHide] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [userType, setUserType] = useState("");
  const [hide, setHide] = useState(false);
  
  
//   Get Login Details
  useEffect(() => {
    const getLogin = localStorage.getItem("loggedUser");
    if (getLogin) {
      const getState = JSON.parse(getLogin);
      setLoginState(true);
      setUserType(getState.userType);
    }
    // setLoginState(userCtx.loggedIn[0]);
    // setUserType(userCtx.userType[0]);
  },[]);

  return (
    <header className="w-full sticky-nav">
      <div className="flex justify-between px-4">
      <Logo login={loginState} userType={userType}/>
        
        {!hide && !loginState &&
          (<div className="flex justify-between items-center gap-4">
            <Link href="/registration">
              <button
                type="submit"
                className="flex w-[80px] justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                Register
              </button>
            </Link>
            <Link href="/login">
              <button
                type="submit"
                className="flex w-[80px] justify-center rounded-md ring-1 ring-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-900 shadow-sm hover:bg-blue-200"
              >
                Login
              </button>
            </Link>
          </div>)
        }
        {!hide && loginState && (<HeaderRight userType={userType}/>)}
      </div>
    </header>
  );
}
