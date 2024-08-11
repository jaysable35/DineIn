import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vegIcon from '../assets/food.jpg';
import nonVegIcon from '../assets/food.jpg';
import "../Components/Kart.css";
import FinalOrder from './placeorder'; // Ensure the import path is correct

const Kart = ({ cart, updateCart }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        try {
            const response = await fetch('http://localhost:3001/ambika/user/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart,
                    total: getTotal()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            const result = await response.json();
            console.log('Order placed successfully:', result);
            setToken(result.token);
            setOrderPlaced(true);

            // Navigate to the FinalOrder page with the token number
            navigate('/ambika/user/cart/placedorder', { state: { token: result.token, cart: cart } });
        } catch (error) {
            console.error('Error placing order:', error);
            // Optionally show an error message to the user
        }
    };

    const handleAddClick = (item) => {
        updateCart(item, 1);
    };

    const handleRemoveClick = (item) => {
        updateCart(item, -1);
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (orderPlaced) {
        return null; // We handle the redirection in the navigate call
    }

    return (
        <div className="kart-container">
            <div className="header">
                <button onClick={() => navigate('/ambika/user')} className="back-button">←</button>
                <div className="title">Cart</div>
            </div>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.img || (item.veg ? vegIcon : nonVegIcon)} alt="item type" className="item-icon" />
                        <div className="item-details">
                            <div className="item-name">{item.name}</div>
                            <div className="item-price">₹{item.price}</div>
                        </div>
                        <div className="item-quantity">
                            <button onClick={() => handleRemoveClick(item)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleAddClick(item)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bill-details">
                <div className="bill-item">
                    <span>Item total</span>
                    <span>₹{getTotal()}</span>
                </div>
                <div className="bill-item total">
                    <span>To Pay</span>
                    <span>₹{getTotal()}</span>
                </div>
            </div>
            <div className="place-order">
                <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default Kart;
