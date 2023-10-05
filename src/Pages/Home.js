import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <section>
        <div><Link to="/login">Login</Link></div>
        <div><Link to="/register">Sign Up</Link></div>  
        </section>
    </div>
  )
}

export default Home