import React from 'react';
import Card from 'react-bootstrap/Card';

function AdminCard({ token, items, onDone, onDecline, showDoneButton, showDeclineButton }) {
    const safeItems = Array.isArray(items) ? items : [];
    const total = safeItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const handleDoneClick = () => {
        // Call the onDone function with token
        if (onDone) {
            onDone(token);
        }
    };

    return (
        <Card className="admin-card" style={{ width: 366, height: 300, background: 'white', borderRadius: 16, position: 'relative', top: 100, left: 20, marginBottom: 10 }}>
            <Card.Body style={{ padding: '20px' }}>
                <Card.Title>Token No.{token}</Card.Title>
                <Card.Subtitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ flex: 2 }}>Item</span>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                            <span style={{ flex: 1, textAlign: 'right' }}>Qty</span>
                            <span style={{ flex: 1, textAlign: 'right' }}>Price</span>
                        </div>
                    </div>
                </Card.Subtitle>
                <div className="admin-card-items" style={{ marginTop: 10 }}>
                    {safeItems.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                            <span style={{ flex: 2 }}>{item.name}</span>
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                                <span style={{ flex: 1, textAlign: 'right' }}>{item.quantity}</span>
                                <span style={{ flex: 1, textAlign: 'right' }}>{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <hr style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Total:</span>
                    <span style={{ fontWeight: 'bold' }}>{total}</span>
                </div>
                {showDoneButton && (
                    <button onClick={handleDoneClick} style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', borderRadius: 5, marginRight: 5 }}>Done</button>
                )}
                {showDeclineButton && (
                    <button onClick={onDecline} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: 5 }}>Decline</button>
                )}
            </Card.Body>
        </Card>
    );
}

export default AdminCard;
