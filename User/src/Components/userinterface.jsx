import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Bestsellers from './Bestseller';
import Menu from './menu';
import Cart from '../Components/kartpopup';
import Nav from '../Components/navbar';
import ambika from '../assets/ambika.png';

const YourComponent = ({ cart, updateCart }) => {
    const handleBestsellerClick = (item, quantity) => {
        updateCart(item, quantity);
    };

    const handleMenuClick = (item, quantity) => {
        updateCart(item, quantity);
    };

    const cartSize = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#FCFCF9' }}>
            <Nav size={cartSize} />
            <Bestsellers onBestsellerClick={handleBestsellerClick} cart={cart} updateCart={updateCart} />
            <Menu handleClick={handleMenuClick} cart={cart} />
            <Cart size={cartSize} total={cartTotal} />
        </div>
    );
};

export default YourComponent;