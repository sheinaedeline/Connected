'use client';
import logo from "assets/Logo Expanded.png";
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationCompany() {
    const router = useRouter();
    const options = ['Finance',  'Investment Banking', 'Web Development', 'Manufacturing', 'HR', 'Marketing', 'Retail', 'Accounting'];

    const [companyName, setCompanyName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailDomain, setEmailDomain] = useState(true);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [emailMatch, setEmailMatch] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [ABN, setABN] = useState("");
    const [companyLink, setCompanyLink] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [industryType, setIndustryType] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if (confirmEmail) {
            setEmailMatch(e.target.value === confirmEmail);
        }
    };

    const handleEmailDomain = (e) => {
        const personalEmails = ["@gmail", "@yahoo", "@live", "@outlook", "@hotmail", "@aol", "@aim", "@titan", "@icloud"];

        // If email is a personal email domain
        const domain = e.target.value.split('@')[1].split('.')[0];
        
        if (personalEmails.includes(`@${domain}`)) {
            setEmailDomain(false);
        } else {
            setEmailDomain(true);
        }
    }

    const handleConfirmEmail = (e) => {
        setConfirmEmail(e.target.value);
        setEmailMatch(email === e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if (confirmPassword) {
            setPasswordMatch(e.target.value === confirmPassword);
        }
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(password === e.target.value);
    };


    const handleChange = (event) => {
      setIndustryType(event.target.value);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract data
        const data = {
            userType: 'company',
            firstName: companyName,
            userName: username,
            email: email,
            password: password,
            description: description,
            phoneNumber: phoneNumber,
            address: address,
            socialURL: companyLink,
            abn: ABN,
            tags: industryType,
        };


        // Make an HTTP POST request to your API route
        try {
            const response = await axios.post('http://127.0.0.1:3000/user/register', data);
            // Handle the response as needed (e.g., show a success message or redirect the user)
            console.log('Registration successful', response.data);
            const payloadData = {
                accountId: response.data.content._id, 
                userType: response.data.content.userType,
                jwtToken: response.data.content.jwtToken,
            };

            // Set the userId in local storage
            localStorage.setItem("loggedUser", JSON.stringify(payloadData));
            router.push('/company');
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="bg-white dark:bg-black">
            <div className="flex justify-between">
                <Link href="/">
                    <Image
                        src={logo}
                        width={150}
                        alt="connected logo"
                    />
                </Link>
                <p className="mt-4 mr-8 text-center text-sm text-gray-500">
                    Looking for work?{' '}
                    <a href="/registration/professional" className="font-semibold leading-6 text-blue-600 hover:text-blue-00">
                    Join as a Professional
                    </a>
                </p>
            </div>
            <div className="flex flex-col justify-center mx-64 my-10 px-20 pb-2 mb-36 rounded-md border-2 border-blue-900">
                <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up to find talented professionals
                </h2>
                <form className="space-y-6" action="#" method="POST">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                                Company Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    required
                                    value={companyName}
                                    onChange={e => setCompanyName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="companyLink" className="block text-sm font-medium leading-6 text-gray-900">
                                Company Link
                            </label>
                            <div className="mt-2">
                                <input
                                    id="companyLink"
                                    name="companyLink"
                                    type="url"
                                    required
                                    value={companyLink}
                                    onChange={e => setCompanyLink(e.target.value)}
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
                                    required
                                    value={ABN}
                                    onChange={e => setABN(e.target.value)}
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
                                    required
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="industryType" className="block text-sm font-medium leading-6 text-gray-900">
                                Industry Type
                            </label>
                            {/* <div className="mt-2">
                                <input
                                    id="industryType"
                                    name="industryType"
                                    type="text"
                                    required
                                    value={industryType}
                                    onChange={e => setIndustryType(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div> */}
                            <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" id="dropdown" value={industryType} onChange={handleChange}>
                                {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                                ))}
                            </select>

                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Brief Description
                            </label>
                            <div className="mt-2">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
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
                                    required
                                    value={email}
                                    onChange={handleEmail}
                                    onBlur={handleEmailDomain}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {!emailDomain && <p className="text-xs text-red-400">Email should not be a personal one!</p>}
                        </div>
                        <div>
                            <label htmlFor="confirmEmail" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmEmail"
                                    name="confirmEmail"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={confirmEmail}
                                    onChange={handleConfirmEmail}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {!emailMatch && <p className="text-xs text-red-400">Emails do not match!</p>}
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
                                    required
                                    value={password}
                                    onChange={handlePassword}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={handleConfirmPassword}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {!passwordMatch && <p className="text-xs text-red-400">Passwords do not match!</p>}
                        </div>
                    </div>
                    

                    <div>
                        <Link href="/company">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Create Account
                            </button>
                        </Link> 
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500 pb-8">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                    Log In
                    </a>
                </p>
            </div>
        </div>
    )
}
