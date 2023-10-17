import logo from "assets/Logo Expanded.png"
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
    return (
        <div className="bg-white dark:bg-black">
            <section className="relative">
                <Link href="/">
                    <Image
                        src={logo}
                        width={150}
                        alt="connected logo"
                    />
                </Link>
                <div className="flex flex-col justify-center mx-64 my-10 px-20 pb-2 mb-36 rounded-md border-2 border-blue-900">
                    <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in to Connected
                    </h2>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Username or Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Link href="/company">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Log in
                                </button>
                            </Link> 
                        </div>
                    </form>
                    <hr
                        style={{
                            background: '#137DC5', 
                            height: '2px',
                            marginTop: '100px',
                            marginLeft: '-5rem',
                            marginRight: '-5rem',
                        }}
                    />
                    <p className="mt-8 text-center text-sm text-gray-500 pb-8">
                        Don't have an account with us?{' '}
                        <a href="/registration" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </section>
        </div>
    )
}