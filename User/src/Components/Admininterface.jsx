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

    useEffect(() => {
        // Fetch orders from the backend
        fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                console.log('Current Orders:', data.currentOrders);
                console.log('Accepted Orders:', data.acceptedOrders);
                console.log('Done Orders:', data.doneOrders);

                // Ensure that all fetched orders are set to currentOrders
                setCurrentOrders(data.currentOrders || []);
                setAcceptedOrders(data.acceptedOrders || []);
                setDoneOrders(data.doneOrders || []);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDone = (token) => {
        console.log('Handle Done Clicked:', token);

        // Find the order in currentOrders or acceptedOrders
        const orderInCurrent = currentOrders.find(order => order.token === token);
        const orderInAccepted = acceptedOrders.find(order => order.token === token);

        if (orderInCurrent) {
            console.log('Order found in Current Orders:', orderInCurrent);
            // Move from Current to Accepted
            setCurrentOrders(currentOrders.filter(order => order.token !== token));
            setAcceptedOrders([...acceptedOrders, orderInCurrent]);

            // Optionally update backend
            fetch(`https://dinein-6bqx.onrender.com/ambika-admin/orders/${token}`, { 
                method: 'PATCH',
                body: JSON.stringify({ status: 'accepted' }), // Update status to 'accepted'
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => console.log('Update Backend Response:', data))
            .catch(error => console.error('Error updating backend:', error));
        } else if (orderInAccepted) {
            console.log('Order found in Accepted Orders:', orderInAccepted);
            // Move from Accepted to Done
            setAcceptedOrders(acceptedOrders.filter(order => order.token !== token));
            setDoneOrders([...doneOrders, orderInAccepted]);

            // Optionally update backend
            fetch(`https://dinein-6bqx.onrender.com/ambika-admin/orders/${token}`, { 
                method: 'PATCH',
                body: JSON.stringify({ status: 'done' }), // Update status to 'done'
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => console.log('Update Backend Response:', data))
            .catch(error => console.error('Error updating backend:', error));
        }
    };

    const handleDecline = (token) => {
        console.log('Handle Decline Clicked:', token);

        // Remove the order from Current or Accepted
        const orderInCurrent = currentOrders.find(order => order.token === token);
        if (orderInCurrent) {
            console.log('Order found in Current Orders:', orderInCurrent);
            setCurrentOrders(currentOrders.filter(order => order.token !== token));

            // Optionally update backend
            fetch(`https://dinein-6bqx.onrender.com/ambika-admin/orders/${token}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => console.log('Delete Backend Response:', data))
            .catch(error => console.error('Error deleting from backend:', error));
        }

        const orderInAccepted = acceptedOrders.find(order => order.token === token);
        if (orderInAccepted) {
            console.log('Order found in Accepted Orders:', orderInAccepted);
            setAcceptedOrders(acceptedOrders.filter(order => order.token !== token));

            // Optionally update backend
            fetch(`https://dinein-6bqx.onrender.com/ambika-admin/orders/${token}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => console.log('Delete Backend Response:', data))
            .catch(error => console.error('Error deleting from backend:', error));
        }
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
                        onDone={() => handleDone(order.token)}
                        onDecline={() => handleDecline(order.token)}
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
                <div className="Done0" style={{ left: 160, top: 20, position: 'absolute', textAlign: 'center', color: '#0D0F11', fontSize: 30, fontFamily: 'Inter', fontWeight: 'bolder', wordWrap: 'break-word' }}>Done</div>
                {doneOrders.map(order => (
                    <AdminCard
                        key={order.token}
                        token={order.token}
                        items={order.items}
                        onDone={() => handleDone(order.token)}
                        onDecline={() => handleDecline(order.token)}
                        showDoneButton={false}
                        showDeclineButton={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Admin;
