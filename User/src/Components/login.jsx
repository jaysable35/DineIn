import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; // Make sure to import your CSS file

function Login() {
    const [mobileNumber, setMobileNumber] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        // Regex to allow only numeric characters
        const numericValue = value.replace(/\D/g, '');
        setMobileNumber(numericValue);
    };

    const handleGetOTP = () => {
        // Perform validation or logic here
        if (mobileNumber.length === 10) {
            // Proceed with OTP generation or navigate to OTP component
            console.log('Mobile number:', mobileNumber);
        } else {
            alert('Please enter a valid 10-digit mobile number');
        }
    };

    return (
        <div className='outer-container'>
            <div className='inner-container'>
                <div className='Welcome'>Welcome!</div>
                {/* <div className='textmsg'>We will send you an <span className='otp'>One Time Password </span> 
                    on this mobile number
                </div> */}
                <div className='mobile'>Enter your mobile number</div>
                <div className="input-container">
                    <span>+91 |</span>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={handleChange}
                        minLength={10}
                        maxLength={10}
                        placeholder="Enter mobile number"
                    />
                </div>
                <div className='otpbutton'>
                    <Link to ="/ambika/user">
                    <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
