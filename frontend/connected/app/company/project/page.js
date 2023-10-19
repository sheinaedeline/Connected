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
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { trendingProjects, trendingProfessionals } from '/public/data.js';
import trading from "assets/Trading Background.png";

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
          <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                  Planned{' '}
              <a href="/company/project/planned" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                  Projects
              </a>
          </h2>
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
        <br></br>
 
        <div className="relative flex items-center">
          <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
            <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {trendingProjects.map((item) => (
                        <a key={item.id} href={item.href} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              width={300}
                              height={200}
                              className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.name}</p>
                            <p className="col-span-2 text-xs italic text-gray-600">{item.startDate} - {item.endDate}</p>
                            <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">${item.price}</p>
                            <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
                  </div>

                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                  Ongoing {' '}
              <a href="/company/project/current" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                  Projects
              </a>
          </h2>
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
        <br></br>
 
        <div className="relative flex items-center">
          <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
            <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {trendingProjects.map((item) => (
                        <a key={item.id} href={item.href} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              width={300}
                              height={200}
                              className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.name}</p>
                            <p className="col-span-2 text-xs italic text-gray-600">{item.startDate} - {item.endDate}</p>
                            <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">${item.price}</p>
                            <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
                  </div>

                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                  Past {' '}
              <a href="/company/project/old" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                  Projects
              </a>
          </h2>
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
        <br></br>
 
        <div className="relative flex items-center">
          <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
            <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {trendingProjects.map((item) => (
                        <a key={item.id} href={item.href} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              width={300}
                              height={200}
                              className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.name}</p>
                            <p className="col-span-2 text-xs italic text-gray-600">{item.startDate} - {item.endDate}</p>
                            <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">${item.price}</p>
                            <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
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
