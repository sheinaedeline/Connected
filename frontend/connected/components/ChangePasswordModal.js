'use client';
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

export default function ChangePasswordModal({modalState, setModalState}) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    function closeModal() {
        setModalState(false);
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

    const handleChangePassword = async () => {
        console.log('Password changed to:', newPassword);
        const userData = localStorage.getItem("loggedUser");
        const state = JSON.parse(userData);
        
        const data = {
            userId: state.accountId,
            password: newPassword,
        };

        try {
            const response = await axios.post('http://127.0.0.1:3000/user/editprofile', data, { headers: { 'Authorization': `Bearer ${state.jwtToken}` }});

            // Dispatch
            console.log('Change Password Successful', response.data);
            closeModal(); // Close the modal after changing the password
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('Change Password failed', error);
            alert('Change Password failed');
        }
        
    };

    return (
        <>
        {/* Inspo from https://headlessui.com/react/dialog */}
        <Transition appear show={modalState} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h2"
                        className="text-lg font-medium leading-6"
                    >
                        Change Password
                    </Dialog.Title>
                    <form className="space-y-6 mt-2" action="#" method="POST">
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
                        

                    <div className="mt-4">
                        <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleChangePassword}
                        >
                        Change Password
                        </button>
                    </div>
                    </form>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
    )
}
