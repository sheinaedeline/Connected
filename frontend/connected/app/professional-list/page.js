'use client';
import Image from 'next/image';
import { useState } from 'react';
import { trendingProfessionals } from '/public/data.js';
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';

export default function ProfessionalList() {

    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32">
                <div>
                  <h2 className="my-4 text-3xl font-bold leading-9 tracking-tight text-gray-900">
                      Trending{' '}
                      <a href="/professional-list" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        Professionals
                      </a>
                  </h2>
                  <div className="grid grid-cols-4 gap-x-10">
                      {trendingProfessionals.map((item) => (
                        <a key={item.id} href="/view" className="group rounded-md border-2 border-blue-900 w-[300px] h-[400px] inline-block m-4 cursor-pointer hover:scale-105 ease-in-out duration-300">
                          <div className="aspect-h-1 aspect-w-1  h-[200px] overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              width={300}
                              height={200}
                              className="object-cover object-center group-hover:opacity-75"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <p className="col-span-2 text-lg font-bold text-gray-900">{item.firstName} {item.lastName}</p>
                            <p className="col-span-2 mt-1 text-sm text-blue-600">{item.industry}</p>
                            <p className="mt-1 text-sm font-medium text-gray-600">Rating {item.rating}/5</p>
                            <p className="mt-1 text-sm text-right font-medium text-gray-600">{item.skills} skills</p>
                            <p className="col-span-2 text-xs text-gray-600 truncate">{item.description}</p>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
