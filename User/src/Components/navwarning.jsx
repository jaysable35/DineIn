import React from "react";

const Navwarning = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '55px', // Adjust this value as needed to position it below "View Orders"
            width: '100%',
        }}>
            <div className="Group32" style={{
                width: 295,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* Yellow Rectangle with centered text inside */}
                <div className="Rectangle173" style={{
                    width: 265,
                    height: 20, // Adjust height if necessary to fit the text well
                    background: '#E1DB19',
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5px' // Padding to add some space around the text
                }}>
                    <div className="ClickOnLogInButtonToAcceptNewOrders" style={{
                        color: 'black',
                        fontSize: 10,
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        textAlign: 'center',
                        wordWrap: 'break-word'
                    }}>
                        Click on Log In button to accept new orders
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navwarning;
