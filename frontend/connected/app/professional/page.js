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

const options = ['Finance',  'Investment Banking', 'Web Development', 'Manufacturing', 'HR', 'Marketing', 'Retail', 'Accounting'];

export default function ProfessionalHome() {
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
    
    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            const data = { 
              userType:"company",
              size: 5,
              page: 1
            };

            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/users/`, data);
    
                // Dispatch
                console.log('Get company Successful', response.data);
                setProfessionalList(response.data.content.usersList);
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Get company failed', error);
                alert('Get company failed');
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
                size: 50,
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
                alert('View Profile failed');
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

                {/* See company */}
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Available{' '}
                      <Link href="/company-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-500">
                        companies
                      </Link>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                    <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {professionalList.length > 0 && professionalList.map((item) => (
                        <Link key={item.id} href={`/view/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                          <Image
                                src={item.userImage ? item.userImage : "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg"}
                                alt={item.imageAlt}
                                width={300}
                                height={200}
                                className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                            <p className="col-span-2 mt-1 text-sm text-blue-600">{item.email}</p>
                            {item.rating && <p className="mt-1 text-sm font-medium text-gray-600">Rating {item.averageUserRating}/5</p>}
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.phoneNumber} </p>
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
                    <span className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                      {randomTag}
                    </span>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderProjects')} size={40} />
                    <div id='sliderProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {filteredProjectList.filter(item => {return item.tags && Array.isArray(item.tags) && item.tags.includes(randomTag)}).map((item) => (
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
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderProjects')} size={40} />
                  </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}
