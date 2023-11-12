'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useUserData } from "context/context";
import { useRouter } from 'next/navigation';

export default function InviteProfessional({params}) {
    const router = useRouter();
    // const { state } = useUserData();
    const state = JSON.parse(localStorage.getItem("loggedUser"));
    const { accountId, userType } = state;
    const [userId, setUserId] = useState(params.userId);
    
    
    const [hireButton, setHireButton] = useState(false);
    const [projectsList, setProjectsList] = useState([]);
    const [projectId, setProjectId] = useState("");

    // Professional Details
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [professionalEmail, setProfessionalEmail] = useState("");
    const [description, setDescription] = useState("");
    const [industryType, setIndustryType] = useState("");
    
    // GET My Projects
    useEffect(() => {
        const viewProfile = async () => {
            
            try {
                const response = await axios.get(`http://127.0.0.1:3000/user/profile/${params.userId}`);
    
                // Dispatch
                console.log('View Profile Successful', response.data);
                const userData = response.data.content.user;

                // Set variable states
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setUsername(userData.name);
                setProfessionalEmail(userData.email);
                setDescription(userData.description);
                setIndustryType(userData.tags);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        const getProjects = async () => {
            const queryData = {
                companyId: accountId,
                size: 5,
                page: 1,
            };

            try {
                const response = await axios.post('http://127.0.0.1:3000/project/getProjects', queryData);
    
                // Dispatch
                console.log('Get Projects Successful', response.data);
                setProjectsList(response.data.content.projectsList); 
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Get Projects failed', error);
            }
        };

        viewProfile();
        getProjects();
    }, []);

    // Hire Professional Button
    const handleHireButton = (itemId) => {
        setProjectId(itemId);
        setHireButton(true);
    };

    // POST Invite Professional
    useEffect(() => {
        const inviteProfessional = async () => {
            const inviteData = {
                professionalEmail: professionalEmail,
                projectId: projectId,
                link: `http://localhost:3001/project/${projectId}`,
            };
            console.log("project Inv", inviteData);

            try {
                const response = await axios.post('http://127.0.0.1:3000/project/inviteProfessional', inviteData, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
                // Dispatch
                console.log('Invite Professional Successful', response.data);
                alert('Invite Professional Successful');
                // router.push('/company');
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Invite Professional failed', error);
            }
        };

        inviteProfessional();
    }, [projectId]);

    const slideLeft = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft + 500;
    };


    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32 mt-4 gap-y-8">
                {/* Personal Details */}
                <div className="flex flex-col rounded-md border-2 border-blue-900 w-full">
                    <div className="group grid grid-cols-4">
                        <div className="col-span-3 grid grid-cols-4 gap-2 p-4 mr-10">
                            <p className="text-3xl font-bold text-gray-900">{firstName} {lastName}</p>
                            <div>
                                <p className="mt-1 text-sm font-medium text-gray-600">{username}</p>
                                <p className="mt-1 text-sm font-medium text-gray-600">{professionalEmail}</p>
                                <p className="mt-1 text-sm italic text-blue-600">{industryType}</p>
                            </div>
                            <div className="col-span-2 w-full mx-10 p-2 rounded-md border-2 border-teal-900">
                                <p className="text-lg font-medium text-gray-900">Description</p>
                                <p className="mt-4 text-left text-xs text-gray-600">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project List */}
                <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Invite{' '}
                      <Link href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-500">
                        {firstName} {lastName}
                      </Link>
                    {' '}to join a project
                </h2>
                <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderProjects')} size={40} />
                    <div id='sliderProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                        {projectsList && projectsList.map((item) => (
                            <Link key={item.id} href="" className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                                <div className="grid grid-cols-2 gap-2 p-4">
                                    <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                                    <p className="col-span-2 text-xs italic text-gray-600">{item.start_date}</p>
                                    <p className="col-span-2 text-xs italic text-gray-600">{item.end_date}</p>
                                    <p className="col-span-2 text-sm font-medium text-blue-900">{item.tags.join(", ")}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-600">{item.No_professional} professionals -- {item.price_budget}</p>
                                    <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                                    <button
                                        type="submit"
                                        onClick={() => handleHireButton(item.id)}
                                        className="flex mt-4 col-span-2 h-[36px] justify-center items-center rounded-md bg-teal-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Invite to {item.project_title}
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderProjects')} size={40} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}
