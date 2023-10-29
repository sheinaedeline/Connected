'use client';
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import { AiOutlinePlus, AiOutlineMail } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import Footer from '/components/Footer.js';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { trendingProjects, trendingProfessionals } from '/public/data.js';
import trading from "assets/Trading Background.png";
import axios from 'axios';
import { useUserData } from "context/context";

const options = ['bizz', 'software3', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8'];

export default function page() {

  const slideLeft = (id) => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = (id) => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [projectList, setProjectList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

    // GET View Profile
  useEffect(() => {
      const viewProfile = async () => {
          const data = { 
              size: 2,
              page: 1
            };

          try {
              const response = await axios.post(`http://127.0.0.1:3000/project/getProjects`, data);
  
              // Dispatch
              console.log('View Profile Successful', response.data);
              setProjectList(response.data.content.projectsList);
              setSecondaryProjectList(response.data.content.projectsList);
              setThirdProjectList(response.data.content.projectsList);
              // Set variable states
              
          } catch (error) {
              // Handle any errors (e.g., display an error message)
              console.error('View Profile failed', error);
          }
     
      };

      viewProfile();
  }, []);

  useEffect(() => {
      setFilteredProjectList(projectList);
  }, [projectList]);

  const [searchInput, setSearchInput] = useState("");
  const [filteredProjectList, setFilteredProjectList] = useState([]);
  
  const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
  };

  const handleSearch = (event) => {
      event.preventDefault(); // Prevent page refresh
  
      if (searchInput.trim() === '') {
          // If search bar is empty, show all projects
          setFilteredProjectList(projectList);
      } else {
          // Filter projects based on search input
          const filteredProjects = projectList.filter(item => item.project_title.toLowerCase().includes(searchInput.toLowerCase()));
  
          // Update filtered project list with filtered projects
          setFilteredProjectList(filteredProjects);
      }
  };
  
  // current
  const [secondaryProjectList, setSecondaryProjectList] = useState([]);
  const [filteredSecondaryProjectList, setFilteredSecondaryProjectList] = useState([]);
  const [secondarySearchInput, setSecondarySearchInput] = useState('');
  const [secondarySelectedOptions, setSecondarySelectedOptions] = useState([]);

  useEffect(() => {
    setFilteredSecondaryProjectList(secondaryProjectList);
  }, [secondaryProjectList]);
  
  const handleSecondaryChange = (event) => {
      setSecondarySearchInput(event.target.value);
  };

  const handleSecondarySearch = (event) => {
    event.preventDefault(); // Prevent page refresh

    if (secondarySearchInput.trim() === '') {
        // If search bar is empty, show all projects
        setFilteredSecondaryProjectList(secondaryProjectList);
    } else {
        // Filter projects based on search input
        const filteredProjects = secondaryProjectList.filter(item => item.project_title.toLowerCase().includes(secondarySearchInput.toLowerCase()));

        // Update filtered project list with filtered projects
        setFilteredSecondaryProjectList(filteredProjects);
    }
  };

  // old
  const [thirdProjectList, setThirdProjectList] = useState([]);
  const [filteredThirdProjectList, setFilteredThirdProjectList] = useState([]);
  const [thirdSearchInput, setThirdSearchInput] = useState('');
  const [thirdSelectedOptions, setThirdSelectedOptions] = useState([]);

  useEffect(() => {
    setFilteredThirdProjectList(thirdProjectList);
  }, [thirdProjectList]);

  const handleThirdChange = (event) => {
    setThirdSearchInput(event.target.value);
  };

  const handleThirdSearch = (event) => {
    event.preventDefault(); // Prevent page refresh

    if (thirdSearchInput.trim() === '') {
        // If search bar is empty, show all projects
        setFilteredThirdProjectList(thirdProjectList);
    } else {
        // Filter projects based on search input
        const filteredProjects = thirdProjectList.filter(item => item.project_title.toLowerCase().includes(thirdSearchInput.toLowerCase()));

        // Update filtered project list with filtered projects
        setFilteredThirdProjectList(filteredProjects);
    }
};


  function Filter() {
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
                                checked={selectedOptions.includes(option)}
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                    <h2>Selected Options</h2>
                    {selectedOptions.map((option, index) => (
                        <p key={index}>{option}</p>
                    ))}
                </div>
            )}
        </div>
    );
  }

  function SecondaryFilter({ setSecondarySelectedOptions }) {
    // const [secondarySelectedOptions, setSecondarySelectedOptions] = useState([]);
    const [showSecondaryFilter, setShowSecondaryFilter] = useState(false);
  
    const handleCheckboxChange = (option) => {
        setSecondarySelectedOptions(prevState => {
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
            onClick={() => setShowSecondaryFilter(!showSecondaryFilter)}>
                Toggle Secondary Filter
            </button>
            {showSecondaryFilter && (
                <div 
                className="ml-2 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <h2>Secondary Filter</h2>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input 
                                type="checkbox" 
                                id={`secondary-option-${index}`} 
                                name={`secondary-option-${index}`} 
                                value={option}
                                onChange={() => handleCheckboxChange(option)}
                                checked={secondarySelectedOptions.includes(option)}
                            />
                            <label htmlFor={`secondary-option-${index}`}>{option}</label>
                        </div>
                    ))}
                    <h2>Selected Options</h2>
                    {secondarySelectedOptions.map((option, index) => (
                        <p key={index}>{option}</p>
                    ))}
                </div>
            )}
        </div>
    );
  }

  function ThirdFilter({ setThirdSelectedOptions }) {
    // const [thirdSelectedOptions, setThirdSelectedOptions] = useState([]);
    const [showThirdFilter, setShowThirdFilter] = useState(false);
  
    const handleCheckboxChange = (option) => {
        setThirdSelectedOptions(prevState => {
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
            onClick={() => setShowThirdFilter(!showThirdFilter)}>
                Toggle Third Filter
            </button>
            {showThirdFilter && (
                <div 
                className="ml-2 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <h2>Third Filter</h2>
                    {options.map((option, index) => (
                        <div key={index}>
                            <input 
                                type="checkbox" 
                                id={`third-option-${index}`} 
                                name={`third-option-${index}`} 
                                value={option}
                                onChange={() => handleCheckboxChange(option)}
                                checked={thirdSelectedOptions.includes(option)}
                            />
                            <label htmlFor={`third-option-${index}`}>{option}</label>
                        </div>
                    ))}
                    <h2>Selected Options</h2>
                    {thirdSelectedOptions.map((option, index) => (
                        <p key={index}>{option}</p>
                    ))}
                </div>
            )}
        </div>
    );
  }
        

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
        <Filter setSelectedOptions={setSelectedOptions} />
        <div className="relative flex items-center">
          <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
            <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            {filteredProjectList.length > 0  && filteredProjectList.filter(item => item.status === 'new' && (selectedOptions.length === 0 || selectedOptions.some(opt => item.tags.includes(opt)))).map((item) => (
              <a key={item.id} href={`/project/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
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
                  <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                  <p className="col-span-2 text-xs italic text-gray-600">{item.start_date} - {item.end_date}</p>
                  <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                  <p className="mt-1 text-sm font-medium text-gray-600">${item.price_budget}</p>
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
              id="secondarySearchBar"
              name="secondarySearchBar"
              type="text"
              placeholder="Search"
              value={secondarySearchInput}
              onChange={handleSecondaryChange}
              className="block w-full rounded-l-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
          </input>
          <button
              type="submit"
              className="flex justify-center items-center rounded-r-lg bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={handleSecondarySearch}
          >
              <Image
                  src={search}
                  width={26}
                  alt="connected logo"
              />
          </button>
        </form>

        <br></br>
        <SecondaryFilter setSecondarySelectedOptions={setSecondarySelectedOptions} />

        <div className="relative flex items-center">
          <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
            <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            {filteredSecondaryProjectList.length > 0  && filteredSecondaryProjectList.filter(item => item.status === 'ongoing' && (secondarySelectedOptions.length === 0 || secondarySelectedOptions.some(opt => item.tags.includes(opt)))).map((item) => (              
            <a key={item.id} href={`/project/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">   
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
                  <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                  <p className="col-span-2 text-xs italic text-gray-600">{item.start_date} - {item.end_date}</p>
                  <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                  <p className="mt-1 text-sm font-medium text-gray-600">${item.price_budget}</p>
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
              id="thirdSearchBar"
              name="thirdSearchBar"
              type="text"
              placeholder="Search"
              value={thirdSearchInput}
              onChange={handleThirdChange}
              className="block w-full rounded-l-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
          </input>
          <button
              type="submit"
              className="flex justify-center items-center rounded-r-lg bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={handleThirdSearch}
          >
              <Image
                  src={search}
                  width={26}
                  alt="connected logo"
              />
          </button>
        </form>

        <br></br>
        <ThirdFilter setThirdSelectedOptions={setThirdSelectedOptions} />
 
        <div className="relative flex items-center">
          <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
            <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                {filteredThirdProjectList.length > 0  && filteredThirdProjectList.filter(item => item.status === 'finished' && (thirdSelectedOptions.length === 0 || thirdSelectedOptions.some(opt => item.tags.includes(opt)))).map((item) => (                
                <a key={item.id} href={`/project/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
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
                    <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                    <p className="col-span-2 text-xs italic text-gray-600">{item.start_date} - {item.end_date}</p>
                    <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                    <p className="mt-1 text-sm font-medium text-gray-600">${item.price_budget}</p>
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
