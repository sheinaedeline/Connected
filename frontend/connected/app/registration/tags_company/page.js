import Link from "next/link";

export default function Page() {
    return (
        <div className="bg-white dark:bg-black">
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16"> 
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">'

            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
                What industry do you work in?
            </h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <a href="#link1"> {/* Replace with actual URL */}
                    <div className="text-gray-600 dark:text-gray-400">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg">IT & Development</p>
                        </div>
                    </div>
                    </a>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <a href="#link2"> {/* Replace with actual URL */}
                    <div className="text-gray-600 dark:text-gray-400">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg">Research</p>
                        </div>
                    </div>
                    </a>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <a href="#link3"> {/* Replace with actual URL */}
                    <div className="text-gray-600 dark:text-gray-400">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg">Sales & Marketing</p>
                        </div>
                    </div>
                    </a>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <a href="#link4"> {/* Replace with actual URL */}
                    <div className="text-gray-600 dark:text-gray-400">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg">Education</p>
                        </div>
                    </div>
                    </a>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <a href="#link5"> {/* Replace with actual URL */}
                    <div className="text-gray-600 dark:text-gray-400">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg">Writing</p>
                        </div>
                    </div>
                    </a>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <a href="#link6"> {/* Replace with actual URL */}
                    <div className="text-gray-600 dark:text-gray-400">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                        <p className="text-lg">Design & Creative</p>
                        </div>
                    </div>
                    </a>
                </div>
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