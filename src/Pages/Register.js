import React,{useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { useUserAuth } from '../Context/authContext';
import PhLogin from './PhLogin';

function Register() {
    const {user, logIn, signUp, logOut, googleSignIn} =useUserAuth();
    const navigate= useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit= async (e) => { 
        e.preventDefault();
        try {
            const res = await signUp(email,password, name);
            console.log(res);
            if(res.message==="success") {
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div>
            <h1> Register Yourself </h1>
            <form>
            <div>
                    <label htmlFor="name">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Jacob Arnold"
                    />
                </div>
                <div>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email address"
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>

                
            <PhLogin/>
            <p>
                        Already have an account?{' '}
                        <Link to="/login" >
                            Sign in
                        </Link>
                    </p> 
                    <button
                    type="submit"
                    onClick={onSubmit}
                >
                    Sign up
                </button>
            </form>           
        </div>
    )
}

export default Register