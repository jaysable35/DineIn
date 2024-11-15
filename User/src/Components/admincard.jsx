import React from 'react';
import Card from 'react-bootstrap/Card';

function AdminCard({ token, id, onIndex, index, items, onDone, onDecline, showDoneButton, showDeclineButton }) {
    const safeItems = Array.isArray(items) ? items : [];
    
    // Assuming each bottle costs 20
    const bottleCost = (safeItems[0]?.bottle || 0) * 20;
    const total = safeItems.reduce((acc, item) => acc + item.quantity * item.price, 0) + bottleCost;
    const totalQuantity = safeItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalBottles = safeItems[0]?.bottle || 0;

    const defaultHeight = 341; // Default height for the card
    const itemHeight = 20; // Height for each item (approx)
    const calculatedHeight = defaultHeight + (safeItems.length * itemHeight);

    const handleDoneClick = (index) => {
        onDone(id);
        onIndex(index);
        console.log("index is:", index);
    };

    return (
        <Card className="admin-card" style={{ width: 366, height: calculatedHeight, background: 'white', borderRadius: 16, position: 'relative', top: 100, left: 20, marginBottom: 10 }}>
            <Card.Body style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                    <Card.Title style={{ fontWeight: 'bolder', fontSize: 20 }}>Token No.{token}</Card.Title>
                    <Card.Title style={{ fontWeight: 'bolder', fontSize: 20 }}>Total: {totalQuantity}</Card.Title>
                </div>

                <Card.Subtitle>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <span style={{ flex: 2 }}>Item</span>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ flex: 1, textAlign: 'center' }}>Qty</span>
                            <span style={{ flex: 1, textAlign: 'center' }}>Price</span>
                        </div>
                    </div>
                </Card.Subtitle>
                <div className="admin-card-items" style={{ marginTop: 10 }}>
                    {safeItems.map((item, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                            <div style={{ flex: 2, fontSize: 20 }}>
                                {item.marathi} {item.parcel && <span style={{ color: 'green', fontWeight: 'bold' }}>Parcel</span>}
                            </div>
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                                <span style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</span>
                                <span style={{ flex: 1, textAlign: 'center' }}>{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Display bottle information separately if there are bottles */}
                {totalBottles > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <div style={{ flex: 2, fontSize: 20, fontWeight: 'bold' }}>Water Bottle</div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                            <span style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{totalBottles}</span>
                            <span style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>{bottleCost}</span>
                        </div>
                    </div>
                )}

                <hr style={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>Total:</span>
                    <span style={{ fontWeight: 'bold', marginRight: 10 }}>{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60 }}>
                    {showDeclineButton && (
                        <button onClick={onDecline} style={{ height: 60, width: 186, backgroundColor: 'white', fontSize: 23, fontFamily: 'Inter', color: 'black', padding: '5px 10px', borderRadius: 5, marginRight: 5, border: '1px solid black' }}>Decline</button>
                    )}
                    {showDoneButton && (
                        <button onClick={() => handleDoneClick(index)} style={{ height: 60, width: 186, backgroundColor: '#31B475', fontSize: 23, fontFamily: 'Inter', color: 'white', padding: '5px 10px', borderRadius: 5, border: '1px solid #31B475' }}>Done</button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default AdminCard;
