'use client';
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { sampleCompany } from 'public/data.js';
import Footer from '/components/Footer.js';
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function CreateNewJob() {
    const router = useRouter();

    const [projectTitle, setProjectTitle] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDesription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numProfessional, setNumProfessional] = useState("");
    const [hours, setHours] = useState("");
    const [skills, setSkills] = useState("");
    const [experiences, setExperiences] = useState("");
    const [onlineOffline, setOnlineOffline] = useState("");
    const [price, setPrice] = useState("");
    const [requiredCriteria, setRequiredCriteria] = useState("");
    
    const [searchInput, setSearchInput] = useState("");
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        console.log(searchInput);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract data
        const data = {
            project_title: projectTitle,
            tags: tags,
            description: description,
            start_date: startDate,
            end_date: endDate,
            No_professional: numProfessional,
            expected_working_hours: hours,
            skills: skills,
            experiences: experiences,
            online_offline: onlineOffline,
            price_budget: price,
            req_prof_criteria: requiredCriteria,
        };
        

        console.log(data);

        // Make an HTTP POST request to your API route
        try {
            const response = await axios.post('http://127.0.0.1:3000/project/create', data);
            // Handle the response as needed (e.g., show a success message or redirect the user)
            console.log('Create new job successful', response.data);
            router.push('/company');
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('Create new job failed', error);
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

            <div className="flex flex-col justify-center mx-64 my-10 p-10 mb-36 rounded-md border-2 border-blue-900">
                <h2 className="pb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Fill in the details for the new Project post
                </h2>
                <form className="space-y-6" action="#" method="POST">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="projectTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                Project Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="projectTitle"
                                    name="projectTitle"
                                    type="text"
                                    required
                                    value={projectTitle}
                                    onChange={e => setProjectTitle(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">
                                Industry Type
                            </label>
                            <div className="mt-2">
                                <input
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    required
                                    value={tags}
                                    onChange={e => setTags(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                                Start Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    required
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                                End Date
                            </label>
                            <div className="mt-2">
                                <input
                                    id="endDate"
                                    name="endDate"
                                    type="date"
                                    required
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="numProfessional" className="block text-sm font-medium leading-6 text-gray-900">
                                Number of Professionals Needed
                            </label>
                            <div className="mt-2">
                                <input
                                    id="numProfessional"
                                    name="numProfessional"
                                    type="number"
                                    required
                                    value={numProfessional}
                                    onChange={e => setNumProfessional(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="hours" className="block text-sm font-medium leading-6 text-gray-900">
                                Expected Working Hours
                            </label>
                            <div className="mt-2">
                                <input
                                    id="hours"
                                    name="hours"
                                    type="number"
                                    required
                                    value={hours}
                                    onChange={e => setHours(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price per hr
                            </label>
                            <div className="mt-2">
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    required
                                    placeholder="$50/hr"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                                Skills Criteria
                            </label>
                            <div className="mt-2">
                                <input
                                    id="skills"
                                    name="skills"
                                    type="text"
                                    required
                                    placeholder="React, JavaScript"
                                    value={skills}
                                    onChange={e => setSkills(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="experiences" className="block text-sm font-medium leading-6 text-gray-900">
                                Preferred Experiences
                            </label>
                            <div className="mt-2">
                                <input
                                    id="experiences"
                                    name="experiences"
                                    type="text"
                                    required
                                    placeholder="Web development internship"
                                    value={experiences}
                                    onChange={e => setExperiences(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="onlineOffline" className="block text-sm font-medium leading-6 text-gray-900">
                                Online or Offline Work
                            </label>
                            <div class="flex" value={onlineOffline} onChange={e => setOnlineOffline(e.target.value)}>
                                <div class="flex items-center mr-4">
                                    <input id="online-radio" type="radio" value="online" name="onlineOffline" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="online-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Online</label>
                                </div>
                                <div class="flex items-center mr-4">
                                    <input id="offline-radio" type="radio" value="offline" name="onlineOffline" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="offline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Offline</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                Image
                            </label>
                            <div className="mt-2">
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    required
                                    
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Brief Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    className="block w-full h-32 rounded-md border-0 mb-10 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    

                    <div>
                        <Link href="/company">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Post Project
                            </button>
                        </Link> 
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}
