import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    getAuth,
} from "firebase/auth";
import OtpInput from 'otp-input-react'
import { auth } from "../Firebase";
import { useUserAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

const PhLogin = () => {
    const { setUser, user, logIn, signUp, logOut, googleSignIn } = useUserAuth();
    const navigate= useNavigate();
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);

    // Initialize Firebase Authentication

    function onCaptchaVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',

                callback: (response) => {
                    onSignup();
                },
                "expired-callback": () => { },
            },
                auth // Use the initialized auth instance
            );
        }
    }

    function onSignup(e) {
        e.preventDefault();
        setLoading(true);
        onCaptchaVerify();
        const appVerifier = window.recaptchaVerifier;
        // Ensure that ph is a valid phone number in international format (e.g., "+1234567890")
        const formattedPh = "+" + ph;

        signInWithPhoneNumber(auth, formattedPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                console.log("OTP sent successfully!");
                
            })
            .catch((error) => {
                console.error("Error sending verification code:", error);
                setLoading(false);
                
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult.confirm(otp).then(async (res) => {
            console.log(res);
            setLoading(false);
            // navigate('/home')
        })
            .catch((err) => {
                console.error("Error verifying code:", err);
                setLoading(false);
                // navigate('/login');
            });
    }

    return (
        <section>
            <div>
                <div id="recaptcha-container"></div>
                {!user && (
                    <div >
                        {showOTP ? (
                            <>
                                <label htmlFor="otp">Enter your OTP</label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                ></OtpInput>
                                <button onClick={onOTPVerify} disabled={loading}>
                                    Verify OTP
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="phoneNumber">Verify your phone number</label>
                                <PhoneInput
                                    country={"in"}
                                    value={ph}
                                    onChange={(value) => setPh(value)} // Use the provided value argument
                                />
                                <button onClick={onSignup}>
                                    <span>Send code via SMS</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

        {/* </div> */}
    </section >
  );
};

export default PhLogin;
