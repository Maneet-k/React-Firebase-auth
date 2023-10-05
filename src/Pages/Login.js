import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../Context/authContext';
import { signInWithCredential } from 'firebase/auth';

function Login() {
    const {user, logIn, googleSignIn,sendCode,verifyCode} =useUserAuth();
    const navigate= useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [code, setCode] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault(); 
        const res= await logIn(email, password);
        if(res.message==="success") {
            navigate('/home');
        }
    }
    
    const handleGoogleSignIn= async(e) => {
        googleSignIn();
    }
    useEffect(()=>{
        if (user) {
            navigate('/home');
        }
    })
    return (
        <div>
            <h1> Login </h1>
            <form>
                <div>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        type="email"
                        label="Email address"
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
                        label="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>

                <button
                    type="submit"
                    onClick={onSubmit}
                >
                    Sign In
                </button>
            </form>
            <button onClick={handleGoogleSignIn}>Continue with google</button>
            <p>
                        Doesn't have an account?{' '}
                        <Link to="/register" >
                            Register
                        </Link>
                    </p>            
        </div>
    )
}

export default Login