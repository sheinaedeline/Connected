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

export default function CompanyList() {

  const state = JSON.parse(localStorage.getItem("loggedUser"));
  const { accountId, userType } = state;
  const [professionalList, setProfessionalList] = useState([]);

  useEffect(() => {
    const viewProfile = async () => {
        const data = { 
          userType:"company",
          size: 5,
          page: 1
        };

        try {
            const response = await axios.post(`http://127.0.0.1:3000/user/users/`, data);

            // Dispatch
            console.log('Get company Successful', response.data);
            setProfessionalList(response.data.content.usersList);
            // Set variable states
            
        } catch (error) {
            // Handle any errors (e.g., display an error message)
            console.error('View company failed', error);
        }
    };

    viewProfile();
}, [accountId]);

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32">
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Available{' '}
                      <a href="/company-list" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        Companies
                      </a>
                  </h2>
                  <div className="grid grid-cols-4 gap-x-10">
                    {professionalList.length > 0 && professionalList.map((item) => (
                        <Link key={item.id} href={`/view/${item.id}`} className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                        <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                          <Image
                                src={item.userImage ? item.userImage : "https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg"}
                                alt={item.imageAlt}
                                width={300}
                                height={200}
                                className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                            <p className="col-span-2 mt-1 text-sm text-blue-600">{item.email}</p>
                            {item.rating && <p className="mt-1 text-sm font-medium text-gray-600">Rating {item.averageUserRating}/5</p>}
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.phoneNumber} </p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                      </Link>
                      ))} 
                  </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
