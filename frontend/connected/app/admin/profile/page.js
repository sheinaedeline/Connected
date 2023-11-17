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
    const [userImage, setUserImage] = useState(null);
    const [userImageString, setUserImageString] = useState('');
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
                userimage: userImage,
            };

            try {
                const formData = new FormData();
                if(userImage !== null){
                    formData.append('userimage',userImage);
                }
                const fields = ['firstName', 'userName', 'email', 'password', 'description', 'phoneNumber', 'address', 'socialURL', 'abn'];
                for (let field of fields){
                    formData.append(field, data[field]);
                }
                const response = await axios.post('http://127.0.0.1:3000/user/editprofile', formData, { headers: { 'Authorization': `Bearer ${state.jwtToken}`, 'content-type': 'multipart/form-data'}});
    
                // Dispatch
                console.log('Edit Profile Successful', response.data);
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Edit Profile failed', error);
                alert('Edit Profile failed');
            }
        };

        editProfile();
        return () => URL.revokeObjectURL(userImage);

    }, [updateButton, userImage]);

    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/user/profile/${accountId}`);
    
                // Dispatch
                console.log('View Profile Successful', response.data);
                const userData = response.data.content.user;
                console.log(`file is ${userData.userImage}`);
                // Set variable states
                setCompanyName(userData.firstName);
                setUsername(userData.userName);
                setEmail(userData.email);
                setPhoneNumber(userData.phoneNumber);
                setAddress(userData.address);
                setABN(userData.abn);
                setCompanyLink(userData.socialURL);
                setDescription(userData.description);
                setIndustryType(userData.tags);
                if(userData.userImage){
                    setUserImageString(userData.userImage);
                }
               
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
                alert('View Profile failed');
            }
        };

        viewProfile();
    }, []);

    function fileToDataUrl(file) {
        if(file === null){ //Checks if the passed file is null, if it is null then return nothing
            return new Promise((resolve,reject) => {
                resolve(null);
            })
        } else { //If the file is not null then process it and return the file reader as a promise
            const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
            const valid = validFileTypes.find(type => type === file.type);
            // Bad data, let's walk away.
            if (!valid) {
                throw Error('provided file is not a png, jpg or jpeg image.');
            }
            
            const reader = new FileReader();
            const dataUrlPromise = new Promise((resolve,reject) => {
                reader.onerror = reject;
                reader.onload = () => resolve(reader.result);
            });
            reader.readAsDataURL(file);
            return dataUrlPromise;
        }
    }

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        const fileBase64 = await fileToDataUrl(file)
        setUserImage(file);
        setUserImageString(fileBase64)
    }
    

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32">

                <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    My Profile
                </h2>

                
                <div className="flex gap-4 items-center">
                    <Image
                        src={userImageString !== '' ? userImageString : profile}
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
                                onChange={handleImageUpload}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>


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

                    <div className="flex m-4 pt-4">
                        <button
                            type="submit"
                            className="flex justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Change Password
                        </button>
                    </div>
                </div>


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
