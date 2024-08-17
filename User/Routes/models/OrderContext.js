// OrderContext.js
import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`/api/orders/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update state to remove the deleted order
                setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
            } else {
                console.error('Failed to delete order');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, deleteOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    return useContext(OrderContext);
}
