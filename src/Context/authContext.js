import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    signInWithPhoneNumber,
    signInWithCredential,
} from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, query, where, setDoc, doc } from 'firebase/firestore';
import firestoreDatabase, { auth } from '../Firebase';

const userAuthContext = createContext();

export function useUserAuth() {
    return useContext(userAuthContext);
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function logIn(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                // User signed in successfully
                setUser(userCredential.user);
            })
            return {
                message:"success"
            }
            // const response = LoginUser(email);
        } catch (err) {
            switch (err.code) {
                case 'auth/invalid-email':
                    return ('Invalid email address format.');
                case 'auth/user-disabled':
                    return ('User account has been disabled.');
                case 'auth/user-not-found':
                    return ('User not found.');
                case 'auth/wrong-password':
                    return ('Incorrect password.');
                default:
                    return ('Error signing in:', err.message);
            }
        }
    }
    async function signUp(email, password, displayName) {
        // const { email, name, password, mobile, gender } = data;  
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            // User signed in successfully
            const user = userCredential.user;
            // Update the user's display name
            await updateProfile(user, {
                displayName: displayName,
            })
            return {
                message:"success"
            }
        } catch (err) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    return ('Email address is already in use by another account.');
                case 'auth/invalid-email':
                    return ('Invalid email address format.');
                case 'auth/weak-password':
                    return ('Password should be at least 6 characters long.');
                default:
                    return ('Error signing up:', err.message);
            }

        }
    }

    function logOut() {
        setUser(null);
        return signOut(auth);
    }
    async function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        const userCredential= await signInWithPopup(auth, googleAuthProvider);
        setUser(userCredential.user);
    }
    async function sendCode(phoneNumber){
        try {
            const provider = new auth.PhoneAuthProvider();
            const verificationId = await provider.verifyPhoneNumber(
              phoneNumber,
              new auth.RecaptchaVerifier('recaptcha-container')
            );
            console.log(verificationId);
            // Store the verification ID for later use
            return verificationId;
          } catch (error) {
            console.error('Error sending verification code:', error);
          }
    }
    async function verifCode(verificationCode,code){
        try {
            const credential = auth.PhoneAuthProvider.credential(
              verificationCode,
              code
            );
      
            // Sign in the user with the phone number credential
            await signInWithCredential(auth, credential);
      
          } catch (error) {
            console.error('Error verifying code:', error);
          }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
            setLoading(false);
        });
       
        return unsubscribe;
    }, []);

    return (
        <userAuthContext.Provider
            value={{ user, logIn, signUp, logOut, googleSignIn,sendCode,verifCode, setUser }}
        >
            {!loading && children}
        </userAuthContext.Provider>
    );
}