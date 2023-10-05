import React, { useEffect } from 'react'
import { useUserAuth } from '../Context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import firestoreDatabase, { auth } from '../Firebase';

function Private() {
  const { user, logIn, signUp, logOut, googleSignIn } = useUserAuth();
  const navigate = useNavigate()
  async function handleLogout() { 
    await logOut();
    navigate('/login');
   }
  console.log(user);
  return (
    <div>
      {user && (
        <div>
          <h1>Welcome {user.displayName}</h1>
          <button onClick={handleLogout}>logOut</button>
        </div>
      )}
    </div>
  )
}

export default Private