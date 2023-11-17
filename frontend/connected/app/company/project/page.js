'use client';
import Link from "next/link";
import Image from "next/image";
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import { AiOutlinePlus, AiOutlineMail } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import Footer from '/components/Footer.js';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import Header from '/components/Header.js';

const options = ['finance',  'investment banking', 'web development', 'manufacturing', 'HR', 'marketing', 'retail', 'accounting'];

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
  const [searchInput, setSearchInput] = useState("");
  const [filteredProjectList, setFilteredProjectList] = useState([]);
  const [secondaryProjectList, setSecondaryProjectList] = useState([]);
  const [filteredSecondaryProjectList, setFilteredSecondaryProjectList] = useState([]);
  const [secondarySearchInput, setSecondarySearchInput] = useState('');
  const [secondarySelectedOptions, setSecondarySelectedOptions] = useState([]);
  const [thirdProjectList, setThirdProjectList] = useState([]);
  const [filteredThirdProjectList, setFilteredThirdProjectList] = useState([]);
  const [thirdSearchInput, setThirdSearchInput] = useState('');
  const [thirdSelectedOptions, setThirdSelectedOptions] = useState([]);
  const state = JSON.parse(localStorage.getItem("loggedUser"));
  const { accountId, userType } = state;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [userImage, setUserImage] = useState("");
  const [fetchUserType, setFetchUserType] = useState("");  

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

    const tagImages = {
        "finance": "https://cdn-icons-png.flaticon.com/128/1077/1077976.png",
        "investment banking": "https://cdn-icons-png.flaticon.com/128/846/846043.png",
        "web development": "https://cdn-icons-png.flaticon.com/128/10210/10210601.png",
        "manufacturing": "https://cdn-icons-png.flaticon.com/128/1433/1433114.png",
        "HR": "https://cdn-icons-png.flaticon.com/128/6846/6846565.png",
        "marketing": "https://cdn-icons-png.flaticon.com/128/1997/1997928.png",
        "retail": "https://cdn-icons-png.flaticon.com/128/2769/2769277.png",
        "accounting": "https://cdn-icons-png.flaticon.com/128/1570/1570887.png"
      };

    useEffect(() => {
        const getProject = async () => {
            const data = { 
                size: 100,
                page: 1
            };

            try {
                const response = await axios.post(`http://127.0.0.1:3000/project/getProjects`, data);
                console.log(accountId);

                // Dispatch
                console.log('View Project Successful', response.data);
                setProjectList(response.data.content.projectsList);
                setSecondaryProjectList(response.data.content.projectsList);
                setThirdProjectList(response.data.content.projectsList);
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
                alert('View Profile failed');
            }
    
        };

        getProject();
    }, []);

    useEffect(() => {
        setFilteredProjectList(projectList);
    }, [projectList]);

    useEffect(() => {
        setFilteredSecondaryProjectList(secondaryProjectList);
    }, [secondaryProjectList]);

    useEffect(() => {
        setFilteredThirdProjectList(thirdProjectList);
    }, [thirdProjectList]);

    useEffect(() => {
        const viewProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/user/profile/${accountId}`);

                // Dispatch
                console.log('View Profile Successful', response.data);
                const userData = response.data.content.user;

                // Set variable states
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setUsername(userData.userName);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setAddress(userData.address);
                setDOB(userData.DOB);
                setLinkedIn(userData.socialURL);
                setDescription(userData.description);
                setPassword(userData.password);
                setIndustryType(userData.tags);
                setUserImage(userData.userImage);
                setFetchUserType(userData.userType);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
                alert('View Profile failed');
            }
        };

        viewProfile();
    }, []);


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
                            <label htmlFor={`option-${index}`} className="pl-2">{option}</label>
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
                    {/* <h2>Selected Options</h2>
                    {secondarySelectedOptions.map((option, index) => (
                        <p key={index}>{option}</p>
                    ))} */}
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
                    {/* <h2>Selected Options</h2>
                    {thirdSelectedOptions.map((option, index) => (
                        <p key={index}>{option}</p>
                    ))} */}
                </div>
            )}
        </div>
    );
  }

  return (
    <div className="bg-white dark:bg-black">
      <Header/>
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                  Planned{' '}
              <a href="" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
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
            {filteredProjectList.length > 0  && filteredProjectList.filter(item => item.status === 'new' && item.owner._id === accountId && (selectedOptions.length === 0 || selectedOptions.some(opt => item.tags.includes(opt)))).map((item) => (
              <a key={item.id} href={`/project/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
              <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={tagImages[item.tags[0]]}
                  alt={item.imageAlt}
                  width={300}
                  height={200}
                  className="object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 p-4">
                  <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                  <p className="col-span-2 text-xs text-gray-600 truncate">
                  Start Date: {new Date(item.start_date).toLocaleDateString()}
                  </p>
                  <p className="col-span-2 text-xs text-gray-600 truncate">
                  End Date: {new Date(item.end_date).toLocaleDateString()}
                  </p>
                  <p className="col-span-2 text-sm font-medium text-blue-900">{item.owner.userName}</p>
                  <p className="mt-1 text-sm font-medium text-gray-600">${item.price_budget}/hour</p>
                  <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
              </div>
            </a>
            ))}
          </div>
          <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
        </div>

        <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Ongoing {' '}
          <a href="" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
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
            {filteredSecondaryProjectList.length > 0  && filteredSecondaryProjectList.filter(item => item.status === 'ongoing' && item.owner._id === accountId && (secondarySelectedOptions.length === 0 || secondarySelectedOptions.some(opt => item.tags.includes(opt)))).map((item) => (              
            <a key={item.id} href={`/project/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
            <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
              <Image
                src={tagImages[item.tags[0]]}
                alt={item.imageAlt}
                width={300}
                height={200}
                className="object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 p-4">
                <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                <p className="col-span-2 text-xs text-gray-600 truncate">
                Start Date: {new Date(item.start_date).toLocaleDateString()}
                </p>
                <p className="col-span-2 text-xs text-gray-600 truncate">
                End Date: {new Date(item.end_date).toLocaleDateString()}
                </p>
                <p className="col-span-2 text-sm font-medium text-blue-900">{item.owner.userName}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">${item.price_budget}/hour</p>
                <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
            </div>
          </a>
            ))}
          </div>
          <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
        </div>

        <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Past {' '}
          <a href="" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
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
            {filteredThirdProjectList.length > 0  && filteredThirdProjectList.filter(item => item.status === 'completed' && item.owner._id === accountId && (thirdSelectedOptions.length === 0 || thirdSelectedOptions.some(opt => item.tags.includes(opt)))).map((item) => (                
                <a key={item.id} href={`/project/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={tagImages[item.tags[0]]}
                    alt={item.imageAlt}
                    width={300}
                    height={200}
                    className="object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 p-4">
                    <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                    <p className="col-span-2 text-xs text-gray-600 truncate">
                    Start Date: {new Date(item.start_date).toLocaleDateString()}
                    </p>
                    <p className="col-span-2 text-xs text-gray-600 truncate">
                    End Date: {new Date(item.end_date).toLocaleDateString()}
                    </p>
                    <p className="col-span-2 text-sm font-medium text-blue-900">{item.owner.userName}</p>
                    <p className="mt-1 text-sm font-medium text-gray-600">${item.price_budget}/hour</p>
                    <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                </div>
              </a>
              ))}
            </div>
            <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
          </div>
        </div>
        <Footer/>
      </section>
    </div>
  );
}
