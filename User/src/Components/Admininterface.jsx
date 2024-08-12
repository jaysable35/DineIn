import React, { useState, useEffect } from "react";
import '../Components/admin.css';
import AdminCard from "./admincard";
import logo from '../assets/dinein.png';
import io from "socket.io-client";

const socket = io('https://dinein-1.onrender.com', {
    transports: ['websocket', 'polling'],
    withCredentials: true
});

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

function Admin() {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [acceptedOrders, setAcceptedOrders] = useState([]);
    const [doneOrders, setDoneOrders] = useState([]);

    // Fetch orders on component mount
    useEffect(() => {
        fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
    
                // Add a default status of 'current' if missing
                const updatedOrders = data.map(order => ({
                    ...order,
                    status: order.status || 'current'
                }));
    
                // Filter orders based on status
                setCurrentOrders(updatedOrders.filter(order => order.status === 'current'));
                setAcceptedOrders(updatedOrders.filter(order => order.status === 'accepted'));
                setDoneOrders(updatedOrders.filter(order => order.status === 'done'));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDone = async (orderId, token) => {
        try {
            const response = await fetch(`https://dinein-6bqx.onrender.com/ambika-admin/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'accepted',
                    token: Number(token) // Ensure token is a number
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update the order status on the backend');
            }
    
            // Update the local state or UI accordingly
            // For example, remove the order from currentOrders and add to acceptedOrders
            // or trigger a re-fetch to update the UI
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    
    
    
    const handleDecline = (token) => {
        // Remove the order from Current or Accepted and update backend
        setCurrentOrders(currentOrders.filter(order => order.token !== token));
        setAcceptedOrders(acceptedOrders.filter(order => order.token !== token));
        fetch(`https://dinein-6bqx.onrender.com/ambika-admin/orders/${token}`, { method: 'DELETE' });
    };
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 30, position: 'relative' }}>
            {/* Navbar */}
            <div className="Navbar" style={{ width: '100%', height: 80, left: 0, top: 0, position: 'relative', background: '#0D0F11' }}>
                <div className="ViewOrders" style={{ left: 610, top: 24, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 26, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>View Orders</div>
                <div className="LogOut" style={{ right: 30, top: 24, position: 'absolute', textAlign: 'right', color: 'white', fontSize: 26, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Log out</div>
                <img src={logo} alt="DineIn" style={{ marginTop: 10, marginLeft: 10, height: 50, width: 110 }} />
            </div>

            {/* Current Orders */}
            <div className="Current_order" style={{ width: 400, height: 'calc(100vh - 104px)', left: 30, top: 104, position: 'absolute', background: '#EDECE9', borderRadius: 30, overflowY: 'auto', paddingBottom: 20 }}>
                <div className="grey box" style={{ width: 400, height: 70, left: 1, top: 1, position: 'absolute', background: '#DDDBD3', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                <div className="Accepted0" style={{ left: 100, top: 20, position: 'absolute', textAlign: 'center', color: '#0D0F11', fontSize: 30, fontFamily: 'Inter', fontWeight: 'bolder', wordWrap: 'break-word' }}>Current Orders</div>
                {currentOrders.map(order => (
                    <AdminCard
                        key={order.token}
                        token={order.token}
                        items={order.items}
                        onDone={handleDone}
                        onDecline={handleDecline}
                        showDoneButton={true}
                        showDeclineButton={true}
                    />
                ))}
            </div>

            {/* Accepted Orders */}
            <div className="Accepted" style={{ width: 400, height: 'calc(100vh - 104px)', top: 104, position: 'absolute', background: '#EDECE9', borderRadius: 30, overflowY: 'auto', paddingBottom: 20 }}>
                <div className="grey box" style={{ width: '100%', height: 70, position: 'absolute', background: '#DDDBD3', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                <div className="Accepted0" style={{ left: 120, top: 20, position: 'absolute', textAlign: 'center', color: '#0D0F11', fontSize: 30, fontFamily: 'Inter', fontWeight: 'bolder', wordWrap: 'break-word' }}>Accepted</div>
                {acceptedOrders.map(order => (
                    <AdminCard
                        key={order.token}
                        token={order.token}
                        items={order.items}
                        onDone={() => handleDone(order.token)}
                        onDecline={() => handleDecline(order.token)}
                        showDoneButton={true}
                        showDeclineButton={true}
                    />
                ))}
            </div>

            {/* Done Orders */}
            <div className="Done" style={{ width: 400, height: 'calc(100vh - 104px)', right: 30, top: 104, position: 'absolute', background: '#EDECE9', borderRadius: 30, overflowY: 'auto', paddingBottom: 20 }}>
                <div className="grey box" style={{ width: '100%', height: 70, position: 'absolute', background: '#DDDBD3', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                <div className="Accepted0" style={{ left: 170, top: 20, position: 'absolute', textAlign: 'center', color: '#0D0F11', fontSize: 30, fontFamily: 'Inter', fontWeight: 'bolder', wordWrap: 'break-word' }}>Done</div>
                {doneOrders.map(order => (
                    <AdminCard
                        key={order.token}
                        token={order.token}
                        items={order.items}
                        showDoneButton={false}
                        showDeclineButton={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Admin;
