'use client';
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useUserData } from "context/context";
import { useRouter } from 'next/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';

export default function Header() {
  const { state, dispatch } = useUserData();
  const router = useRouter();
  const { accountId, userType } = state;
  const [logoutState, setLogoutState] = useState(false);
  
  const [mounted, setMounted] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  
  // Search Box
  const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
  };

  // Search Button
  const handleSearch = () => {
      console.log(searchInput);
  };

  // Logo Home Button
  const handleHomeButton = () => {
    if (userType === 'company') {
      router.push('/company');
    } else if (userType === 'professional') {
      router.push('/professional');
    }
  };

  // My Projects Button
  const handleProjectButton = () => {
    if (userType === 'company') {
      router.push('/company/project');
    } else if (userType === 'professional') {
      router.push('/projects');
    }
  };

  // Logo Home Button
  const handleProfileButton = () => {
    // if (userType === 'company') {
    //   router.push('/company/profile');
    // } else if (userType === 'professional') {
    //   router.push('/professional/profile');
    // }
    router.push('/view');
  };

  // Logout Button
  const handleLogoutButton = () => {
    const initialState = {
      accountId: null,
      userType: null,
      jwtToken: null,
    };

    dispatch({ type: 'SET_USER_STATE', payload: initialState});
    router.push('/');
  };

  // useEffect(() => {
  //   const handleLogoutButton = async () => {
  //     const initialState = {
  //       accountId: null,
  //       userType: null,
  //       jwtToken: null,
  //     };
      
  //     try {
  //       const response = await axios.get('http://127.0.0.1:3000/user/logout');

  //       // Dispatch
  //       console.log('Logout Successful', response.data);
  //       dispatch({ type: 'SET_USER_STATE', payload: initialState});
  //       router.push('/');
  //     } catch (error) {
  //       // Handle any errors (e.g., display an error message)
  //       console.error('Logout failed', error);
  //     }
  //   };

  //   handleLogoutButton();
  // }, [logoutState]);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="w-full sticky-nav">
      <div className="flex justify-between">
        {/* Logo  */}
        <Image
            src={logo}
            width={150}
            onClick={handleHomeButton}
            alt="connected logo"
        />
        <div className="flex justify-evenly items-center gap-4">
            {/* Search Bar */}
            <form className="flex" role="search">
                <input
                    id="searchBar"
                    name="searchBar"
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={handleChange}
                    className="block w-[150px] rounded-l-lg border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                </input>
                <button
                    type="submit"
                    className="w-[40px] flex justify-center items-center rounded-r-lg bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={handleSearch}
                >
                  <Image
                      src={search}
                      width={26}
                      alt="connected logo"
                  />
                </button>
            </form>
            {/* Create new project */}
            {userType === 'company' && (
              <div>
              <Link href="/company/post">
                  <button
                      type="submit"
                      className="flex gap-1 justify-center items-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                      <AiOutlinePlus/> 
                      <div>Create new project</div>
                  </button>
              </Link> 
              </div>
            )}
            {/* My Projects */}
            <button
                onClick={handleProjectButton}
                className="flex w-[120px] justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                My Projects
            </button>
            {/* Logout */}
            <button
                type="submit"
                onClick={handleLogoutButton}
                className="flex w-[80px] justify-center rounded-md ring-1 ring-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-900 shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Logout
            </button>
            {/* Profile Icon */}
              <Image
                  src={profile}
                  width={38}
                  onClick={handleProfileButton}
                  alt="connected logo"
              />
        </div>
      </div>
    </header>
  );
}
