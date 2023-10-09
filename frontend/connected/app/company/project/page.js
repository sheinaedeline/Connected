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

        <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              My Unstarted Projects
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 py-2 px-20 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Filter
          </button>
        </div>
        <br></br>
 
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 p-3 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 1
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
                <div className="w-full md:w-2/6 p-4 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 2
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              My Finished Project
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 py-2 px-20 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Filter
          </button>
        </div>
        <br></br>
 
        <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 p-3 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 1
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
                <div className="w-full md:w-2/6 p-4 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 2
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              My ongoing project
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 py-2 px-20 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Filter
          </button>
        </div>
        <br></br>
 
        <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 p-3 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 1
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
                <div className="w-full md:w-2/6 p-4 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 2
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
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
