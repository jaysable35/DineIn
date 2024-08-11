import mongoose from 'mongoose';

const userOrdersSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    items: [{ 
        id: Number, 
        name: String, 
        price: Number, 
        quantity: Number 
    }],
    total: { type: Number, required: true },
    tokenNumber: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});