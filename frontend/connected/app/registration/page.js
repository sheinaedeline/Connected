import logo from "assets/Logo Expanded.png"
import professional from "assets/Professional Icon.png"
import company from "assets/Company Icon.png"
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
    return (
        <div className="bg-white dark:bg-black">
            <Image
                src={logo}
                width={150}
                alt="connected logo"
            />
            <div className="flex flex-col justify-center mx-64 my-10 px-20 pb-2 mb-36 rounded-md border-2 border-blue-900">
                <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Join as a Professional or a Company
                </h2>
                  <div className="flex justify-center items-center gap-10 mb-10">
                    <button className="p-4 rounded-md border-2 border-blue-900 focus:bg-blue-100">
                      <Image
                        src={professional}
                        width={150}
                        alt="professional icon" 
                      />
                      I'm a professional, looking for work
                    </button>
                    <button className="p-4 rounded-md border-2 border-blue-900 focus:bg-blue-100">
                      <Image
                        src={company}
                        width={150}
                        alt="professional icon" 
                      />
                      I’m a company, hiring for a project
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <Link href="/home">
                      <button
                          type="submit"
                          className="flex justify-center rounded-md bg-blue-900 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                          Create Account
                      </button>
                    </Link> 
                  </div>
                <p className="mt-8 text-center text-sm text-gray-500 pb-8">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                    Log In
                    </a>
                </p>
            </div>
        </div>
    )
}