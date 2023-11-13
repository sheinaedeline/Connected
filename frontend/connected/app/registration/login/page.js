import Head from "next/head";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-white dark:bg-black">
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16"> 
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">

            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              ConnectEd
            </h1>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <form action="/login" method="post">
                <div className="text-gray-600 dark:text-gray-400">
                  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center">
                    <label for="username" class="block text-lg">Password:</label>
                    <input type="email" id="username" name="username" class="w-3/4 p-2 rounded border" required></input>
                  </div>
                </div>
                <div class="text-gray-600 dark:text-gray-400">
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center">
                  <label for="password" class="text-lg">Password:</label>
                  <input type="password" id="password" name="password" class="w-3/4 p-2 rounded border" required></input>
                </div>
                <br></br>
                </div>
                <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Sign In</button>
              </form>
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
