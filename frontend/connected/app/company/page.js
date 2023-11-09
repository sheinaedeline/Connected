'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { trendingProjects } from '/public/data.js';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import { useUserData } from "../../context/context";
import axios from 'axios';
import Link from 'next/link';

const options = ['bizz', 'software3', 'web development', 'non-profit', 'food', 'beverages', 'retail', 'services'];

export default function CompanyHome() {
    // const { state } = useUserData();
    const state = JSON.parse(localStorage.getItem("loggedUser"));
    const { accountId, userType } = state;
    const [professionalList, setProfessionalList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredProjectList, setFilteredProjectList] = useState([]);
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    const slideLeft = (id) => {
      var slider = document.getElementById(id);
      slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = (id) => {
      var slider = document.getElementById(id);
      slider.scrollLeft = slider.scrollLeft + 500;
    };

    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            const data = { 
              userType:"professional",
              size: 5,
              page: 1
            };

            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/users/`, data);
    
                // Dispatch
                console.log('Get professional Successful', response.data);
                setProfessionalList(response.data.content.usersList);
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        viewProfile();
    }, [accountId]);

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

    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            const data = { 
                size: 5,
                page: 1
              };

            try {
                const response = await axios.post(`http://127.0.0.1:3000/project/getProjects`, data);
    
                // Dispatch
                console.log('View Profile Successful', response.data);
                // setProjectList(response.data.content.projectsList);
                let sortedProjects = response.data.content.projectsList.sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setProjectList(sortedProjects);
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

    let randomTag = options[Math.floor(Math.random() * options.length)];

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32 gap-y-8">
                {/* Trending Projects */}
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Latest{' '}
                      <Link href="/projects" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        Projects
                      </Link>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
                    <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {filteredProjectList.length > 0  && filteredProjectList.filter(item => (item.status === 'new' || item.status === 'ongoing') && (selectedOptions.length === 0 || selectedOptions.some(opt => item.tags.includes(opt)))).map((item) => (                  
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
                            <p className="col-span-2 text-xs italic text-gray-600">{item.start_date}</p>
                            <p className="col-span-2 text-xs italic text-gray-600">{item.end_date}</p>
                            <p className="col-span-2 text-sm font-medium text-blue-900">{item.owner.userName}</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">{item.price_budget}</p>
                            <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
                  </div>
                </div>

                {/* Hire Professionals */}
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Hire{' '}
                      <Link href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-500">
                        Professionals
                      </Link>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                    <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {professionalList.length > 0 && professionalList.map((item) => (
                        <Link key={item.id} href={`/view/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
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
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                            <p className="col-span-2 mt-1 text-sm text-blue-600">{item.tags}</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">Rating {item.rating}/5</p>
                            <p className="mt-1 text-sm text-right font-medium text-gray-600">{item.skills} skills</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                  </div>
                </div>

                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Projects in {' '}
                    <Link href="/companies" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                      {randomTag}
                    </Link>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderProjects')} size={40} />
                    <div id='sliderProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {filteredProjectList.filter(item => {return item.tags && Array.isArray(item.tags) && item.tags.includes(randomTag)}).map((item) => (
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
                          <p className="col-span-2 text-xs italic text-gray-600">{item.start_date}</p>
                          <p className="col-span-2 text-xs italic text-gray-600">{item.end_date}</p>
                          <p className="col-span-2 text-sm font-medium text-blue-900">{item.owner.userName}</p>
                          <p className="mt-1 text-sm font-medium text-gray-600">{item.price_budget}</p>
                          <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                          <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                        </div>
                      </a>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderProjects')} size={40} />
                  </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}
