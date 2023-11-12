'use client';
import logo from "assets/Logo Expanded.png";
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useUserData } from "../../context/context";
import { AiOutlineSmile } from 'react-icons/ai';
// import { UserContext } from '../context/UserContext.js';

export default function Login() {
    const router = useRouter();
    // const userCtx = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hiddenEmail, setHiddenEmail] = useState("");
    const [forgetPassword, setForgetPassword] = useState(false);
    const [temporaryPassword, setTemporaryPassword] = useState("");
    const [correctTempPassword, setCorrectTempPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    // const { dispatch } = useUserData();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract data
        const data = {
            email: email,
            password: password,
        };

        // Make an HTTP POST request to your API route
        try {
            const response = await axios.post('http://127.0.0.1:3000/user/login', data);

            // Dispatch
            console.log('Login successful', response.data);
            const payloadData = {
                accountId: response.data.content._id, 
                userType: response.data.content.userType,
                jwtToken: response.data.content.jwtToken,
            };

            // userCtx.loggedIn[1](true);
            // userCtx.accountId[1](response.data.content._id);
            // userCtx.userType[1](response.data.content.userType);
            // userCtx.jwtToken[1](response.data.content.jwtToken);

            // Set the userId in local storage
            localStorage.setItem("loggedUser", JSON.stringify(payloadData));
            // dispatch({ type: 'SET_USER_STATE', payload: payloadData});

            // Home redirect
            if (response.data.content.userType === 'company') {
                router.push('/company');
            } else if (response.data.content.userType === 'professional') {
                router.push('/professional');
            }
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('Login Failed', error);
        }
    };

    const handleForgetButton = async () => {
        if (hiddenEmail === "") {
            const hidden = email.split("@")[0];
            const domain = email.split("@")[1];
            const finalEmail = hidden[0] + "***" + hidden[hidden.length - 1] + "@" + domain;
            setHiddenEmail(finalEmail);
        };

        try {
            const response = await axios.post(`http://127.0.0.1:3000/user/forgetpassword/${email}`);

            // Dispatch
            console.log('Forget Password successful', response.data);
            setCorrectTempPassword(response.data.content);
            setForgetPassword(true);
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('Forget Password Failed', error);
        }
    };

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
        if (confirmPassword) {
            setPasswordMatch(e.target.value === confirmPassword);
        }
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(newPassword === e.target.value);
    };

    const handleResetPassword = async () => {
        // Login data
        const loginData = {
            email: email,
            password: temporaryPassword,
        };

        // New Data
        const data = {
            email: email,
            password: newPassword,
        };

        try {
            // Login
            const login = await axios.post('http://127.0.0.1:3000/user/login', loginData);
            const payloadData = {
                accountId: login.data.content._id, 
                userType: login.data.content.userType,
                jwtToken: login.data.content.jwtToken,
            };

            // Set the userId in local storage
            localStorage.setItem("loggedUser", JSON.stringify(payloadData));
            
            // Reset Password
            const response = await axios.post('http://127.0.0.1:3000/user/editprofile', data, { headers: { 'Authorization': `Bearer ${login.data.content.jwtToken}` }});

            // Dispatch
            console.log('Reset Password Successful', response.data);
            // Home redirect
            if (login.data.content.userType === 'company') {
                router.push('/company');
            } else if (login.data.content.userType === 'professional') {
                router.push('/professional');
            }
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('Reset Password Failed', error);
        }
    };

    // Check if inputted temporary password is correct
    const handleChangePassword = () => {
        if (temporaryPassword === correctTempPassword) {
            setChangePassword(true);
        } else {
            alert("Incorrect temporary password entered.");
        }
    };

    return (
        <div className="bg-white dark:bg-black">
            <section className="relative">
                <Link href="/">
                    <Image
                        src={logo}
                        width={150}
                        alt="connected logo"
                    />
                </Link>
                {!forgetPassword && (
                <div className="flex flex-col justify-center mx-64 my-10 px-20 pb-2 mb-36 rounded-md border-2 border-blue-900">
                    <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to Connected
                    </h2>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <button type="button" onClick={handleForgetButton} className="font-semibold text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Link href="/company">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Log in
                                </button>
                            </Link> 
                        </div>
                    </form>
                    <hr
                        style={{
                            background: '#137DC5', 
                            height: '2px',
                            marginTop: '100px',
                            marginLeft: '-5rem',
                            marginRight: '-5rem',
                        }}
                    />
                    <p className="mt-8 text-center text-sm text-gray-500 pb-8">
                        Don't have an account with us?{' '}
                        <a href="/registration" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </p>
                </div>
                )}
                
                {/* Forget Button Clicked */}
                {forgetPassword && !changePassword && (
                <div className="flex flex-col justify-center mx-64 my-10 px-20 pb-2 mb-36 rounded-md border-2 border-blue-900">
                    <h2 className=" my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Help is on the way! <AiOutlineSmile className="inline-block"/>
                    </h2>
                    <div className="block sm:inline pb-4">We have sent an email to <strong className="font-bold">{hiddenEmail}</strong> with a temporary password. To reset your password, enter in the temporary first.</div>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="temporaryPassword" className="pt-3 block text-sm font-medium leading-6 text-gray-900">
                                Temporary Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="temporaryPassword"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={temporaryPassword}
                                    onChange={e => setTemporaryPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleChangePassword}
                            className="flex w-full justify-center rounded-md bg-blue-900 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Continue
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500 pb-8">
                        Didn't receive your temporary password?{' '}
                        <button type="button" onClick={handleForgetButton} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Resend email
                        </button>
                    </p>
                </div>
                )}

                {/* Correct Temporary Password Entered --> Change Password */}
                {changePassword && (
                <div className="flex flex-col justify-center mx-64 my-10 px-20 pb-2 mb-36 rounded-md border-2 border-blue-900">
                    <h2 className=" my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Reset your password
                    </h2>
                    <form className="space-y-6 mb-8" action="#" method="POST">
                        <div className="block sm:inline pb-4"><strong className="font-bold">Enter a new password for your account.</strong> The password should be at least 8 characters long. To make it stronger, use upper and lower case letters, numbers, and special characters like !\"?$%^&.</div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="newPassword"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={newPassword}
                                        onChange={handleNewPassword}
                                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm New Password
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

                        <button
                            type="button"
                            onClick={handleResetPassword}
                            className="flex w-full justify-center rounded-md bg-blue-900 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
                )}
            </section>
        </div>
    )
}