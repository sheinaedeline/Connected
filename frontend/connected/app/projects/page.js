'use client';
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { trendingProjects } from '/public/data.js';
import trading from "assets/Trading Background.png";
import Footer from '/components/Footer.js';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8'];

export default function ProfessionalHome() {

    const [searchInput, setSearchInput] = useState("");
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        console.log(searchInput);
    };

    const slideLeft = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft - 500;
      };
  
    const slideRight = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    function Filter() {
        const [selectedOptions, setSelectedOptions] = useState([]);
        const [showFilter, setShowFilter] = useState(false);
      
        const handleCheckboxChange = (option) => {
            setSelectedOptions(prevState => {
                if(prevState.includes(option)) {
                    return prevState.filter(opt => opt !== option);
                } else {
                    return [...prevState, option];
                }
            });
        };
      
        return (
            <div>
                <button 
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" 
                onClick={() => setShowFilter(!showFilter)}>
                    Toggle Filter
                </button>
                {showFilter && (
                    <div 
                    className="ml-2 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <h2>Filter</h2>
                        {options.map((option, index) => (
                            <div key={index}>
                                <input 
                                    type="checkbox" 
                                    id={`option-${index}`} 
                                    name={`option-${index}`} 
                                    value={option}
                                    onChange={() => handleCheckboxChange(option)}
                                />
                                <label htmlFor={`option-${index}`}>{option}</label>
                            </div>
                        ))}
                        {/* <h2>Selected Options</h2>
                        {selectedOptions.map((option, index) => (
                            <p key={index}>{option}</p>
                        ))} */}
                    </div>
                )}
            </div>
        );
      }


    return (
        <div className="bg-white dark:bg-black">
            <div className="flex justify-between">
                <Link href="/">
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
                    {/* My Projects */}
                    <Link href="/projects">
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
                    <Link href="/professional/profile">
                        <Image
                            src={profile}
                            width={38}
                            alt="connected logo"
                        />
                    </Link>
                </div>
            </div>

            <div className="flex flex-col justify-center px-32">
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Trending{' '}
                      <a href="/projects" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
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
                <Filter />
                  <div className="grid grid-cols-4 gap-x-10">
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
                </div>
            </div>
            <Footer/>
        </div>
    )
}
