'use client';
import logo from "assets/Logo Expanded.png"
import professional from "assets/Professional Icon.png"
import company from "assets/Company Icon.png"
import Image from 'next/image'
import Link from 'next/link'
// import { UserContext } from '../../context/UserContext.js';
// import { useState, useEffect, useContext } from "react";

export default function Registration() {
  // const userCtx = useContext(UserContext);
  // const loggedInState = userCtx.loggedIn[0];
  // const userType = userCtx.userType;
  // const hideRight = userCtx.hideRight;
  // console.log("test", userType[0]);

    return (
        <div className="bg-white dark:bg-black">
          <section className="relative pb-20">
            <Link href="/">
                <Image
                    src={logo}
                    width={150}
                    alt="connected logo"
                />
            </Link>
            <div className="flex flex-col justify-center mx-64 my-10 px-20 pb-2 mb-36 rounded-md border-2 border-blue-900">
                <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Join as a Professional or a Company
                </h2>
                  <div className="flex justify-center items-center gap-10 mb-10">
                    <Link href="/registration/professional">
                      <button className="p-4 rounded-md border-2 border-blue-900 focus:bg-blue-100">
                        <Image
                          src={professional}
                          width={150}
                          alt="professional icon" 
                        />
                        I'm a professional, looking for work
                      </button>
                      </Link>
                    <Link href="/registration/company">
                      <button className="p-4 rounded-md border-2 border-blue-900 focus:bg-blue-100">
                        <Image
                          src={company}
                          width={150}
                          alt="professional icon" 
                        />
                        I’m a company, hiring for a project
                      </button>
                    </Link>
                  </div>
                <p className="mt-6 text-center text-sm text-gray-500 pb-8">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                    Log In
                    </a>
                </p>
            </div>
            </section>
        </div>
    )
}