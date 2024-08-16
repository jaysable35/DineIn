import React from 'react';
import Card from 'react-bootstrap/Card';

function AdminCard({ token, id, onIndex, index, items, onDone, onDecline, showDoneButton, showDeclineButton, }) {
    const safeItems = Array.isArray(items) ? items : [];
    const total = safeItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const defaultHeight = 341; // Default height for the card
    const itemHeight = 20; // Height for each item (approx)
    const calculatedHeight = defaultHeight + (safeItems.length * itemHeight); // Calculate height based on number of items

    const handleDoneClick = (index) => {
        // Call the onDone function with the id
        onDone(id);
        onIndex(index);
        console.log("index is:", index);
    };

    return (
        <Card className="admin-card" style={{ width: 366, height: calculatedHeight, background: 'white', borderRadius: 16, position: 'relative', top: 100, left: 20, marginBottom: 10 }}>
            <Card.Body style={{ padding: '20px' }}>
                <Card.Title style={{fontWeight:'bolder',fontSize:20}}>Token No.{token}</Card.Title>
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
                <div style={{display:'flex',justifyContent:'space-between',marginTop:60}}>
                {showDeclineButton && (
                    <button onClick={onDecline} style={{ height:60,width:186, backgroundColor: 'white',fontSize:23, fontFamily:'Inter', color: 'black', padding: '5px 10px', borderRadius: 5, marginRight: 5,border:'1px solid black'}}>Decline</button>
                )}
                {showDoneButton && (
                    <button onClick={() => handleDoneClick(index)} style={{ height:60,width:186, backgroundColor: '#31B475',fontSize:23, fontFamily:'Inter', color: 'white', padding: '5px 10px', borderRadius:5,border:'1px solid #31B475'}}>Done</button>
                )}
                </div>

            </Card.Body>
        </Card>
    );
}

export default AdminCard;
