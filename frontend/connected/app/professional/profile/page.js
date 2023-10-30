'use client';
import Image from 'next/image';
import profile from "assets/Profile Icon.png";
import { useState, useEffect } from 'react';
import { sampleProfessional } from '/public/data.js';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useUserData } from "context/context";

export default function ProfessionalProfile() {
    const { state } = useUserData();
    const { accountId, userType } = state;
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [DOB, setDOB] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [industryType, setIndustryType] = useState("");
    const [userImage, setUserImage] = useState("");
    const [updateButton, setUpdateButton] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post('http://localhost/user/uploadcv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload successful', response.data);
            alert('Upload successful'); // Popup on success
        } catch (error) {
            console.error('Upload failed', error);
            alert('Upload failed'); // Popup on failure
        }
    };

    // Update Button
    const handleUpdateButton = () => {
        setUpdateButton(!updateButton);
    }

    // POST Edit Profile
    useEffect(() => {
        const editProfile = async () => {
            // New data
            const data = {
                userId: accountId,
                firstName: firstName,
                lastName: lastName,
                userName: username,
                email: email,
                password: password,
                description: description,
                phoneNumber: phoneNumber,
                address: address,
                socialURL: linkedIn,
                dob: DOB,
                tags: industryType,
                userimage: userImage,
            };

            try {
                const response = await axios.post('http://127.0.0.1:3000/user/editprofile', data);
    
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
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setUsername(userData.userName);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setAddress(userData.address);
                setDOB(userData.DOB);
                setLinkedIn(userData.socialURL);
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
    

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32">
                {/* Page Title */}
                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    My Profile
                </h2>

                {/* Profile Picture */}
                <div className="flex gap-8 items-center">
                    <Image
                        src={userImage ? userImage : profile}
                        width={100}
                        height={100}
                        alt="connected logo"
                    />
                    {/* Upload Profile Picture Button */}
                    {/* <button
                        type="submit"
                        className="h-8 items-center flex justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Upload Profile Picture
                    </button> */}
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload Profile Picture
                        </label>
                        <div className="mt-2">
                            <input
                                id="companyName"
                                name="companyName"
                                type="file"
                                value={userImage}
                                onChange={e => setUserImage(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="upload-cv" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload CV
                        </label>
                        <div className="mt-2">
                            <input
                                id="upload-cv"
                                name="upload-cv"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                // style={{ display: 'none' }}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                {/* Account Credentials */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
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
                </div>

                {/* Change Password Button */}
                <div className="flex justify-end m-4">
                    <button
                        type="submit"
                        className="flex justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Change Password
                    </button>
                </div>


                {/* Personal Details */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="DOB" className="block text-sm font-medium leading-6 text-gray-900">
                            Date of Birth
                        </label>
                        <div className="mt-2">
                            <input
                                id="DOB"
                                name="DOB"
                                type="date"
                                value={DOB}
                                onChange={e => setDOB(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="industryType" className="block text-sm font-medium leading-6 text-gray-900">
                            Industry Type
                        </label>
                        <div className="mt-2">
                            <input
                                id="industryType"
                                name="industryType"
                                type="text"
                                value={industryType}
                                onChange={e => setIndustryType(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="linkedIn" className="block text-sm font-medium leading-6 text-gray-900">
                            Linkedin Link
                        </label>
                        <div className="mt-2">
                            <input
                                id="linkedIn"
                                name="linkedIn"
                                type="url"
                                value={linkedIn}
                                onChange={e => setLinkedIn(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                            Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
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
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="block w-full h-32 rounded-md border-0 mb-10 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
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
                {/* <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    My Tags
                </h2> */}
            </div>
            <Footer/>
        </div>
    )
}
