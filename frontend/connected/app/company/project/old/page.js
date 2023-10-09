'use client';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import { AiOutlinePlus, AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';
import Footer from '/components/Footer.js';

export default function page() {
  
  const [searchInput, setSearchInput] = useState("");
    
  const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
  };

  const handleSearch = () => {
      console.log(searchInput);
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="flex justify-between">
        <Link href="/company">
            <Image
                src={logo}
                width={150}
                alt="connected logo"
            />
        </Link>
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
                    className="block w-full rounded-l-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                </input>
                <button
                    type="submit"
                    className="flex justify-center items-center rounded-r-lg bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
            <Link href="/company/post">
                <button
                    type="submit"
                    className="flex gap-1 justify-center items-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <AiOutlinePlus/> 
                    <div>Create new project</div>
                </button>
            </Link> 
            {/* My Projects */}
            <Link href="/company/project">
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    My Projects
                </button>
            </Link> 
            {/* Logout */}
            <Link href="/">
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Logout
                </button>
            </Link> 
            {/* Profile Icon */}
            <Link href="/company/profile">
                <Image
                    src={profile}
                    width={38}
                    alt="connected logo"
                />
            </Link>
        </div>
      </div>
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
                ConnectEd
          </h1> 

          <br>
          </br>
          <div className="w-full pb-5 mx-auto text-left md:w-11/12">
            <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                Project 1
            </h1>
            <div className="max-w-xs bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                      2023-10-09 to 2023-10-10
                </h1>
            </div>
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                      Project
                      <br>
                      </br>
                      Description 
                </h1>
            </div>

            <br></br>

            <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                Professional
            </h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link1">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">Professional 1</p>
                      <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link2">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 2</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link3">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 3</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 4</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link5">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 5</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 6</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>
            </div>

            
  
          </div>
        </div>

        
        {/* <div
          style={{ backgroundImage: "url(/images/blur.png)" }}
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat bg-cover -z-1"
        /> */}
        <Footer/>
      </section>
    </div>
  );
}
