import React, { useState, useEffect } from "react";
import '../Components/admin.css';
import AdminCard from "./admincard";
import logo from '../assets/dinein.png';
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_LOCAL, {
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
    const [orderId,setOrderId]=useState("");

    // Fetch orders on component mount
    useEffect(() => {
        fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard')
            .then(response => response.json())
            .then(data => {
                // Separate orders based on status
                const currentOrders = data.filter(order => order.status === 'current');
                setCurrentOrders(currentOrders);
                console.log("current orders:", currentOrders);
    
                const acceptedOrders = data.filter(order => order.status === 'accepted');
                setAcceptedOrders(acceptedOrders);
                console.log("accepted orders:", acceptedOrders);
    
                const doneOrders = data.filter(order => order.status === 'done');
                setDoneOrders(doneOrders);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    

    const handleDone = async (Id, currentStatus) => {
        try {
            const nextStatus = currentStatus === 'current' ? 'accepted' : 'done';
            
            // Make a POST request to the backend with the Id and status
            const response = await fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: nextStatus,
                    id: Id,
                }),
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to update order status');
            }
    
            console.log(`Order moved to ${nextStatus}Orders:`, result);
    
            // Update the state based on the nextStatus
            if (nextStatus === 'accepted') {
                setAcceptedOrders(prevOrders => [...prevOrders, result.acceptedOrder]);
                setCurrentOrders(prevOrders => prevOrders.filter(order => order._id !== Id));
            } else if (nextStatus === 'done') {
                setDoneOrders(prevOrders => [result.doneOrder, ...prevOrders]);
                setAcceptedOrders(prevOrders => prevOrders.filter(order => order._id !== Id));
            }
        } catch (error) {
            console.error('Error updating order status:', error.message);
        }
    };
    
    
    

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard');
            const data = await response.json();
    
            // Filter orders based on their status
            const currentOrders = data.filter(order => order.status === 'current');
            const acceptedOrders = data.filter(order => order.status === 'accepted');
            const doneOrders = data.filter(order => order.status === 'done');
    
            setCurrentOrders(currentOrders);
            setAcceptedOrders(acceptedOrders);
            setDoneOrders(doneOrders);
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        }
    };
    
    
    const handleDecline = async (id) => {
        try {
            // Make a DELETE request to remove the order from the backend
            const response = await fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
    
            // Remove the order from the frontend state
            setCurrentOrders(prevOrders => prevOrders.filter(order => order._id !== id));
    
            console.log('Order declined:', id);
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    const acceptDecline = async (id) => {
        try {
            // Make a DELETE request to remove the order from the backend
            const response = await fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
    
            // Remove the order from the frontend state
            setAcceptedOrders(prevOrders => prevOrders.filter(order => order._id !== id));
    
            console.log('Order declined:', id);
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    const handleIndex = async (index) => {
        // Remove the order from the currentOrders array
        try {
            const response = await fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'accepted', id: orderId })
            });            
    
            if (response.ok) {
                // refreshOrders();
                const data = currentOrders.filter((_, i) => i !== index);
                setCurrentOrders(data);
            
                // Find the order that should be moved to acceptedOrders
                const acceptedData = currentOrders.find((_, i) => i === index);
                
                // Add the found order to the acceptedOrders array
                setAcceptedOrders((prev) => [...prev, acceptedData]);
            
                console.log("Current Orders:", data);
                console.log("Accepted Order:", acceptedData);
            } else {
                console.error('Failed to move order to acceptedOrders');
            }
        } catch (error) {
            console.error('Error:', error);
        }

       
    };
    
    const handleNewOrder = async () => {
        try {
            const response = await fetch('https://dinein-6bqx.onrender.com/ambika-admin/dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'new' }), // Indicate that this is a request to create a new order
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create order');
            }
    
            const data = await response.json();
            console.log('New order created:', data.newOrder);
        } catch (error) {
            console.error('Error creating order:', error.message);
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
                {currentOrders.map((order,index) => (
                    <AdminCard
                        key={index}
                        token={order.token}
                        id={order._id}
                        onIndex={handleIndex}
                        index={index}

                        items={order.items}
                        onDone={() => handleDone(order._id,'current')}
                        onDecline={() => handleDecline(order._id)} 
                        showDoneButton={true}
                        showDeclineButton={true}
                    />
                ))}
            </div>

            {/* Accepted Orders */}
            <div className="Accepted" style={{ width: 400, height: 'calc(100vh - 104px)', top: 104, position: 'absolute', background: '#EDECE9', borderRadius: 30, overflowY: 'auto', paddingBottom: 20 }}>
                <div className="grey box" style={{ width: '100%', height: 70, position: 'absolute', background: '#DDDBD3', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                <div className="Accepted0" style={{ left: 120, top: 20, position: 'absolute', textAlign: 'center', color: '#0D0F11', fontSize: 30, fontFamily: 'Inter', fontWeight: 'bolder', wordWrap: 'break-word' }}>Accepted</div>
                {acceptedOrders.map((order,index) => (
                    <AdminCard
                    key={index}
                    token={order.token}
                    id={order._id}
                    onIndex={handleIndex}
                    index={index}
                    items={order.items}
                    onDone={() => handleDone(order._id,'accepted')}
                    onDecline={() => acceptDecline(order._id)} 
                    showDoneButton={true}
                    showDeclineButton={true}
                    />
                ))}
            </div>

            {/* Done Orders */}
            <div className="Done" style={{ width: 400, height: 'calc(100vh - 104px)', right: 30, top: 104, position: 'absolute', background: '#EDECE9', borderRadius: 30, overflowY: 'auto', paddingBottom: 20 }}>
                <div className="grey box" style={{ width: '100%', height: 70, position: 'absolute', background: '#DDDBD3', borderTopLeftRadius: 30, borderTopRightRadius: 30 }} />
                <div className="Accepted0" style={{ left: 170, top: 20, position: 'absolute', textAlign: 'center', color: '#0D0F11', fontSize: 30, fontFamily: 'Inter', fontWeight: 'bolder', wordWrap: 'break-word' }}>Done</div>
                {doneOrders.map((order,index) => (
                    <AdminCard

                    key={index}
                    token={order.token}
                    id={order._id}
                    onIndex={handleIndex}
                    index={index}
                    items={order.items}
                    onDone={handleDone}
                    onDecline={handleDecline}
                    showDoneButton={false}
                    showDeclineButton={false}
                    />
                ))}
            </div>

            {/* Offline Orders */}
            {/* <div className="NewOrder" style={{display:'flex',justifyContent:'center',position:'absolute',top:800,right:90}}>
                <button onClick={handleNewOrder} style={{height:80,width:200,background:'#31B475',borderRadius:20,fontFamily:'Inter',fontSize:25,fontWeight:'bolder',border:'none',color:'white'}}><span style={{marginRight:10,fontSize:35,color:'white'}}>+</span> New Order</button>
            </div> */}
        </div>
    );
}

export default Admin;
