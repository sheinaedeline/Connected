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
import { useHistory } from 'react-router-dom';


export default function ViewProjectID({params}) {
    const router = useRouter();
    // const { state } = useUserData();
    const getState = localStorage.getItem("loggedUser");
    const state = JSON.parse(getState);
    const { accountId, userType } = state;
    const [userId, setUserId] = useState(params.userId);
    // const [hireButton, setHireButton] = useState(false);
    // const [requestButton, setRequestButton] = useState(false);

    const [rejectButton, setRejectButton] = useState(false);
    const [approveButton, setApproveButton] = useState(false);
    const [removeButton, setRemoveButton] = useState(false);

    const [projectId, setProjectId] = useState("");
    const [professionalId, setProfessionalId] = useState("");
    
    const [fetchUserType, setFetchUserType] = useState("");
    const [projectsList, setProjectsList] = useState([]);
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


    // GET View Project
    useEffect(() => {
        const viewProject = async () => {
            try {
                // const response = await axios.get(`http://127.0.0.1:3000/project/653b55906f170de1334a03ba`);
                const response = await axios.get(`http://127.0.0.1:3000/project/${params.projectId}`);
    
                // Dispatch
                console.log('View Project Successful', response.data);
                const projectData = response.data.content;

                // Set variable states
                set_id(projectData._id);
                setOwner(projectData.owner);
                setProject_title(projectData.project_title);
                setTags(projectData.tags);
                setDescription(projectData.description);
                setStart_date(projectData.start_date.$date);
                setEnd_date(projectData.end_date.$date);
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
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        viewProject();

    }, []);

    

    // PUT Request Join Project
    useEffect(() => {
        const rejectProfessional = async () => {
            console.log(projectId);
            try {
                const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/reject/${professionalId}`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
                // Dispatch
                console.log('reject', response.data);
                alert('Rejected');
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Request To reject failed', error);
            }
        };

        rejectProfessional();
    }, [rejectButton]);

    useEffect(() => {
        const approveProfessional = async () => {
            console.log(projectId, professionalId);
            try {
                // const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/approve/${professionalId}`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
                const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/approve/${potential_applicants[0]}`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
                
                // Dispatch
                console.log('Approve', response.data);
                alert('Approved');
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Request To approve failed', error);
            }
        };

        approveProfessional();
    }, [approveButton]);

    useEffect(() => {
        const removeProfessional = async () => {
            console.log(projectId);
            try {
                const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/remove/${professionalId}`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
                // Dispatch
                console.log('remove', response.data);
                alert('Removed');
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Request To remove failed', error);
            }
        };

        removeProfessional();
    }, [removeButton]);

    const slideLeft = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    function Rating({ projectId, userId }) {
        const [rating, setRating] = useState(0);
        const [submitted, setSubmitted] = useState(false);
    
        const handleStarClick = (starIndex) => {
            if (!submitted) {
                setRating(starIndex);
            }
        };
    
        const rateProfessional = async () => {
            const data = { 
                projectId: projectId,
                userId: userId,
                ratings: rating
            };
    
            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/rateProfessionalUser`, data);
    
                // Dispatch
                console.log('rate Successful', response.data);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('rate failed', error);
            }
        };
    
        const handleSubmit = () => {
            // Handle the submission of the rating here
            console.log(`Rating: ${rating}`);
            rateProfessional();
            setSubmitted(true);
        };
    
        return (
            <div>
                <p>Rating:</p>
                {[1, 2, 3, 4, 5].map((starIndex) => (
                    <span 
                        key={starIndex} 
                        onClick={() => handleStarClick(starIndex)}
                        style={{ cursor: submitted ? 'default' : 'pointer', color: starIndex <= rating ? 'gold' : 'gray' }}
                    >
                        ★
                    </span>
                ))}
                <br></br>
                <button 
                    onClick={handleSubmit} 
                    disabled={submitted}  
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${submitted ? 'bg-gray-500 cursor-default' : 'bg-blue-900 hover:bg-blue-500'}`}
                >
                    Submit
                </button>
            </div>
        );
    }
    

    function ProjectRating({ projectId }) {
        const [rating, setRating] = useState(0);
        const [review, setReview] = useState('');
        const [submitted, setSubmitted] = useState(false);
    
        const handleStarClick = (starIndex) => {
            if (!submitted) {
                setRating(starIndex);
            }
        };
    
        const handleReviewChange = (event) => {
            if (!submitted) {
                setReview(event.target.value);
            }
        };
    
        const rateProject = async () => {
            const data = { 
                projectId: projectId,
                ratings: rating,
                reviews: review
            };
    
            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/rateProject`, data);
    
                // Dispatch
                console.log('rate Successful', response.data);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('rate failed', error);
            }
        };
    
        const handleSubmit = () => {
            // Handle the submission of the rating and comment here
            console.log(`Rating: ${rating}, Review: ${review}`);
            rateProject();
            setSubmitted(true);
        };
    
        return (
            <div>
                <p>Project Rating:</p>
                {[1, 2, 3, 4, 5].map((starIndex) => (
                    <span 
                        key={starIndex} 
                        onClick={() => handleStarClick(starIndex)}
                        style={{ cursor: submitted ? 'default' : 'pointer', color: starIndex <= rating ? 'gold' : 'gray' }}
                    >
                        ★
                    </span>
                ))}
                <br></br>
                <textarea 
                    value={review}
                    onChange={handleReviewChange}
                    disabled={submitted}
                    className="rounded-md border-2 border-blue-900"
                />
                <button 
                    onClick={handleSubmit} 
                    disabled={submitted}  
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${submitted ? 'bg-gray-500 cursor-default' : 'bg-blue-900 hover:bg-blue-500'}`}
                >
                    Submit Project Rating
                </button>
            </div>
        );
    }    

    const [deleteProject, setDeleteProject] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (deleteProject) {
            const deleteProjectRequest = async () => {
                try {
                    const response = await axios.delete(`http://127.0.0.1:3000/project/${params.projectId}/delete`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
                    console.log('Delete project successful', response.data);
                    if (owner === accountId) {
                        history.push('/company/project');
                    } else if (userType === 'admin') {
                        history.push('/admin');
                    }
                } catch (error) {
                    console.error('Delete project failed', error);
                }
            };

            deleteProjectRequest();
            setDeleteProject(false);
        }
    }, [deleteProject]);

    const changeStatus = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/updateStatus`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        changeStatus();
    }, []);
    


    return (
        <div className="bg-white dark:bg-black">
            <Header/>

                <div className="flex flex-col justify-center px-32 mt-4 gap-y-8">
                    <div className="flex flex-col rounded-md border-2 border-blue-900 w-full">
                        <div className="group grid grid-cols-4 grid-rows-2">
                            <div className="col-span-3 grid grid-cols-4 gap-2 p-4 mr-10">
                                <div className="col-span-3 flex flex-col">
                                    <p className="text-3xl font-bold text-gray-900">{project_title}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-600">{_id}</p>
                                </div>
                                <div className="flex flex-evenly gap-x-4 justify-start items-center">
                                    <AiOutlineHeart size={40}/>
                                    <AiFillLinkedin size={40}/>
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
                                {owner === accountId && status === 'new' && (
                                <button
                                className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onClick={startProject}
                                >
                                    Start Project
                                </button>)}

                                {owner === accountId && status === 'ongoing' && (
                                <button
                                    className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onClick={startProject}
                                >
                                    Finish Project
                                </button>)}
                                {owner === accountId || userType === 'admin' && (
                                <div>
                                    <button
                                        className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        onClick={() => setDeleteProject(true)}
                                    >
                                        Delete Project
                                    </button>
                                </div>)}
                            </div>
                            <div className="col-span-4 my-6 mx-10 p-4 rounded-md border-2 border-teal-900">
                                <p className="text-lg font-medium text-gray-900">Description</p>
                                <p className="mt-4 text-left text-xs text-gray-600">{description}</p>
                            </div>
                    </div>
                </div>
                
            
            {owner === accountId && (status === 'new' || status === 'ongoing') && (
            <div>
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Onboard{' '}
                <a href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-500">
                    Professionals
                </a>
                </h2>
                <div className="relative flex items-center">
                <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {approved_applicants.length > 0 && approved_applicants.map((item) => (
                    // rest of your code
                        <a key={item.id} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
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
                                <p className="col-span-2 mt-1 text-sm text-blue-600">{item.industry}</p>
                                <p className="mt-1 text-sm font-medium text-gray-600">Rating {item.rating}/5</p>
                                <p className="mt-1 text-sm text-right font-medium text-gray-600">{item.skills} skills</p>
                                <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                                <button
                                    className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onClick={() => {
                                        setProfessionalId(item.id);
                                        setRemoveButton(!removeButton);
                                    }}
                                >
                                    Remove
                                </button>
                          </div>
                        </a>
                    ))}
                </div>
                <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                </div>
            </div>
            )}

            {owner === accountId && (status === 'new' || status === 'ongoing') && (
            <div>
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Applied{' '}
                <a href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-500">
                    Professionals
                </a>
                </h2>
                <div className="relative flex items-center">
                <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {potential_applicants.length > 0 && potential_applicants.map((item) => (
                    // rest of your code
                        <a key={item.id} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
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
                                <p className="col-span-2 mt-1 text-sm text-blue-600">{item.industry}</p>
                                <p className="mt-1 text-sm font-medium text-gray-600">Rating {item.rating}/5</p>
                                <p className="mt-1 text-sm text-right font-medium text-gray-600">{item.skills} skills</p>
                                <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                                <button
                                className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                onClick={() => {
                                    setProfessionalId(item.id);
                                    setApproveButton(!approveButton);
                                }}
                            >
                                Accept
                            </button>
                            <button
                                className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                onClick={() => {
                                    setProfessionalId(item.id);
                                    setRejectButton(!rejectButton);
                                }}
                            >
                                Reject
                            </button>
                          </div>
                        </a>
                    ))}
                </div>
                <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                </div>
            </div>
            )}
            {owner === accountId && (status === 'completed') && (
                <div>
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Past{' '}
                    <a href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-500">
                      Professionals
                    </a>
                </h2>
                <div className="relative flex items-center">
                  <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                  <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                  {approved_applicants.length > 0 && approved_applicants.map((item) => (
                      <a key={item.id} className="group rounded-md border-2 border-blue-900 w-[300px] h-[450px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
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
                            <Rating />
                        </div>
                    </a>
                    ))}
                  </div>
                  <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                </div>
              </div> 
            )}
            {userType === 'Professional' && status === 'completed' && (
                <div>
                    <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Rate Project
                    </h2>
                    <div className="relative flex items-center">
                        <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                        <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                            <ProjectRating/>
                        </div>
                        <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                    </div>
                </div> 
            )}
            <Footer/>
        </div>
    )
}
