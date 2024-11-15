import React, { useRef } from "react";
import list from "./data";
import Cards from "./Cards";
import Grill from "../assets/grilled.png";
import NonGrill from "../assets/nongrilled.png";
import Choco from "../assets/chocolate.png";
import './CommonFonts.css';

function Menu({ handleClick,cart }) {
    // Function to filter items by ID range
    const filterItems = (minId, maxId) => 
        list.filter(item => item.id >= minId && item.id <= maxId);

    const nonGrilledItems = filterItems(1, 9);
    const grilledItems = filterItems(10, 25);
    const chocolateItems = filterItems(26, 29);

    const Grilled = useRef(null);
    const NonGrilled = useRef(null);
    const Chocolate = useRef(null);

    const scrollHandler = (elmRef) => {
        elmRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className="categories" style={{ left: 24, position: 'relative', display: 'flex', justifyContent: 'flex-start', fontSize: 30, fontFamily: 'Inter', fontWeight: '400' }}>
                Categories
            </div>
            <div className="button" style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', top: 25 }}>
                <button onClick={() => scrollHandler(Grilled)} style={{ width: 90, height: 90, borderRadius: '100%', background: 'white', border: '0px solid darkgrey' }}>
                    <img src={Grill} alt="grilled" style={{ height: 90, width: 90 }} />
                    <h3 style={{fontWeight:'normal',fontFamily:'Inter'}}>Grill</h3>
                </button>
                <button onClick={() => scrollHandler(NonGrilled)} style={{ width: 90, height: 90, borderRadius: '100%', background: 'white', border: '1px solid darkgrey' }}>
                    <img src={NonGrill} alt="none" style={{ height: 90, width: 90 }} />
                    <h3 style={{fontWeight:'normal',fontFamily:'Inter'}}>Non-Grill</h3>
                </button>
                <button onClick={() => scrollHandler(Chocolate)} style={{ width: 90, height: 90, borderRadius: '100%', background: 'white', border: '1px solid darkgrey' }}>
                    <img src={Choco} alt="chocolate" style={{ height: 90, width: 90 }} />
                    <h3 style={{fontWeight:'normal',fontFamily:'Inter'}}>Chocolate  </h3>
                </button>
            </div>
            <div style={{ textAlign: 'center', color: '#6D6D6D', position: 'relative', top: '280px', fontWeight: 'bolder', fontSize: 50, fontFamily: 'Inter' }}>
                Menu
            </div>



            <div style={{ marginBottom: '40px' }} ref={Grilled}>
            <div className="Vector2" style={{ width: 108.5, height: 1, left: 10, top: 565, position: 'absolute', border: '1px #B6ADAD solid' }}></div>
            <div className="Vector2" style={{ width: 108.5, height: 1, right: 10, top: 565, position: 'absolute', border: '1px #B6ADAD solid' }}></div>

                <div style={{ textAlign: 'center', marginBottom: '20px', color: '#6D6D6D', position: 'relative', top: 318, fontWeight: 'bold' }}>
                    Grill Sandwich
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {grilledItems.map((item) => (
                        <Cards item={item} key={item.id} handleClick={handleClick} cart={cart} />
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '40px' }} ref={NonGrilled}>
            <div className="Vector2" style={{ width: 88.5, height: 1, left: 10, top: 3005, position: 'absolute', border: '1px #B6ADAD solid' }}></div>
            <div className="Vector2" style={{ width: 88.5, height: 1, right: 10, top: 3005, position: 'absolute', border: '1px #B6ADAD solid' }}></div>
                <div style={{ textAlign: 'center', color: '#6D6D6D', marginTop: '20px', position: 'relative', top: 300, marginBottom: '20px', fontWeight: 'bold' }}>
                    Non-Grill Sandwich
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {nonGrilledItems.map((item) => (
                        <Cards item={item} key={item.id} handleClick={handleClick} cart={cart} />
                    ))}
                </div>
            </div>

            <div ref={Chocolate}>
                <div className="Vector2" style={{ width: 88.5, height: 1, left: 10, top: 4575, position: 'absolute', border: '1px #B6ADAD solid' }}></div>
                <div className="Vector2" style={{ width: 88.5, height: 1, right: 10, top: 4575, position: 'absolute', border: '1px #B6ADAD solid' }}></div>
                <div style={{ textAlign: 'center', marginBottom: '20px', color: '#6D6D6D', position: 'relative', top: 310, fontWeight: 'bold' }}>
                    Chocolate Sandwich
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', paddingBottom: '400px' }}>
                    {chocolateItems.map((item) => (
                        <Cards item={item} key={item.id} handleClick={handleClick} cart={cart} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;
