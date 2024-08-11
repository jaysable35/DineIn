import React from "react";
import { Link } from "react-router-dom";
import CartIcon from '../assets/cart.png';
import './Nav.css';

function Nav({ size }) {
    return (
        <nav className="nav-container">
            <div className="nav-sec">
                <span className="cart-icon">
                    <Link to="/ambika/user/cart">
                        <img src={CartIcon} alt="Cart" />
                    </Link>
                    {size > 0 && <span className="cart-badge">{size}</span>}
                </span>
            </div>
        </nav>
    );
}

export default Nav;
