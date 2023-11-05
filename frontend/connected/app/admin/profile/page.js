'use client';
import profile from "assets/Profile Icon.png";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { sampleCompany } from 'public/data.js';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useUserData } from "context/context";

export default function CompanyProfile() {
    // const { state } = useUserData();
    const state = JSON.parse(localStorage.getItem("loggedUser"));
    const { accountId, userType } = state;
    
    const [companyName, setCompanyName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [ABN, setABN] = useState("");
    const [companyLink, setCompanyLink] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [industryType, setIndustryType] = useState("");
    const [userImage, setUserImage] = useState("");
    const [updateButton, setUpdateButton] = useState(false);

    // Update Button
    const handleUpdateButton = () => {
        setUpdateButton(!updateButton);
    }

    // POST Edit Profile
    useEffect(() => {
        const editProfile = async () => {
            // New data
            const data = {
                firstName: companyName,
                userName: username,
                email: email,
                password: password,
                description: description,
                phoneNumber: phoneNumber,
                address: address,
                socialURL: companyLink,
                abn: ABN,
                tags: industryType.join(","),
                userimage: userImage,
            };

            try {
                const response = await axios.post('http://127.0.0.1:3000/user/editprofile', data, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});
    
                // Dispatch
                console.log('Edit Profile Successful', response.data);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Edit Profile failed', error);
            }
        };

        editProfile();

    }, [updateButton]);

    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/user/profile/${accountId}`);
    
                // Dispatch
                console.log('View Profile Successful', response.data);
                const userData = response.data.content.user;

                // Set variable states
                setCompanyName(userData.firstName);
                setUsername(userData.userName);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setAddress(userData.address);
                setABN(userData.abn);
                setCompanyLink(userData.socialURL);
                setDescription(userData.description);
                setPassword(userData.password);
                setIndustryType(userData.tags);
                setUserImage(userData.userImage);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        viewProfile();
    }, []);

    function handleImageUpload(event) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setUserImage(imageUrl);
    }

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32">
                {/* Page Title */}
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    My Profile
                </h2>

                {/* Profile Picture */}
                <div className="flex gap-4 items-center">
                    <Image
                        src={userImage ? userImage : profile}
                        width={100}
                        height={100}
                        alt="connected logo"
                    />
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload Profile Picture
                        </label>
                        <div className="mt-2">
                            <input
                                id="companyName"
                                name="companyName"
                                type="file"
                                onChange={e => {
                                    const file = e.target.files[0];
                                    const imageUrl = URL.createObjectURL(file);
                                    setUserImage(imageUrl);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>


                {/* Account Credentials */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                            Company Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="companyName"
                                name="companyName"
                                type="text"
                                value={companyName}
                                onChange={e => setCompanyName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Change Password Button */}
                    <div className="flex m-4 pt-4">
                        <button
                            type="submit"
                            className="flex justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Change Password
                        </button>
                    </div>
                </div>


                {/* Personal Details */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <button
                            type="submit"
                            onClick={handleUpdateButton}
                            className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Update Profile Details
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
