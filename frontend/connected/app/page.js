import Head from "next/head";
import Link from "next/link";
import logo from "assets/Logo Expanded.png";
import Image from 'next/image';
import Footer from '/components/Footer.js';
import professional from "assets/Professional Icon.png"
import company from "assets/Company Icon.png"

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
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">
            
          <div className="flex justify-between">
          <Link href="/company">
              <Image
                  src={logo}
                  width={150}
                  alt="connected logo"
              />
          </Link>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'right' }}>
            <Link href="/registration"><button style={{ ...buttonStyles, marginRight: '10px' }}>Register</button></Link>
            <Link href="/login"><button style={buttonStyles}>Login</button></Link>
          </div>
          </div>

            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              ConnectEd
            </h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
              <div className="max-w-xl bg-white dark:bg-gray-800 p-4 text-left">
                <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">
                  Connecting professionals, building success through projects
                </p>
                <br></br>
                <p className="text-base text-gray-500 dark:text-gray-300">
                  Bringing expertise together, one project at a time. Find the best people to work with. Build connections.
                </p>
                <div className="mt-6 text-left md:ml-6">
                  <Link href="/registration">
                    <button style={{ ...buttonStyles, marginRight: '10px' }}>Get Started</button>
                  </Link>
                  <br className="sm:hidden" />
                </div>
              </div>
              
              <div className="grid-item">
                <Link href="/registration/professional">
                  <button className="p-4 rounded-md">
                        <Image
                          src={professional}
                          width={150}
                          alt="professional icon" 
                        />
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 flex">
              <div className="p-4 text-gray-600 dark:text-gray-400 flex-1">
                <div className="bg-blue-500 dark:bg-gray-800 p-4 rounded-lg">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
                  <div className="grid-item">
                    <Link href="/registration/professional">
                      <button className="p-4 rounded-md">
                        <Image
                          src={company}
                          width={150}
                          alt="professional icon" 
                        />
                      </button>
                    </Link>
                  </div>
                  <p className="text-lg font-bold">Unlock your company's potential</p>
                </div>
                  
                  <br></br>
                  <p className="text-xs text-gray-900 dark:text-gray-300">
                    Showcase your projects and connect with a global network of professionals to drive innovation and growth.
                  </p>
                  <br></br>
                  <p className="text-sm font-semibold">Post a project and find top talent</p>
                  <br></br>
                  <p className="text-xs text-gray-900 dark:text-gray-300">
                    Finding talented professionals doesn’t have to be challenging and time-consuming. Post a project and wait for applications!
                  </p>
                  <br></br>
                  <p className="text-sm font-semibold">Connect with global excellence</p>
                  <br></br>
                  <p className="text-xs text-gray-900 dark:text-gray-300">
                    Connected allows you to be connected with professionals around the world.
                  </p>
                </div>
              </div>
              
              <div className="p-4 text-gray-600 dark:text-gray-400 flex-1 rounded">
                <div className="bg-blue-400 dark:bg-gray-800 p-4 rounded-lg">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
                  <div className="grid-item">
                    <Link href="/registration/professional">
                      <button className="p-4 rounded-md">
                            <Image
                              src={professional}
                              width={150}
                              alt="professional icon" 
                            />
                      </button>
                    </Link>
                  </div>
                  <p className="text-lg font-bold">Elevate your career and connections</p>
                </div>  
                  <br></br>
                  <p className="text-xs text-gray-900 dark:text-gray-300">
                    Discover and apply for exciting projects easily. Expand your horizons and connect with leading companies worldwide.
                  </p>
                  <br></br>
                  <p className="text-sm font-semibold">Apply quickly to projects with ease</p>
                  <br></br>
                  <p className="text-xs text-gray-900 dark:text-gray-300">
                    Finding interesting projects to work on shouldn’t be tedious. Just apply on the project posts you're interested in!
                  </p>
                  <br></br>
                  <p className="text-sm font-semibold">Earn certificates and recognition</p>
                  <br></br>
                  <p className="text-xs text-gray-900 dark:text-gray-300">
                    Enhance your profile and experiences through working on various projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          style={{ backgroundImage: "url(/images/blur.png)" }}
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat bg-cover -z-1"
        /> */}
        <Footer/>
      </section>
    </div>
  );
}
