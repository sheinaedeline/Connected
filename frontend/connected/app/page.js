import Link from 'next/link'

export default function Home() {
  return (  
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
       <Link href="/registration">Sign Up</Link>
      </div>
      <div className="container">
        <h1 className="title">connectED's starting page</h1>
        <div className="buttons">
          <button className="register">Register</button>
          <button className="login">Login</button>
        </div>
        <div className="description">
          <p>connectED is a platform that connects professional users with companies.</p>
          <p>Professional users can use connectED to find new job opportunities, learn about new companies, and network with other professionals.</p>
          <p>Companies can use connectED to find qualified candidates for open positions, promote their brand, and connect with potential customers.</p>
        </div>
      </div>
    </main>
  )
}
