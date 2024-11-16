import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import vegIcon from '../assets/food.jpg';
import nonVegIcon from '../assets/food.jpg';
import "../Components/Kart.css";
import ClipLoader from 'react-spinners/ClipLoader';
import Warning from './warning';

const Kart = ({ cart=[], updateCart, disableOrder,setDisableOrder }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [token, setToken] = useState(null);
    const [bottle, setBottle] = useState(0);
    const [loading, setLoading] = useState(false); // State for preloader
    const [selectedItems, setSelectedItems] = useState(cart.map(item => item.parcel || false)); // State for selected items
    const [disablePlaceOrder, setDisablePlaceOrder] = useState(false);
    const [selectAll, setSelectAll] = useState(false); // State for select all checkbox
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        
       if(disableOrder) return;
        setLoading(true);
        try {
            // Log cart data to ensure marathi field is included
            console.log('Cart data before sending:', cart);

            const response = await fetch('http://localhost:3001/ambika/user/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: cart.map((item, index) => ({
                        ...item,
                        marathi: item.marathi || '', // Ensure marathi field is included
                        parcel: selectedItems[index], // Ensure parcel status is included
                        bottle:bottle
                    })),
                    total: getTotal(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            const result = await response.json();
            console.log('Order placed successfully:', result);
            setToken(result.token);
            navigate('/ambika/user/cart/placedorder', { state: { token: result.token, cart: cart, bottle: bottle } });
        } catch (error) {
            console.error('Error placing order:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = (item) => {
        updateCart(item, 1);
    };

    const handleRemoveClick = (item) => {
        updateCart(item, -1);
    };

    const getTotal = () => {
        const itemsTotal= cart.reduce((total, item) => total + item.price * item.quantity, 0);
        return itemsTotal+(bottle * 20)
    };

    const handleItemSelect = (index) => {
        const updatedSelections = [...selectedItems];
        updatedSelections[index] = !updatedSelections[index];
        setSelectedItems(updatedSelections);

        const updatedCart = [...cart];
        updatedCart[index].parcel = updatedSelections[index];
        updateCart(updatedCart);
    };

    const handleBottleCount = () => {
        setBottle(bottle + 1);
    };

    const handleRemoveBottleCount = () => {
        if (bottle > 0) {
            setBottle(bottle - 1);
        }
    };

    const allSelected = selectedItems.every(Boolean);

    if (orderPlaced) {
        return null; // We handle the redirection in the navigate call
    }
    let placeOrder;

    useEffect(() => {
        console.log("disableOrder:", disableOrder); // Should log true after "YES" is clicked in the parent
    }, [disableOrder]);

    // Conditional rendering of the Place Order button based on disableOrder state
    placeOrder = (
        <div className="place-order">
            <button
                className="place-order-button"
                onClick={disableOrder ? null : handlePlaceOrder} // Only handlePlaceOrder if not disabled
                disabled={disableOrder} // Disable the button if disableOrder is true
                style={{
                    backgroundColor: disableOrder ? '#d3d3d3' : '#4CAF50', // Change color when disabled
                    cursor: disableOrder ? 'not-allowed' : 'pointer',
                }}
            >
                <p style={{ color: disableOrder ? 'black' : 'white' }}>Place Order</p>
            </button>
        </div>
    );


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
                        <div className="title" style={{ position: 'relative', left: 0 }}>Cart</div>
                    </div>

                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.img || (item.veg ? vegIcon : nonVegIcon)} alt="item type" className="item-icon" />
                                <div className="item-details">
                                    <div className="marathi" style={{ color: '#EDECE9' }}>Marathi: {item.marathi || 'N/A'}</div>
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-price">₹{item.price}</div>
                                    <div className="parcel" style={{ display: 'flex' }}>
                                        <input
                                            type="checkbox"
                                            style={{ height: 20, width: 20 }}
                                            checked={selectedItems[index]}
                                            onChange={() => handleItemSelect(index)}
                                        />
                                        <label>Parcel</label>
                                    </div>
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
                        <div className="bottle" style={{ marginBottom: 25, display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ marginTop: 10 }}>Add Water Bottle (₹20) </span>
                            <div className="increment" style={{ marginTop: 5 }}>
                                <button onClick={handleRemoveBottleCount} style={{ border: '1px solid #A8A3A3', width: '30px', height: '30px', borderRadius: '4px', fontSize: '18px', lineHeight: 1, marginRight: 20 }}>-</button>
                                <span>{bottle}</span>
                                <button onClick={handleBottleCount} style={{ border: '1px solid #A8A3A3', width: '30px', height: '30px', borderRadius: '4px', fontSize: '18px', lineHeight: 1, marginLeft: 20 }}>+</button>
                            </div>
                        </div>
                        <div className="bill-item" style={{ display: 'flex' }}>
                            <span>Item total</span>
                            <span>₹{getTotal()}</span>
                        </div>
                        <div className="bill-item total">
                            <span>To Pay</span>
                            <span>₹{getTotal()}</span>
                        </div>
                    </div>
                        
                        {placeOrder}
                        


                </>
            )}
        </div>
    );
};

export default Kart;
