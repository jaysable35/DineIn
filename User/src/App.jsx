import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/login";
import Otpform from "./Components/otp";
import YourComponent from "./Components/userinterface";
import Kart from "./Components/orders";
import Menu from "./Components/menu";
import Admin from "./Components/Admininterface";
import Adminlogin from "./Components/Admin";
import Otplogin from "./Components/adminotp";
import Finalorder from "./Components/placeorder";

function App() {
  const [cart, setCart] = useState([]);

  const updateCart = (item, change) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        const newQuantity = Math.max(0, existingItem.quantity + change);
        if (newQuantity === 0) {
          return prevCart.filter(cartItem => cartItem.id !== item.id);
        }
        return prevCart.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
        );
      } else if (change > 0) {
        return [...prevCart, { ...item, quantity: change }];
      }
      return prevCart;
    });
  };

  const router = createBrowserRouter([
    {
      path: "/ambika",
      element: <Login />,
    },
    {
      path: "/otp",
      element: <Otpform />,
    },
    {
      path: "/ambika/user",
      element: <YourComponent cart={cart} updateCart={updateCart} />,
    },
    {
      path: "/ambika/user/cart",
      element: <Kart cart={cart} updateCart={updateCart} />,
    },
    {
      path: "/menu",
      element: <Menu cart={cart} updateCart={updateCart} />,
    },
    {
      path: "/ambika-admin/dashboard",
      element: <Admin />,
    },
    {
      path: "/ambika-admin",
      element: <Adminlogin />,
    },
    {
      path:"/ambika/user/cart/placedorder",
      element:<Finalorder/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;