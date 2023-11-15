'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiOutlineHeart, AiFillLinkedin } from 'react-icons/ai';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

const options = ['Finance',  'Investment Banking', 'Web Development', 'Manufacturing', 'HR', 'Marketing', 'Retail', 'Accounting'];

export default function ViewProjectID({params}) {

    const router = useRouter();
    const getState = localStorage.getItem("loggedUser");
    const state = JSON.parse(getState);
    const { accountId, userType } = state;
    const [rejectButton, setRejectButton] = useState(false);
    const [approveButton, setApproveButton] = useState(false);
    const [removeButton, setRemoveButton] = useState(false);
    const [projectId, setProjectId] = useState("");
    const [professionalId, setProfessionalId] = useState("");
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
    const [invited_applicants, setInvited_applicants] = useState([]);
    const [deleteProject, setDeleteProject] = useState(false);
    const [approvedList, setApprovedList] = useState([]);
    const [potentialList, setPotentialList] = useState([]);
    const [invitedList, setInvitedList] = useState([]);
    const [requestButton, setRequestButton] = useState(false);

    
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

    const downloadPDF = () => {
        var doc = new jsPDF();
        doc.text('Certificate of Completion', 10, 10);
        doc.text('Project Title: ' + project_title, 10, 20);
        doc.text('End Date: ' + new Date(end_date).toLocaleDateString(), 10, 30);
        doc.text('Experiences: ' + experiences, 10, 40);
        doc.save('Certificate_of_Completion.pdf');
    }

    const slideLeft = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft - 350;
    };

    const slideRight = (id) => {
        var slider = document.getElementById(id);
        slider.scrollLeft = slider.scrollLeft + 350;
    };

    const goEdit = (projectId) => {
        router.push(`/projects/${projectId}`);
    };

    const changeStatus = async (newStatus) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:3000/project/${params.projectId}/updateStatus`,
                { newStatus },
                { headers: { 'Authorization': `Bearer ${state.jwtToken}` }}
            );
            console.log(response.data);
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
    }, []);


    useEffect(() => {
        const viewProject = async () => {
            try {
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
                setStart_date(projectData.start_date);
                setEnd_date(projectData.end_date);
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
                setInvited_applicants(projectData.invited_applicants);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        viewProject();

    }, []);

    
    useEffect(() => {
        const rejectProfessional = async () => {
            console.log(projectId);
            try {
                const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/reject/${professionalId}`, {}, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
                // Dispatch
                console.log('reject', response.data);
                alert('Rejected');
                window.location.reload();
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
                const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/approve/${professionalId}`, {}, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
                
                // Dispatch
                console.log('Approve', response.data);
                alert('Approved');
                window.location.reload();
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Request To approve failed', error);
            }
        };

        approveProfessional();
    }, [approveButton]);

    useEffect(() => {
        const removeProfessional = async () => {
            try {
                const response = await axios.put(`http://127.0.0.1:3000/project/${params.projectId}/remove/${professionalId}`, {}, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
                console.log('remove', response.data);
                alert('Removed');
                window.location.reload();
            } catch (error) {
                console.error('Request To remove failed', error);
            }
        };
    
        if (professionalId) {
            removeProfessional();
        }
    }, [professionalId]);

    useEffect(() => {
        if (deleteProject) {
            const deleteProjectRequest = async () => {
                try {
                    const response = await axios.delete(`http://127.0.0.1:3000/project/${params.projectId}/delete`, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
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

            deleteProjectRequest();
            setDeleteProject(false);
        }
    }, [deleteProject]);

    useEffect(() => {
        const getApproved = async () => {
            const data = { 
                userIds: approved_applicants
            };
            console.log(approved_applicants)

            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/multipleuserdetails`, data);
                // Dispatch

                setApprovedList(response.data.content.userDetailsArr);
                
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View detail failed', error);
            }
    
        };

        getApproved();
    }, [approved_applicants]);

    useEffect(() => {
        const getPotential = async () => {
            const data = { 
                userIds: potential_applicants
            };
            console.log(potential_applicants)

            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/multipleuserdetails`, data);

                // Dispatch
                setPotentialList(response.data.content.userDetailsArr);
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View detail failed', error);
            }
    
        };

        getPotential();
    }, [potential_applicants]);

    useEffect(() => {
        const getInvited = async () => {
            const data = { 
                userIds: invited_applicants
            };
            console.log(invited_applicants)

            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/multipleuserdetails`, data);

                // Dispatch
                setInvitedList(response.data.content.userDetailsArr);
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View detail failed', error);
            }
    
        };

        getInvited();
    }, [invited_applicants]);

    useEffect(() => {
        setApprovedList(approvedList);
    }, [approvedList]);

    useEffect(() => {
        setInvitedList(invitedList);
    }, [invitedList]);

    useEffect(() => {
        setPotentialList(potentialList);
    }, [potentialList]);

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
                alert('Request To Join Project Successfull, good luck!');
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Request To Join Project failed', error);
            }
        };

        requestJoin();
    }, [requestButton]);

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
                const response = await axios.post(`http://127.0.0.1:3000/user/rateProfessionalUser`, data, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
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
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${submitted ? 'bg-gray-350 cursor-default' : 'bg-blue-900 hover:bg-blue-350'}`}
                >
                    Submit
                </button>
            </div>
        );
    }
    

    function ProjectRating({ projectId, userId }) {
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
                userId: userId,
                ratings: rating,
                review: review
            };
    
            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/rateProject`, data, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
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
            <div style={{ border: '1px solid black', padding: '10px', width: '300px' }}>
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
                    style={{ width: '100%', resize: 'none' }}
                />
                <button 
                    onClick={handleSubmit} 
                    disabled={submitted}  
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${submitted ? 'bg-gray-350 cursor-default' : 'bg-blue-900 hover:bg-blue-350'}`}
                    style={{ width: '100%' }}
                >
                    Submit Project Rating
                </button>
            </div>

        );
    }    

    return (
        <div className="bg-white dark:bg-black">
            <Header/>
                {/* project details */}
                <div className="flex flex-col justify-center px-32 mt-4 gap-y-8">
                    <div className="flex flex-col rounded-md border-2 border-blue-900 w-full">
                        <div className="group grid grid-cols-4">
                            <div className="col-span-4 grid grid-cols-4 gap-2 p-4 mr-10">
                                <div className="col-span-2 flex gap-4">
                                    <p className="text-3xl font-bold text-gray-900">{project_title}</p>
                                    <Image
                                        src={tagImages[tags[0]]}
                                        alt=""
                                        width={35}
                                        height={35}
                                        className="object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <div className="col-span-2 flex flex-end gap-x-4 justify-start items-center">
                                    {(owner === accountId || userType === 'admin') && (
                                    <div>
                                        <button
                                        className="w-32 justify-center rounded-md ring-1 ring-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-blue-900 shadow-sm hover:bg-blue-200"
                                        onClick={() => goEdit(params.projectId)}>
                                        Edit Project
                                        </button>
                                    </div>)}
                                    {owner === accountId && status === 'new' && (
                                        <button
                                            className="w-32 ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                            onClick={() => changeStatus('ongoing')}
                                        >
                                            Start Project
                                        </button>
                                    )}

                                    {owner === accountId && status === 'ongoing' && (
                                        <button
                                            className="w-32 ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                            onClick={() => changeStatus('completed')}
                                        >
                                            Finish Project
                                        </button>
                                    )}
                                    {(owner === accountId || userType === 'admin') && (
                                    <div>
                                        <button
                                            className="w-32 ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                            onClick={() => setDeleteProject(true)}
                                        >
                                            Delete Project
                                        </button>
                                    </div>)}
                                </div>
                                <div className="col-span-4 flex gap-3 mt-1">
                                    <p className=" text-sm text-left italic text-blue-600">
                                    Start Date: {new Date(start_date).toLocaleDateString()}
                                    </p>
                                    <p className=" text-sm text-left italic text-blue-600">
                                    End Date: {new Date(end_date).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="col-span-4 flex gap-3 mt-1">
                                    <p className=" text-md font-medium ">Project in {tags.join(", ")}</p>
                                    <p className="text-md font-medium text-gray-600">Held in {online_offline}</p>
                                </div>

                                <div className="col-span-4 flex gap-3 mt-1">
                                    <p className="text-sm text-gray-600">${price_budget}/hr</p>
                                    <div>&middot;</div>
                                    <p className="text-sm text-gray-600">No. of Professionals: {No_professional}</p>
                                    <div>&middot;</div>
                                    <p className="text-sm text-gray-600">Expected Working Hours: {expected_working_hours}hr</p>
                                </div>

                                {/* <div className="col-span-4 flex gap-3 mt-1"> */}
                                <p className="col-span-4 text-sm text-left ">Skills Preferred: {skills}</p>
                                <p className="col-span-4 text-sm text-left  ">Experiences: {experiences}</p>
                                <p className="col-span-4 text-sm text-left  ">Required Professional Criteria: {req_prof_criteria}</p>
                                {/* </div> */}
                                <div className="col-span-4 my-6 mx-10 p-4 rounded-md border-2 border-teal-900">
                                    <p className="text-lg font-medium text-gray-900">Description</p>
                                    <p className="mt-4 text-left text-xs text-gray-600">{description}</p>
                                </div>
                                
                            </div>
                                
                            </div>
                            {(userType === 'professional') && (
                            <button
                                type="submit"
                                onClick={() => handleRequestButton(params.projectId)}
                                className="flex mt-4 col-span-2 h-[36px] justify-center items-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-350 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Join Project
                            </button>)}
                    </div>
                </div>
                
            
            {owner === accountId && (status === 'new' || status === 'ongoing') && (
            <div className='px-4'>
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Onboard{' '}
                <a href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-350">
                    Professionals
                </a>
                </h2>
                <div className="relative flex items-center">
                <MdChevronLeft className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {approvedList.length > 0 && approvedList.map((item) => (
                    // rest of your code
                        <a key={item.id} className="group rounded-md border-2 border-blue-900 w-[300px] h-[200px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                            <div className="grid grid-cols-2 gap-2 p-4">
                                <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
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
                <MdChevronRight className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                </div>
            </div>
            )}

            {owner === accountId && (status === 'new' || status === 'ongoing') && (
            <div className='px-4'>
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Applied{' '}
                <a href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-350">
                    Professionals
                </a>
                </h2>
                <div className="relative flex items-center">
                <MdChevronLeft className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {potentialList.length > 0 && potentialList.map((item) => (
                    // rest of your code
                        <a key={item.id} className="group rounded-md border-2 border-blue-900 w-[300px] h-[200px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                            <div className="grid grid-cols-2 gap-2 p-4">
                                <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                                <p className="col-span-2 mt-1 text-sm text-blue-600">{item.industry}</p>
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
                <MdChevronRight className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                </div>
            </div>
            )}

            {owner === accountId && (status === 'new' || status === 'ongoing') && (
            <div className='px-4'>
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                Invited{' '}
                <a href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-350">
                    Professionals
                </a>
                </h2>
                <div className="relative flex items-center">
                <MdChevronLeft className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {invitedList.length > 0 && invitedList.map((item) => (
                    // rest of your code
                        <a key={item.id} className="group rounded-md border-2 border-blue-900 w-[300px] h-[200px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                            <div className="grid grid-cols-2 gap-2 p-4">
                                <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                                <p className="col-span-2 mt-1 text-sm text-blue-600">{item.industry}</p>
                          </div>
                        </a>
                    ))}
                </div>
                <MdChevronRight className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                </div>
            </div>
            )}
            

            {owner === accountId && (status === 'completed') && (
                <div className='px-4'>
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Past{' '}
                    <a href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-350">
                      Professionals
                    </a>
                </h2>
                <div className="relative flex items-center">
                  <MdChevronLeft className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                  <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                  {approvedList.length > 0 && approvedList.map((item) => (
                      <a key={item.id} className="group rounded-md border-2 border-blue-900 w-[300px] h-[435px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                        <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                            <Rating projectId={params.projectId} userId={item.id} />
                        </div>
                    </a>
                    ))}
                  </div>
                  <MdChevronRight className="opacity-35 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                </div>
              </div> 
            )}
            { (status === 'completed' && approved_applicants.includes(accountId)) && (
                <div>
                    <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900" style={{ textAlign: 'center' }}>
                        Rate Project
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ProjectRating projectId={params.projectId} userId ={accountId} />
                        <button  className="ml-2 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"     onClick={downloadPDF}>Download Certificate</button> 
                    </div>
                    
                </div>
            
            )}
            <Footer/>
        </div>
    )
}
