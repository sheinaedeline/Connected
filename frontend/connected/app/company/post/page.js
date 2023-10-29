'use client';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useUserData } from "context/context";

export default function CreateNewJob() {
    const router = useRouter();
    const { state } = useUserData();
    console.log(state);

    // Project Information States
    const [projectTitle, setProjectTitle] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDesription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numProfessional, setNumProfessional] = useState("");
    const [hours, setHours] = useState("");
    const [experiences, setExperiences] = useState("");
    const [onlineOffline, setOnlineOffline] = useState("");
    const [price, setPrice] = useState("");
    const [skills, setSkills] = useState("");
    const [requiredCriteria, setRequiredCriteria] = useState("");

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
        

        console.log("data is ", data);

        // Make an HTTP POST request to your API route
        try {
            // POST NOT WORKING AUTHENTICATION ERROR?
            const response = await axios.post('http://127.0.0.1:3000/project/create', data, { headers: { 'Authorization': `Bearer Token ${state.jwtToken}` }});
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
            <Header/>

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
                                    placeholder="Web Development"
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
                                    placeholder="5"
                                    value={numProfessional}
                                    onChange={e => setNumProfessional(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <label htmlFor="hours" className="block text-sm font-medium leading-6 text-gray-900">
                                Expected Working Hours
                            </label>
                            <div className="mt-2">
                                <input
                                    id="hours"
                                    name="hours"
                                    type="number"
                                    required
                                    placeholder="60"
                                    value={hours}
                                    onChange={e => setHours(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
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
                            <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                                Technical Skills
                            </label>
                            <div className="mt-2">
                                <input
                                    id="skills"
                                    name="skills"
                                    type="text"
                                    required
                                    placeholder="React JS"
                                    value={skills}
                                    onChange={e => setSkills(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <label htmlFor="requiredCriteria" className="block text-sm font-medium leading-6 text-gray-900">
                                Soft Skills
                            </label>
                            <div className="mt-2">
                                <input
                                    id="requiredCriteria"
                                    name="requiredCriteria"
                                    type="text"
                                    required
                                    placeholder="Team player, Good communication skills"
                                    value={requiredCriteria}
                                    onChange={e => setRequiredCriteria(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="onlineOffline" className="block text-sm font-medium leading-6 text-gray-900">
                                Work Placement
                            </label>
                            <div className="flex" value={onlineOffline} onChange={e => setOnlineOffline(e.target.value)}>
                                <div className="flex items-center mr-4">
                                    <input id="online-radio" type="radio" value="online" name="onlineOffline" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="online-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Online</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="offline-radio" type="radio" value="offline" name="onlineOffline" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="offline-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Offline</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Brief Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    value={description}
                                    onChange={e => setDesription(e.target.value)}
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
