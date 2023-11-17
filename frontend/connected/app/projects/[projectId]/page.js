'use client';
import { useState, useEffect } from 'react';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function projectProfile({params}) {
    const state = JSON.parse(localStorage.getItem("loggedUser"));
    
    const [project_title, setProject_title] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [start_date, setStart_date] = useState("");
    const [end_date, setEnd_date] = useState("");
    const [No_professional, setNo_professional] = useState("");
    const [expected_working_hours, setExpected_working_hours] = useState("");
    const [skills, setSkills] = useState("");
    const [experiences, setExperiences] = useState("");
    const [online_offline, setOnline_offline] = useState("");
    const [price_budget, setPrice_budget] = useState("");
    const [req_prof_criteria, setReq_prof_criteria] = useState("");
    const [status, setStatus] = useState("");
    const [potential_applicants, setPotential_applicants] = useState([]);
    const [approved_applicants, setApproved_applicants] = useState([]);
    const [projectImage, setProjectImage] = useState("");
    const [updateButton, setUpdateButton] = useState(false);
    const router = useRouter();

    // Update Button
    const handleUpdateButton = async () => {
        setUpdateButton(!updateButton);
        // After updating the project details, redirect to the project page
        router.push(`/project/${params.projectId}`);
    }

    // POST Edit Project
    useEffect(() => {
        const editProject = async () => {
            // New data
            const data = {
                project_title: project_title,
                tags: tags.join(","),
                description: description,
                start_date: start_date,
                end_date: end_date,
                No_professional: No_professional,
                expected_working_hours: expected_working_hours,
                skills: skills,
                experiences: experiences,
                online_offline: online_offline,
                price_budget: price_budget,
                req_prof_criteria: req_prof_criteria,
                status: status,
                potential_applicants: potential_applicants.join(","),
                approved_applicants: approved_applicants.join(",")
            };
            

            try {
                const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/edit`, data, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
                // Dispatch
                console.log('Edit Project Successful', response.data);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Edit Project failed', error);
                alert('Edit Project failed');
            }
        };

        editProject();

    }, [updateButton]);

    // GET View Project
    useEffect(() => {
        const viewProject = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/project/${params.projectId}`);
    
                // Dispatch
                console.log('View Project Successful', response.data);
                const projectData = response.data.content;

                // Set variable states
                setProject_title(projectData.project_title);
                setTags(projectData.tags);
                setDescription(projectData.description);
                setStart_date(new Date(projectData.start_date).toISOString().split('T')[0]);
                setEnd_date(new Date(projectData.end_date).toISOString().split('T')[0]);
                setNo_professional(projectData.No_professional);
                setExpected_working_hours(projectData.expected_working_hours);
                setSkills(projectData.skills);
                setExperiences(projectData.experiences);
                setOnline_offline(projectData.online_offline);
                setPrice_budget(projectData.price_budget);
                setReq_prof_criteria(projectData.req_prof_criteria);
                setStatus(projectData.status);
                setPotential_applicants(projectData.potential_applicants);
                setApproved_applicants(projectData.approved_applicants);
                setProjectImage(projectData.projectImage);
                
            } catch (error) {

                console.error('View Project failed', error);
                alert('View Project failed');
            }
        };

        viewProject();
    }, []);

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32">
                {/* Page Title */}
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Project
                </h2>

                {/* Project Picture */}
                {/* <div className="flex gap-4 items-center">
                    <Image
                        src={projectImage ? projectImage : profile}
                        width={100}
                        height={100}
                        alt="connected logo"
                    />
                    <div>
                        <label htmlFor="project_title" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload Project Picture
                        </label>
                        <div className="mt-2">
                            <input
                                id="project_title"
                                name="project_title"
                                type="file"
                                value={projectImage}
                                onChange={e => setProjectImage(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div> */}

                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="project_title" className="block text-sm font-medium leading-6 text-gray-900">
                            Project Title
                        </label>
                        <div className="mt-2">
                            <input
                                id="project_title"
                                name="project_title"
                                type="text"
                                value={project_title}
                                onChange={e => setProject_title(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <input
                                id="description"
                                name="description"
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="start_date" className="block text-sm font-medium leading-6 text-gray-900">
                            Start Date
                        </label>
                        <div className="mt-2">
                            <input
                                id="start_date"
                                name="start_date"
                                type="date"
                                value={start_date}
                                onChange={e => setStart_date(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="end_date" className="block text-sm font-medium leading-6 text-gray-900">
                            End Date
                        </label>
                        <div className="mt-2">
                            <input
                                id="end_date"
                                name="end_date"
                                type="date"
                                value={end_date}
                                onChange={e => setEnd_date(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="No_professional" className="block text-sm font-medium leading-6 text-gray-900">
                            Number of Professionals
                        </label>
                        <div className="mt-2">
                            <input
                                id="No_professional"
                                name="No_professional"
                                type="number"
                                value={No_professional}
                                onChange={e => setNo_professional(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="expected_working_hours" className="block text-sm font-medium leading-6 text-gray-900">
                            Expected Working Hours
                        </label>
                        <div className="mt-2">
                            <input
                                id="expected_working_hours"
                                name="expected_working_hours"
                                type="number"
                                value={expected_working_hours}
                                onChange={e => setExpected_working_hours(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                </div>


                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="skills" className="block text-sm font-medium leading-6 text-gray-900">
                            Skills
                        </label>
                        <div className="mt-2">
                            <input
                                id="skills"
                                name="skills"
                                type="text"
                                value={skills}
                                onChange={e => setSkills(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="experiences" className="block text-sm font-medium leading-6 text-gray-900">
                            Experiences
                        </label>
                        <div className="mt-2">
                            <input
                                id="experiences"
                                name="experiences"
                                type="text"
                                value={experiences}
                                onChange={e => setExperiences(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="online_offline" className="block text-sm font-medium leading-6 text-gray-900">
                            Online/Offline
                        </label>
                        <div className="mt-2">
                            <input
                                id="online_offline"
                                name="online_offline"
                                type="text"
                                value={online_offline}
                                onChange={e => setOnline_offline(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="price_budget" className="block text-sm font-medium leading-6 text-gray-900">
                            Price Budget
                        </label>
                        <div className="mt-2">
                            <input
                                id="price_budget"
                                name="price_budget"
                                type="text"
                                value={price_budget}
                                onChange={e => setPrice_budget(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="req_prof_criteria" className="block text-sm font-medium leading-6 text-gray-900">
                            Required Professional Criteria
                        </label>
                        <div className="mt-2">
                            <input
                                id="req_prof_criteria"
                                name="req_prof_criteria"
                                type="text"
                                value={req_prof_criteria}
                                onChange={e => setReq_prof_criteria(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            onClick={handleUpdateButton}
                            className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Update Project Details
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
