import Head from "next/head";
import Link from "next/link";

const buttonStyles = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16"> 
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">'
            
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'right' }}>
            <button style={{ ...buttonStyles, marginRight: '10px' }}>Register</button>
            <button style={buttonStyles}>Login</button>
          </div>


            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              ConnectEd
            </h1>
            
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                Connecting professionals, building success through projects        
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                Bringing expertise together, one project at a time. Find the best people to work with. Build connections.
                </p>

            </div>

            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between">
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
            </div>


            <div className="mt-6 text-center md:ml-6">
              <a
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-gray-300 transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white"
                aria-label="learn more"
                rel="noreferrer"
                href="https://github.com/minor/plutonium/"
              >
                <span className="flex justify-center">GitHub Link</span>
              </a>
              <br className="sm:hidden" />
            </div>
          </div>
          <div className="relative w-full py-10 mx-auto text-center md:py-32 md:my-12 md:w-10/12">
            <div className="relative z-10">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://unsplash.com/photos/e9TrFZZ72DQ"
              >
                <img
                  className="transition duration-700 shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105"
                  src="/images/placeholder.webp"
                  alt="Placeholder Image"
                />
              </a>
            </div>
            <p className="z-10 my-8 text-sm font-medium text-gray-500">
              Maybe we&apos;re bringing brightness too?
            </p>
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
