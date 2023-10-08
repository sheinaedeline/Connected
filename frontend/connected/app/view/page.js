'use client';
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { sampleProfessional } from '/public/data.js';
import { AiOutlineHeart, AiFillLinkedin } from 'react-icons/ai';
import trading from "assets/Trading Background.png";
import Footer from '/components/Footer.js';


export default function ViewProfessional() {

    const [searchInput, setSearchInput] = useState("");
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleSearch = () => {
        console.log(searchInput);
    };


    return (
        <div className="bg-white dark:bg-black">
            <div className="flex justify-between">
                <Link href="/company">
                    <Image
                        src={logo}
                        width={150}
                        alt="connected logo"
                    />
                </Link>
                <div className="flex justify-evenly items-center gap-4">
                    {/* Search Bar */}
                    <form className="flex" role="search">
                        <input
                            id="searchBar"
                            name="searchBar"
                            type="text"
                            placeholder="Search"
                            value={searchInput}
                            onChange={handleChange}
                            className="block w-full rounded-l-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        >
                        </input>
                        <button
                            type="submit"
                            className="flex justify-center items-center rounded-r-lg bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            onClick={handleSearch}
                        >
                            <Image
                                src={search}
                                width={26}
                                alt="connected logo"
                            />
                        </button>
                    </form>
                    {/* My Projects */}
                    <Link href="/projects">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            My Projects
                        </button>
                    </Link> 
                    {/* Logout */}
                    <Link href="/">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Logout
                        </button>
                    </Link> 
                    {/* Profile Icon */}
                    <Link href="/professional/profile">
                        <Image
                            src={profile}
                            width={38}
                            alt="connected logo"
                        />
                    </Link>
                </div>
            </div>

            <div className="flex flex-col justify-center px-32 mt-4 gap-y-8">
                {/* Personal Details */}
                <div className="flex flex-col rounded-md border-2 border-blue-900 w-full">
                    {sampleProfessional.map((item) => (
                    <div key={item.id} className="group grid grid-cols-4 grid-rows-2">
                        <div className="aspect-h-1 aspect-w-1 overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                width={300}
                                height={200}
                                className="object-cover object-center group-hover:opacity-75"
                            />
                        </div>
                        <div className="col-span-3 grid grid-cols-4 gap-2 p-4 mr-10">
                            <p className="col-span-3 text-3xl font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                            <div className="flex flex-evenly gap-x-4 justify-start items-center">
                                <button
                                    type="submit"
                                    className="flex w-[150px] h-[30px] justify-center items-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Hire
                                </button>
                                <AiOutlineHeart size={40}/>
                                <AiFillLinkedin size={40}/>
                            </div>
                            <p className="col-span-2 mt-1 text-sm text-left italic text-blue-600">{item.industry}</p>
                            <p className="mt-1 text-sm text-right font-medium text-gray-600">Rating {item.rating}/5</p>
                            <p className="mt-1 text-sm text-right font-medium text-gray-600">{item.skills} skills</p>
                            <p className="col-span-4 text-xs text-gray-600">{item.address}</p>
                            <p className="text-xs text-gray-600">{item.phoneNumber}</p>
                            <p className="col-span-3 text-left text-xs text-gray-600">{item.email}</p>
                        </div>
                        <div className="col-span-4 my-6 mx-10 p-4 rounded-md border-2 border-teal-900">
                            <p className="text-lg font-medium text-gray-900">Description</p>
                            <p className="mt-4 text-left text-xs text-gray-600">{item.description}</p>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Project History */}
                <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Project History
                </h2>
                <div className="flex flex-col w-full gap-6 mb-10">
                    {sampleProfessional[0].projectHistory.map((item) => (
                    <div key={item.id} className="group grid grid-cols-3 gap-2 p-4 rounded-md border-2 border-blue-900 w-full">
                        <p className="col-span-2 text-lg font-bold text-gray-900">{item.name}</p>
                        <p className="text-md text-right text-blue-900">{item.company} Company</p>
                        <p className="col-span-2 text-xs italic text-gray-600">{item.start_date} - {item.end_date}</p>
                        <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                        <p className="text-sm text-gray-600">Rating {item.rating}/5</p>
                        <p className="col-span-2 font-medium text-sm italic text-blue-600">"{item.remark}"</p>
                        <p className="mt-1 text-sm font-medium text-gray-600">${item.price}</p>
                        <p className="mt-1 text-sm font-medium text-gray-600">${item.pricePerHr}/hr</p>
                        <p className="mt-1 text-sm font-medium text-gray-600">{item.hours} hours</p>
                    </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
