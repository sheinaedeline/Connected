'use client';
import Image from 'next/image';
import profile from "assets/Profile Icon.png";
import { useState, useEffect } from 'react';
import { sampleProfessional } from '/public/data.js';
import { AiFillLinkedin } from 'react-icons/ai';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useUserData } from "context/context";
import { useRouter } from "next/navigation";


export default function ViewProject() {
    const { state } = useUserData();
    const { accountId, userType } = state;
    const router = useRouter();
    const [projectId, setProjectId] = useState("");
    
    // Project Data
    const [_id, set_id] = useState("");
    const [owner, setOwner] = useState("");
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

    const handleEditButton = () => {
        router.push('/project/profile');
    };


    // GET View Profile && GET Projects
    useEffect(() => {
        const viewProject = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/project/653b55906f170de1334a03ba`);
                // const response = await axios.get(`http://127.0.0.1:3000/project/${projectId}`);
    
                // Dispatch
                console.log('View Project Successful', response.data);
                const userData = response.data.content;

                // Set variable states
                set_id(userData._id.$oid);
                setOwner(userData.owner.$oid);
                setProject_title(userData.project_title);
                setTags(userData.tags);
                setDescription(userData.description);
                setStart_date(userData.start_date.$date);
                setEnd_date(userData.end_date.$date);
                setNo_professional(userData.No_professional);
                setExpected_working_hours(userData.expected_working_hours);
                setSkills(userData.skills);
                setExperiences(userData.experiences);
                setOnline_offline(userData.online_offline);
                setPrice_budget(userData.price_budget);
                setReq_prof_criteria(userData.req_prof_criteria);
                setStatus(userData.status);
                setPotential_applicants(userData.potential_applicants);
                setApproved_applicants(userData.approved_applicants);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        viewProject();
    }, []);

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32 mt-4 gap-y-8">
                {/* Project Details */}
                <div className="flex flex-col rounded-md border-2 border-blue-900 w-full">
                    <div className="group grid grid-cols-4 grid-rows-2">
                        <div className="col-span-3 grid grid-cols-4 gap-2 p-4 mr-10">
                            <div className="col-span-3 flex flex-col">
                                <p className="text-3xl font-bold text-gray-900">{project_title}</p>
                                <p className="mt-1 text-sm font-medium text-gray-600">{_id}</p>
                            </div>
                            <div className="flex flex-evenly gap-x-4 justify-start items-center">
                                <button
                                    type="submit"
                                    onClick={handleEditButton}
                                    className="flex justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Edit Project
                                </button>
                            </div>
                            <p className="col-span-2 mt-1 text-sm text-left italic text-blue-600">{skills}</p>
                            <p className="mt-1 text-sm text-right font-medium text-gray-600">No. of Professionals {No_professional}</p>
                            <p className="mt-1 text-sm text-right font-medium text-gray-600">Expected Working Hours {expected_working_hours}</p>
                            <p className="col-span-4 text-xs text-gray-600">{online_offline}</p>
                            <p className="text-xs text-gray-600">{price_budget}</p>
                            <p className="col-span-2 mt-1 text-sm text-left italic text-blue-600">Start Date: {start_date}</p>
                            <p className="col-span-2 mt-1 text-sm text-left italic text-blue-600">End Date: {end_date}</p>
                            <p className="col-span-4 mt-1 text-sm text-left italic text-blue-600">Tags: {tags.join(", ")}</p>
                            <p className="col-span-4 mt-1 text-sm text-left italic text-blue-600">Experiences: {experiences}</p>
                            <p className="col-span-4 mt-1 text-sm text-left italic text-blue-600">Required Professional Criteria: {req_prof_criteria}</p>
                            <p className="col-span-4 mt-1 text-sm text-left italic text-blue-600">Status: {status}</p>
                        </div>
                        <div className="col-span-4 my-6 mx-10 p-4 rounded-md border-2 border-teal-900">
                            <p className="text-lg font-medium text-gray-900">Description</p>
                            <p className="mt-4 text-left text-xs text-gray-600">{description}</p>
                        </div>
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )
}
