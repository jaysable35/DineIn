import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../Components/admin.css';

function Adminlogin() {
    const [mobileNumber, setMobileNumber] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || (/^\d{0,10}$/.test(value))) {
            setMobileNumber(value);
        }
    };

    return (
        <div className="outercontainer">
            <div className="Rectangle104" style={{ width: '100%', height: '100vh', left: 720, top: 0, position: 'absolute', background: '#FCFCF9' }} />
            <div className="Logo" style={{ left: 302, top: 500, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 36, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Logo</div>
            <div className="WeWillSendYouAnOneTimePasswordOnThisMobileNumber" style={{ left: 878, top: 362, position: 'absolute', textAlign: 'center', marginTop: 80 }}>
                <span style={{ color: '#827B7B', fontSize: 35, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>We will send you an </span>
                <span style={{ color: '#151515', fontSize: 35, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>One Time Password<br /></span>
                <span style={{ color: '#827B7B', fontSize: 35, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>on this mobile number</span>
            </div>
            <div className="Welcome" style={{ left: 1050, top: 284, position: 'absolute', textAlign: 'center', justifyContent: 'center', color: 'black', fontSize: 60, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word' }}>Welcome!</div>
            <div className="EnterYourMobileNumber" style={{ left: 1100, top: 501, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 25, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word', marginTop: 80 }}>Enter your mobile number</div>
            <div className="Rectangle105">
                <input
                    type="text"
                    value={mobileNumber}
                    onChange={handleInputChange}
                    style={{ width: 353, height: 60, left: 1050, top: 546, position: 'absolute', background: '#EDECE9', borderRadius: 8, marginTop: 80, textAlign: 'left', paddingLeft: '55px', color: '#404040', fontWeight: 'bold' }}
                />
            </div>
            <div className="91" style={{ left: 1060, top: 640, position: 'absolute', textAlign: 'center', color: '#827B7B', fontSize: 20, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>+91</div>
            <div className="Vector2" style={{ width: 1, height: 28.5, left: 1100, top: 640, position: 'absolute', border: '1px #B6ADAD solid' }}></div>
            <div className="Rectangle106">
                <button style={{ width: 200, height: 60, left: 1130, top: 750, position: 'absolute', background: '#0D0F11', color: 'white', borderRadius: 8, fontSize: 25 }}>Get OTP</button>
                
            </div>
        </div>
    )
}

export default Adminlogin;
