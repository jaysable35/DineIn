import React from 'react';
import Card from 'react-bootstrap/Card';

function AdminCard({ token, items, onDone, onDecline, showDoneButton, showDeclineButton }) {
    // Calculate the total price of the items
    const safeItems = Array.isArray(items) ? items : [];

    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    return (
        <Card className="admin-card" style={{ width: 366, height: 300, background: 'white', borderRadius: 16, position: 'relative', top: 100, left: 20, marginBottom: 10 }}>
            <Card.Body style={{ padding: '20px' }}>
               
                <Card.Title>Token No.{token}</Card.Title>
                <Card.Subtitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ flex: 2 }}>Item</span>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                            <span style={{ flex: 1, textAlign: 'center' }}>Qty</span>
                            <span style={{ flex: 1, textAlign: 'center' }}>Price</span>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 1, border: '1px #C5BCBC solid', marginTop: 10, marginBottom: 30 }}></div>
                    {items.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flex: 2 }}>{item.name}</span>
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                                <span style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</span>
                                <span style={{ flex: 1, textAlign: 'center' }}>₹{item.price * item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </Card.Subtitle>
                <div style={{ width: '100%', height: 1, border: '1px #C5BCBC solid', marginTop: 20, marginBottom: 10 }}></div>
                <div style={{ textAlign: 'right', color: '#000000', fontSize: 24, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word' }}>
                    Total: ₹{total}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                    {showDeclineButton && (
                        <button style={{ height: 40, width: 160, borderRadius: 8, border: '2px solid grey', fontWeight: 'bolder', fontSize: 20 }} onClick={() =>{console.log("Declined button of token:",token);onDecline(token)}}>Decline</button>
                    )}
                    {showDoneButton && (
                        <button style={{ height: 40, width: 160, borderRadius: 8, border: '2px solid #31B475', background: '#31B475', fontWeight: 'bolder', fontSize: 20, color: 'white' }} onClick={() =>{console.log("Done button of token:",token);onDone(token)}}>Done</button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default AdminCard;
