import React, { useState, useEffect } from 'react';

function Cards({ item, handleClick, cart = [] }) {
  const { name, price, img, id } = item;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cartItem = cart.find(cartItem => cartItem.id === id);
    if (cartItem) {
      setCount(cartItem.quantity);
    } else {
      setCount(0);
    }
  }, [cart, id]);

  const handleAddClick = () => {
    handleClick(item, 1);
  };

  const handleRemoveClick = () => {
    if (count > 0) {
      handleClick(item, -1);
    }
  };

  return (
    <div className="cards" style={{ height: 280, width: 170, top: 300, borderRadius: 8, position: 'relative', alignContent: 'center' }}>
      <div className="img_box">
        <img src={img} alt={name} style={{ width: 130, height: 100, borderRadius: 10, alignItems: 'center', display: 'block', marginLeft: 20 }} />
      </div>
      <div className="details">
        <p style={{ fontWeight: 'bolder', marginBottom: 0, marginTop: 15, textAlign: 'center' }}>{name}</p>
        <p style={{ fontWeight: '300', color: 'dark-grey', marginTop: 6, textAlign: 'center' }}>Price- ₹{price}</p>
        <button onClick={handleAddClick} style={{ height: 40, width: 100, marginLeft: 30, marginBottom: 10, marginTop: 15, borderRadius: 8, fontWeight: 'bold', backgroundColor: 'white', border: '1px solid lightgrey' }}>Add to Cart</button>
        {count > 0 && (
          <div style={{ marginLeft: 40, marginBottom: 10 }}>
            <button onClick={handleRemoveClick} style={{ height:30,width:30,borderRadius: 8, fontWeight: 'bold', backgroundColor: 'white', border: '2px solid lightgrey' }}>-</button>
            <span style={{ margin: '0 10px' }}>{count}</span>
            <button onClick={handleAddClick} style={{ height:30,width:30, borderRadius: 8, fontWeight: 'bold', backgroundColor: 'white', border: '2px solid lightgrey' }}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cards;