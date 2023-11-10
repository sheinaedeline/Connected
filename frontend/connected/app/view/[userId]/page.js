'use client';
import Image from 'next/image';
import Link from 'next/link';
import profile from "assets/Profile Icon.png";
import { useState, useEffect } from 'react';
import { sampleProfessional } from '/public/data.js';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineHeart, AiFillLinkedin } from 'react-icons/ai';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useUserData } from "context/context";
import { useRouter } from 'next/navigation';

export default function ViewProfile({params}) {
    const router = useRouter();
    // const { state } = useUserData();
    const state = JSON.parse(localStorage.getItem("loggedUser"));
    const { accountId, userType } = state;
    const [userId, setUserId] = useState(params.userId);
    const [hireButton, setHireButton] = useState(false);
    const [requestButton, setRequestButton] = useState(false);
    const [projectId, setProjectId] = useState("");
    
    // Fetch Profile Data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [DOB, setDOB] = useState("");
    const [ABN, setABN] = useState("");
    const [socialURL, setSocialURL] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [industryType, setIndustryType] = useState("");
    const [userImage, setUserImage] = useState("");
    const [fetchUserType, setFetchUserType] = useState("");
    const [projectsList, setProjectsList] = useState([]);
    const [deleteUser, setDeleteUser] = useState(false);
    const [userImageString, setUserImageString] = useState('');
    const [userFileString, setUserFileString] = useState(null);

    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            
            try {
                const response = await axios.get(`http://127.0.0.1:3000/user/profile/${params.userId}`);
    
                // Dispatch
                console.log('View Profile Successful', response.data);
                const userData = response.data.content.user;

                // Set variable states
                setFirstName(userData.firstName);
                setUsername(userData.name);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setAddress(userData.address);
                setSocialURL(userData.socialURL);
                setDescription(userData.description);
                setPassword(userData.password);
                setIndustryType(userData.tags);
                setUserImage(userData.userImage);
                setFetchUserType(userData.userType);
                if (userData.userType === 'company') {
                    setABN(userData.abn);
                } else if (userData.userType === 'professional') {
                    setDOB(userData.dob);
                    setLastName(userData.lastName);
                }
                if(userData.userImage){
                    setUserImageString(userData.userImage);
                }
                if(userData.userFile){
                    setUserFileString(userData.userFile);
                }
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        const getProjects = async () => {
            const queryData = {
                size: 5,
                page: 1,
            };

            if (fetchUserType === 'company') {
                queryData['companyId'] = accountId;
            } else if (fetchUserType === 'professional') {
                queryData['userId'] = accountId;
            }

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
    const handleHireButton = () => {
        setHireButton(true);
        router.push(`/invite/${userId}`);
    };

    // Hire Professional Button
    const handleRequestButton = (itemId) => {
        setProjectId(itemId);
        setRequestButton(true);
    };

    // PUT Request Join Project
    useEffect(() => {
        const requestJoin = async () => {
            console.log("project id bro", projectId);
            try {
                const response = await axios.put(`http://127.0.0.1:3000/project/${projectId}/join`, {}, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
                // Dispatch
                console.log('Request To Join Project Successful', response.data);
                alert('Request To Join Project Successful');
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Request To Join Project failed', error);
            }
        };

        requestJoin();
    }, [requestButton]);

    const slideLeft = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
        if (deleteUser) {
            const deleteUserRequest = async () => {
                try {
                    const response = await axios.delete(`http://127.0.0.1:3000/admin/deleteuser/${params.userId}`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
                    console.log('Delete project successful', response.data);
                    if (owner === accountId) {
                        router.push('/company/project');
                    } else if (userType === 'admin') {
                        router.push('/admin');
                    }
                } catch (error) {
                    console.error('Delete project failed', error);
                }
            };

            deleteUserRequest();
            setDeleteUser(false);
        }
    }, [deleteUser]);


    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32 mt-4 gap-y-8">
                {/* Personal Details */}
                <div className="flex flex-col rounded-md border-2 border-blue-900 w-full">
                    <div className="group grid grid-cols-4 grid-rows-2">
                        <div className="aspect-h-1 aspect-w-1 overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                                src={userImage !== null ? profile : userImage}
                                alt="Profile Picture"
                                width={300}
                                height={200}
                                className="object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <div className="col-span-3 grid grid-cols-4 gap-2 p-4 mr-10">
                        <div className="col-span-3 flex flex-col">
                                <p className="text-3xl font-bold text-gray-900">{firstName} {lastName}</p>
                                <p className="mt-1 text-sm font-medium text-gray-600">{username}</p>
                            </div>
                            <div className="flex flex-evenly gap-x-4 justify-start items-center">
                                {fetchUserType === 'professional' && 
                                    (<button
                                        type="submit"
                                        onClick={handleHireButton}
                                        className="flex w-[300px] h-[36px] justify-center items-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Hire Professional
                                    </button>)
                                }
                                {(fetchUserType ==='admin') && (
                                <div>
                                    <button
                                        className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        onClick={() => setDeleteUser(true)}
                                    >
                                        Delete user
                                    </button>
                                </div>)}
                                <AiOutlineHeart size={40}/>
                                <AiFillLinkedin size={40}/>
                            </div>
                            <p className="col-span-2 mt-1 text-sm text-left italic text-blue-600">{industryType}</p>
                            {/* <p className="mt-1 text-sm text-right font-medium text-gray-600">Rating {rating}/5</p> */}
                            {/* <p className="mt-1 text-sm text-right font-medium text-gray-600">{skills} skills</p> */}
                            <p className="col-span-4 text-xs text-gray-600">{address}</p>
                            <p className="text-xs text-gray-600">{phoneNumber}</p>
                            <p className="col-span-3 text-left text-xs text-gray-600">{email}</p>
                            {userFileString && 
                                <button onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = userFileString;
                                    link.download = 'file.pdf';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                className="flex justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Download CV
                                </button>
                            }
                        </div>
                        <div className="col-span-4 my-6 mx-10 p-4 rounded-md border-2 border-teal-900">
                            <p className="text-lg font-medium text-gray-900">Description</p>
                            <p className="mt-4 text-left text-xs text-gray-600">{description}</p>
                        </div>
                    </div>
                </div>

                {/* Project List */}
                {fetchUserType === 'professional' ? 
                (<div>
                    <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Project List
                    </h2>
                    <div className="flex flex-col w-full gap-6 mb-10">
                        {projectsList && projectsList.map((item) => (
                        <div key={item.id} className="group grid grid-cols-3 gap-2 p-4 rounded-md border-2 border-blue-900 w-full">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.project_title}</p>
                            {/* <p className="text-md text-right text-blue-900">{item.owner.userName}</p> */}
                            <p className="col-span-2 text-xs italic text-gray-600">{item.start_date} - {item.end_date}</p>
                            <p className="mt-1 text-sm text-right text-gray-600">{item.skills}</p>
                            {/* <p className="text-sm text-gray-600">Rating {item.rating}/5</p> */}
                            {/* <p className="col-span-2 font-medium text-sm italic text-blue-600">"{item.remark}"</p> */}
                            <p className="mt-1 text-sm font-medium text-gray-600">{item.No_professional} Professionals</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">{item.price_budget}</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">{item.expected_working_hours} hours</p>
                        </div>
                        ))}
                    </div>
                </div>)
                :
                (<div>
                    <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Join a project at{' '}
                        <Link href="/company-list" className="font-semibold leading-6 text-blue-900 hover:text-blue-500">
                            {firstName}
                        </Link>
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
                                            onClick={() => handleRequestButton(item.id)}
                                            className="flex mt-4 col-span-2 h-[36px] justify-center items-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Join Project {item.project_title}
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderProjects')} size={40} />
                    </div>
                </div>)}
            </div>
            <Footer/>
        </div>
    )
}
