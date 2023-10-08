import Head from "next/head";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-white dark:bg-black">
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
        <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
              ConnectEd
        </h1> 

        <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              My Unstarted Projects
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 py-2 px-20 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Filter
          </button>
        </div>
        <br></br>
 
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 p-3 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 1
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
                <div className="w-full md:w-2/6 p-4 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 2
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              My Finished Project
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 py-2 px-20 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Filter
          </button>
        </div>
        <br></br>
 
        <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 p-3 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 1
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
                <div className="w-full md:w-2/6 p-4 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 2
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
              My ongoing project
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 py-2 px-20 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Filter
          </button>
        </div>
        <br></br>
 
        <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/6 p-3 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 1
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
                <div className="w-full md:w-2/6 p-4 text-gray-600 dark:text-gray-400">
                  <a href="#link1">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">
                        Project 2
                      </p>
                      <br />
                      <button
                        className="ml-2 py-2 px-10 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        More Info
                      </button>
                    </div>
                  </a>
                </div>
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
