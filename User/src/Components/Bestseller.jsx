import React from "react";
import Slider from "react-slick";
import pizzaImage from '../assets/pizza.jpeg';
import vegImage from '../assets/veg.png';
import './CommonFonts.css'
import peshwai from '../assets/peshwaii.jpg'
import sadashiv from '../assets/sadashiv.jpeg'
import bombay from '../assets/bombay.jpg'

function Bestsellers({ onBestsellerClick, cart = [],updateCart }) {
    const bestsellerSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1.5,
        slidesToScroll: 1,
    };

    const items = [
        { id: 19, name: 'Peshwai', price: 100, img:peshwai },
        { id: 22, name: 'Sadashiv', price: 100, img:sadashiv },
        { id: 21, name: 'Puneri Grill', price:100, img:bombay }
    ];
    const handleBestsellerClick = (item, quantity) => {
        updateCart(item, quantity);
    };

    return (
        <>
            {/* <div className="Vector2" style={{ width: '100vh', height: 1, left: 10, top: 225, position: 'absolute', border: '1px #B6ADAD solid' }}></div> */}
            <div className="Bestsellers" style={{ left: 24, top: 250, position: 'absolute', color: 'black', fontSize: 30}}>Bestsellers</div>
            <Slider {...bestsellerSettings} style={{ position: 'absolute', left: 24, top: 200, width: '90%' }}>
                {items.map((item) => {
                    const cartItem = cart.find(cartItem => cartItem.id === item.id);
                    const quantity = cartItem ? cartItem.quantity : 0;
                    return (
                        <div key={item.id}>
                            <div style={{ width: 194, height: 120, background: '#EDECE9', borderRadius: 8, position: 'relative',marginTop:100}}>
                                <img src={item.img} style={{ width: 70, height: 70, borderRadius: 6, position: 'absolute', left: 10, top: 10 }} alt={item.name} />
                                <div style={{ position: 'absolute', left: 90, top: 10, color: 'black' }}><img src={vegImage} alt='veg' style={{ height: 20, width: 20 }} /></div>
                                <div style={{ position: 'absolute', left: 90, top: 30, color: 'black' }}>{item.name}</div>
                                <div style={{ position: 'absolute', left: 90, top: 55, color: 'black' }}>₹{item.price}</div>
                                <div style={{ position: 'absolute', left: 15, top: 85 }}>
                                    {quantity > 0 ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button
                                                style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: '#ffffff', border: '2px solid lightgrey', cursor: 'pointer' }}
                                                onClick={() => handleBestsellerClick(item, -1)}
                                            >
                                                -
                                            </button>
                                            <span style={{ margin: '0 10px' }}>{quantity}</span>
                                            <button
                                                style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: '#ffffff', border: '2px solid lightgrey', cursor: 'pointer' }}
                                                onClick={() => handleBestsellerClick(item, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            style={{ width: 60, height: 30, borderRadius: 8, backgroundColor: '#ffffff', border: '2px solid lightgrey', cursor: 'pointer' }}
                                            onClick={() => handleBestsellerClick(item, 1)}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
}

export default Bestsellers;