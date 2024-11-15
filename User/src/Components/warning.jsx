import React, { useState,useEffect } from "react";
import Kart from "./orders"; // Assuming Kart component is correctly set up

const Warning = ({ onClose}) => {


    // Function to handle when "YES" is clicked
    const warningAndstop = () => {
 // Notify parent component to disable orders
       onClose(); // Close the warning modal
    };

    useEffect(()=>{
        console.log("value:");
    });

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                zIndex: 1000
            }}
        >
            {/* Pass disableOrder prop to Kart component */}
            {/* {<Kart  disableOrder={disableOrder}/>} */}

            <div
                style={{
                    width: 1011,
                    height: 530,
                    background: 'white',
                    borderRadius: 89,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    textAlign: 'center'
                }}
            >
                <div style={{ color: 'black', fontSize: 64, fontFamily: 'Inter', fontWeight: '400' }}>
                    Stop Accepting Orders
                </div>
                <div
                    style={{
                        color: 'black',
                        fontSize: 36,
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        margin: '20px 0'
                    }}
                >
                    Are You Sure?<br />You will not be able to see and accept new orders
                </div>
                <div style={{ display: 'flex', gap: 30, marginTop: 20 }}>
                    <button
                        style={{
                            width: 289,
                            height: 103,
                            background: '#31B475',
                            borderRadius: 20,
                            color: 'black',
                            fontSize: 64,
                            fontFamily: 'Inter',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={warningAndstop} // Trigger disabling orders when YES is clicked
                    >
                        YES
                    </button>
                    <button
                        style={{
                            width: 289,
                            height: 103,
                            background: '#D9D9D9',
                            borderRadius: 20,
                            color: 'black',
                            fontSize: 64,
                            fontFamily: 'Inter',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={onClose} // Close the warning modal when NO is clicked
                    >
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Warning;
