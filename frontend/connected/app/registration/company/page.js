import Head from "next/head";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-white dark:bg-black">
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16"> 
          <div className="w-full pb-5 mx-auto text-center md:w-11/12">'

            <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              ConnectEd
            </h1>

            <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }} className="registration-form">
              <form action="/register" method="post">
                {/* First Name */}
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="firstName" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                {/* Last Name */}
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="lastName" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                {/* Add the rest of the form fields similarly */}
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="companyName" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Company Name:</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="companyEmail" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Company Email:</label>
                  <input
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="phoneNumber" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Phone Number:</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="companyAddress" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Company Address:</label>
                  <input
                    type="text"
                    id="companyAddress"
                    name="companyAddress"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="ABN" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>ABN:</label>
                  <input
                    type="number"
                    id="ABN"
                    name="ABN"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="industryType" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Industry Type:</label>
                  <input
                    type="text"
                    id="industryType"
                    name="industryType"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="companyWebsite" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Company website:</label>
                  <input
                    type="text"
                    id="companyWebsite"
                    name="companyWebsite"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                {/* Password */}
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: '15px', textAlign: 'left' }} className="form-group">
                  <label htmlFor="confirmPassword" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                </div>
                
                <button type="submit" style={{ backgroundColor: '#007BFF', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
              </form>
              <p>Already have an account? <a href="/signin">Click here to sign in.</a></p>
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
