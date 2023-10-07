import Head from "next/head";
import Link from "next/link";
import logo from "assets/Logo Expanded.png"
import Image from 'next/image'

export default function ProfessionalHome() {
  return (
    <div className="bg-white dark:bg-black">
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16"> 
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">'

            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              ConnectEd
            </h1>

            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between">
               <a
                 href="#link1" // Replace with the actual URL for the first box
                    >
                 <div className="max-w-xl p-4 text-gray-600 dark:text-gray-400">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      
                        <p className="text-lg">
                        Unlock your company's potential 
                        </p>
                        <br></br>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                            Showcase your projects and connect with a global network of professionals to drive innovation and growth.
                        </p>
                    </div>
                 </div>
                </a>
                <a
                 href="#link1" // Replace with the actual URL for the first box
                    >
                <div className="max-w-xl p-4 text-gray-600 dark:text-gray-400">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg">
                            Elevate your career and connections
                        </p>
                        <br></br>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                            Discover and apply for exciting projects easily. Expand your horizons and connect with leading companies worldwide.
                        </p>
                    </div>
                </div>
                </a>
            </div>
          </div>
        </div>
        {/* <div
          style={{ backgroundImage: "url(/images/blur.png)" }}
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat bg-cover -z-1"
        /> */}
      </section>
    </div>
  );
}
