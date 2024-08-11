import React from 'react';
import { useLocation } from 'react-router-dom';

function FinalOrder() {
    const location = useLocation();
    const { token, cart } = location.state || { token: null, cart: [] };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#FCFCF9' }}>
            <div className="YourPaymentIsSuccessful" style={{ left: 65, top: 277, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>
                Your Order is placed Successfully
            </div>
            <div className="Group" style={{ width: 134, height: 134, left: 121, top: 48, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="Vector" style={{ width: 134, height: 134, position: 'absolute', background: '#30383C', borderRadius: '50%' }}></div>
                <svg viewBox="0 0 24 24" style={{ width: '60px', height: '60px', position: 'relative', top: '5px', left: '5px' }} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12l5 5L23 4" />
                </svg>
            </div>
            <div className="TokenNo" style={{ left: 96, top: 210, position: 'absolute', color: '#3E9E11', fontSize: 32, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>
                Token No. {token}
            </div>

            {/* Display cart items */}
            <div style={{ position: 'absolute', top: 330, left: 10, right: 10, width: 'calc(100% - 20px)', backgroundColor: 'grey', display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', padding: '20px', borderRadius: '16px' }}>
                <h2 style={{ color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '600' }}>Cart Details</h2>
                {Array.isArray(cart) && cart.length > 0 ? (
                    cart.map(item => (
                        <div key={item.id} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginBottom: '10px', borderRadius: '16px' }}>
                            <div style={{ flex: '1', fontWeight: 'bold' }}>{item.name}</div>
                            <div style={{ flex: '1', textAlign: 'center' }}>{item.quantity}</div>
                            <div style={{ flex: '1', textAlign: 'right' }}>₹{item.price * item.quantity}</div>
                        </div>
                    ))
                ) : (
                    <div>No items in the cart.</div>
                )}
                
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '10px', marginTop: '10px', borderRadius: '16px'}}>
                    <div style={{ flex: '1', fontWeight: 'bold' }}>Total</div>
                    <div style={{ flex: '1', textAlign: 'center' }}></div>
                    <div style={{ flex: '1', textAlign: 'right' }}>₹{getTotal()}</div>
                </div>
            </div>
        </div>
    );
}

export default FinalOrder;
