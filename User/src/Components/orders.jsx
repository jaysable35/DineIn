import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vegIcon from '../assets/food.jpg';
import nonVegIcon from '../assets/food.jpg';
import "../Components/Kart.css";
import ClipLoader from 'react-spinners/ClipLoader';
import FinalOrder from './placeorder'; // Ensure the import path is correct

const Kart = ({ cart, updateCart }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false); // State for preloader
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        setLoading(true); // Activate the preloader

      
    try {
        const response = await fetch('https://dinein-6bqx.onrender.com/ambika/user/cart', {
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
        setToken(result.token); // Save the token for the user

        // Navigate to the FinalOrder page with the token number
        navigate('/ambika/user/cart/placedorder', { state: { token: result.token, cart: cart } });
    } catch (error) {
        console.error('Error placing order:', error);
        // Optionally show an error message to the user
    } finally {
        setLoading(false); // Deactivate the preloader
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
            {loading ? (
                <div className="preloader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', top: 380, position: 'fixed', left: 160 }}>
                    <ClipLoader color={"black"} loading={loading} size={60} />
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default Kart;
