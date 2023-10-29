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
    const { state } = useUserData();
    const { accountId, userType } = state;
    console.log('state is profile', state);

    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/user/profile/${accountId}`);
    
                // Dispatch
                console.log('View Profile Successful', response.data);
    
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        viewProfile();
    }, [accountId]);

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
                        src={profile}
                        width={100}
                        alt="connected logo"
                    />
                    {/* Upload Profile Picture Button */}
                    <button
                        type="submit"
                        className="h-8 items-center flex justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Upload Profile Picture
                    </button>
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
                                value={sampleCompany[0].firstName}
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
                                value={sampleCompany[0].lastName}
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
                                value={sampleCompany[0].email}
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
                                value={sampleCompany[0].phoneNumber}
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
                                value={sampleCompany[0].username}
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
                                value={sampleCompany[0].password}
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
                    <div className="col-span-2">
                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                            Company Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="companyName"
                                name="companyName"
                                type="text"
                                value={sampleCompany[0].companyName}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ABN" className="block text-sm font-medium leading-6 text-gray-900">
                            ABN
                        </label>
                        <div className="mt-2">
                            <input
                                id="ABN"
                                name="ABN"
                                type="text"
                                value={sampleCompany[0].ABN}
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
                                value={sampleCompany[0].industry}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="companyLink" className="block text-sm font-medium leading-6 text-gray-900">
                            Company Website
                        </label>
                        <div className="mt-2">
                            <input
                                id="companyLink"
                                name="companyLink"
                                type="url"
                                value={sampleCompany[0].companyLink}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                            Company Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={sampleCompany[0].address}
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
                                value={sampleCompany[0].description}
                                className="block w-full h-32 rounded-md border-0 mb-10 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
