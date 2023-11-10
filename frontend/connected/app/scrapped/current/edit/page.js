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
import { trendingProjects, trendingProfessionals, sampleProject } from '/public/data.js';
import { AiOutlineHeart, AiFillLinkedin } from 'react-icons/ai';
import trading from "assets/Trading Background.png";
import axios from 'axios';
import { useUserData } from "context/context";

export default function page() {

  const [searchInput, setSearchInput] = useState("");
    
  const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
  };

  const handleSearch = () => {
      console.log(searchInput);
  };

  const [projectList, setProjectList] = useState([]);
  const [project, setProject] = useState({});

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
            // Set variable states
            
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('View Profile failed', error);
        }

        
    };
    viewProfile();
    }, []);

    useEffect(() => {
        // Fetch projects and set the first project as the current project
        // ...
        if (projectList.length > 0) {
          setProject(projectList[0]);
          console.log("it isnt empty")
          console.log(projectList[0])
        }

      }, [projectList]);

      const handleInputChange = (e) => {
        setProject({
          ...project,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put('http://127.0.0.1:3000/project/652cf219f25295494af04c68/edit', project);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col rounded-md border-2 border-blue-900 w-full">
            {project && (
            <div key={project.id} className="group grid grid-cols-4 grid-rows-2">
                <div className="col-span-3 grid grid-cols-4 gap-2 p-4 mr-10">
                {/* Project Title */}
                <div className="col-span-2">
                    <label htmlFor="project_title" className="block text-sm font-medium leading-6 text-gray-900">
                    Project Title
                    </label>
                    <div className="mt-2">
                    <input
                        id="project_title"
                        name="project_title"
                        type="text"
                        value={project.project_title}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="description"
                        name="description"
                        value={project.description}
                        onChange={handleInputChange}
                        className="block w-full h-20 rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    {/* Start Date */}
                    <div className="col-span-2">
                    <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900">
                        Start Date
                    </label>
                    <div className="mt-2">
                        <input
                        id="start_date"
                        name="start_date"
                        type="date"
                        value={project.start_date ? new Date(project.start_date).toISOString().split('T')[0] : ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    {/* End Date */}
                    <div className="col-span-2">
                    <label htmlFor="end_date" className="block text-sm font-medium leading-6 text-gray-900">
                        End Date
                    </label>
                    <div className="mt-2">
                        <input
                        id="end_date"
                        name="end_date"
                        type="date"
                        value={project.end_date ? new Date(project.end_date).toISOString().split('T')[0] : ''}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div className="col-span-2">
                    <label htmlFor="online_offline" className="block text-sm font-medium leading-6 text-gray-900">
                        Work Mode
                    </label>
                    <div className="mt-2">
                        <select
                        id="online_offline"
                        name="online_offline"
                        value={project.online_offline}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="mixed">Mixed</option>
                        </select>
                    </div>
                    </div>
                    {/* Number of Professionals */}
                    <div className="col-span-2">
                    <label htmlFor="No_professional" className="block text-sm font-medium leading-6 text-gray-900">
                        Number of Professionals
                    </label>
                    <div className="mt-2">
                        <input
                        id="No_professional"
                        name="No_professional"
                        type="number"
                        value={project.No_professional}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    {/* Expected Working Hours */}
                    <div className="col-span-2">
                    <label htmlFor="expected_working_hours" className="block text-sm font-medium leading-6 text-gray-900">
                        Expected Working Hours
                    </label>
                    <div className="mt-2">
                        <input
                        id="expected_working_hours"
                        name="expected_working_hours"
                        type="number"
                        value={project.expected_working_hours}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    {/* Skills */}
                    <div className="col-span-2">
                    <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                        Skills
                    </label>
                    <div className="mt-2">
                        <input
                        id="skills"
                        name="skills"
                        type="text"
                        value={project.skills}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                    {/* Experiences */}
                    <div className="col-span-2">
                    <label htmlFor="experiences" className="block text-sm font-medium leading-6 text-gray-900">
                        Experiences
                    </label>
                    <div className="mt-2">
                        <input
                        id="experiences"
                        name="experiences"
                        type="text"
                        value={project.experiences}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    {/* Price Budget */}
                    <div className="col-span-2">
                    <label htmlFor="price_budget" className="block text-sm font-medium leading-6 text-gray-900">
                        Price Budget
                    </label>
                    <div className="mt-2">
                        <input
                        id="price_budget"
                        name="price_budget"
                        type="text"
                        value={project.price_budget}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    {/* Required Professional Criteria */}
                    <div className="col-span-2">
                    <label htmlFor="req_prof_criteria" className="block text-sm font-medium leading-6 text-gray-900">
                        Required Professional Criteria
                    </label>
                    <div className="mt-2">
                        <input
                        id="req_prof_criteria"
                        name="req_prof_criteria"
                        type="text"
                        value={project.req_prof_criteria}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                  </div>
                </div>
            </div>
            )}
            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Save Changes</button>
        </div>
        </form>
        <Footer/>
      </section>
    </div>
  );
}
