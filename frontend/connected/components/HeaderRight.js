"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from 'next/link';
import profile from "assets/Profile Icon.png";
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

export default function HeaderRight(params) {
    const router = useRouter();
    const userType = params.userType;
    // const [searchInput, setSearchInput] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // // Search Box
    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    // };

    // // Search Button
    // const handleSearch = () => {
    //     console.log(searchInput);
    // };

    // My Projects Button
    const handleProjectButton = () => {
        if (userType === 'company') {
            router.push('/company/project');
        } else if (userType === 'professional') {
            router.push('/professional/project');
        }
    };

    // Logout Button
    const handleLogoutButton = async () => {
        const getUser = localStorage.getItem("loggedUser");
        const state = JSON.parse(getUser);
        try {

            const response = await axios.get('http://127.0.0.1:3000/user/logout',  { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});

            // Dispatch
            console.log('Logout successful', response.data);
            
            localStorage.removeItem("loggedUser");
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('Logout Failed', error);
            alert('Logout failed');
        }
    };

    // Toggle Profile Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <div className="flex justify-evenly items-center gap-4">
            {/* Search Bar */}
            {/* <form className="flex" role="search">
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
                > */}
                  {/* <Image
                      src={search}
                      width={26}
                      alt="connected logo"
                  /> */}
                  {/* <AiOutlineSearch/>
                </button>
            </form> */}

            {/* Create new project */}
            {userType === 'company' && (
              <Link href="/company/post">
                  <button
                      type="submit"
                      className="flex gap-1 justify-center items-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                      <AiOutlinePlus/> 
                      <div>New Project</div>
                  </button>
              </Link> 
            )}

            {/* My Projects */}
            <button
                onClick={handleProjectButton}
                className="flex w-[120px] justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                My Projects
            </button>
            
            {/* Profile Icon */}
            
            <div className="relative ml-3">
                <div>
                    <button id="user-menu-button" aria-expanded={isMenuOpen} onClick={toggleMenu} className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-haspopup="true">
                        <Image src={profile} width={38} height={38} alt="connected logo" className="rounded-full"/>
                    </button>
                </div>

                {/* Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95" */}
                
                {isMenuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                        <Link href="/view" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                        {/* <button onClick={handleProjectButton} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Your Projects</button> */}
                        <Link href="/" onClick={handleLogoutButton} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Logout</Link>
                    </div>
                )}
            </div>
    </div>
    )
};