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


export default function ViewProfile() {
    const { state } = useUserData();
    const { accountId, userType } = state;
    const router = useRouter();
    
    // Profile Data
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
    const [projectsList, setProjectsList] = useState([]);

    const handleEditButton = () => {
        if (userType === 'company') {
            router.push('/company/profile');
        } else if (userType === 'professional') {
            router.push('/professional/profile');
        }
    };

    // GET View Profile && GET Projects
    useEffect(() => {
        
        const getaproject = async () => {
            
            try {
                const response = await axios.get(`http://127.0.0.1:3000/project/653b55906f170de1334a03ba`);
    
                // Dispatch
                console.log('Geta Projects Successful', response.data);
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Geta Projects failed', error);
            }
        };

        // viewProfile();
        // getProjects();
        getaproject();
    }, []);

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32 mt-4 gap-y-8">
                {/* Personal Details */}

                {/* Project List */}
                <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Project List
                </h2>
            </div>
            <Footer/>
        </div>
    )
}
