import React, { useState, useRef } from "react";
import '../Components/admin.css';

function Otplogin() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 3) {
                inputRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleGetOtpClick = () => {
        // Handle the click event for the "Get OTP" button here
        alert('Get OTP clicked');
    };

    return (
        <div className="outercontainer">
            <div className="SurfacePro83" style={{ width: 1440, height: '100vh', position: 'relative', background: '#0D0F11' }}>
                <div className="Rectangle104" style={{ width: '100%', height: '100vh', left: 720, top: 0, position: 'absolute', background: '#FCFCF9' }} />
                <div className="Logo" style={{ left: 302, top: 500, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Logo</div>
                <div className="Welcome" style={{ left: 1050, top: 284, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 60, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>Welcome!</div>
                <button
                    onClick={handleGetOtpClick}
                    style={{
                        left: 1100,
                        top: 800,
                        position: 'absolute',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'Poppins',
                        fontWeight: '600',
                        background: '#0D0F11',
                        border: 'none',
                        borderRadius: 8,
                        width: 160,
                        height: 60,
                        cursor: 'pointer',
                        outline: 'none'
                    }}
                >
                    Get OTP
                </button>
                <div className="EnterTheOneTimePasswordSentTo918895786351" style={{ left: 1000, top: 500, position: 'absolute', textAlign: 'center' }}>
                    <span style={{ color: '#151515', fontSize: 35, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>Enter the One Time Password</span>
                    <br />
                    <span style={{ color: '#827B7B', fontSize: 20, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>Sent to +91-8895786351</span>
                </div>
                <div className="OtpInputs" style={{ position: 'absolute', top: 680, left: 1050, display: 'flex', gap: '16px' }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength="1"
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={{ width: 60, height: 60, background: '#EDECE9', borderRadius: 8, textAlign: 'center', fontSize: 24, fontFamily: 'Poppins', fontWeight: 'bold' }}
                        />
                    ))}
                </div>
                <div className="DonTReceivedTheOtpResendOtp" style={{ left: 1070, top: 760, position: 'absolute', textAlign: 'center' }}>
                    <span style={{ color: '#827B7B', fontSize: 14, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>Don’t received the OTP? </span>
                    <span style={{ color: 'black', fontSize: 14, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>Resend OTP</span>
                </div>
            </div>
        </div>
    );
}

export default Otplogin;
