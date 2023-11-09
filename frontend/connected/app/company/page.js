'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { trendingProjects } from '/public/data.js';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import { useUserData } from "../../context/context";
import axios from 'axios';
import Link from 'next/link';
import tradingBackground from 'assets/Trading Background.png';

export default function CompanyHome() {
    // const { state } = useUserData();
    const state = JSON.parse(localStorage.getItem("loggedUser"));
    const { accountId, userType } = state;

    const [professionalList, setProfessionalList] = useState([]);

    // GET View Profile
    useEffect(() => {
        const viewProfile = async () => {
            const data = { 
              userType:"professional",
              size: 5,
              page: 1
            };

            try {
                const response = await axios.post(`http://127.0.0.1:3000/user/users/`, data);
    
                // Dispatch
                console.log('Get professional Successful', response.data);
                setProfessionalList(response.data.content.usersList);
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }
        };

        viewProfile();
    }, [accountId]);

    const slideLeft = (id) => {
      var slider = document.getElementById(id);
      slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = (id) => {
      var slider = document.getElementById(id);
      slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32 gap-y-8">
                {/* Trending Projects */}
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Trending{' '}
                      <Link href="/projects" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        Projects
                      </Link>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProjects')} size={40} />
                    <div id='sliderTrendingProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {trendingProjects.map((item) => (
                        <a key={item.id} href={item.href} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                              src={item.imageSrc}
                              alt=""
                              width={300}
                              height={200}
                              className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.name}</p>
                            <p className="col-span-2 text-xs italic text-gray-600">{item.startDate} - {item.endDate}</p>
                            <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">${item.price}</p>
                            <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProjects')} size={40} />
                  </div>
                </div>

                {/* Hire Professionals */}
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Hire{' '}
                      <Link href="/professional-list" className="font-semibold leading-6 text-teal-900 hover:text-blue-500">
                        Professionals
                      </Link>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderTrendingProfessionals')} size={40} />
                    <div id='sliderTrendingProfessionals' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {professionalList.length > 0 && professionalList.map((item) => (
                        <Link key={item.id} href={`/view/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                              src={tradingBackground}
                              alt=""
                              width={300}
                              height={200}
                              className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                            <p className="col-span-2 mt-1 text-sm text-blue-600">{item.tags}</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">Rating {item.rating}/5</p>
                            <p className="mt-1 text-sm text-right font-medium text-gray-600">{item.skills} skills</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderTrendingProfessionals')} size={40} />
                  </div>
                </div>

                {/* Projects in Manufacturing */}
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Projects in {' '}
                      <Link href="/companies" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        Manufacturing
                      </Link>
                  </h2>
                  <div className="relative flex items-center">
                    <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideLeft('sliderProjects')} size={40} />
                    <div id='sliderProjects' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {trendingProjects.filter(item => {return item.industry === 'Manufacturing'}).map((item) => (
                        <a key={item.id} href={item.href} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                              src={item.imageSrc ? item.imageSrc : profile}
                              alt=""
                              width={300}
                              height={200}
                              className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.name}</p>
                            <p className="col-span-2 text-xs italic text-gray-600">{item.startDate} - {item.endDate}</p>
                            <p className="col-span-2 text-sm font-medium text-blue-900">{item.company} Company</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">${item.price}</p>
                            <p className="mt-1 text-sm text-right text-gray-600">{item.industry}</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={() => slideRight('sliderProjects')} size={40} />
                  </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}
