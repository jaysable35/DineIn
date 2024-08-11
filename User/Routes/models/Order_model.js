import mongoose from 'mongoose';
import Counter from './Counter.js';

const userOrdersSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    items: [{ 
        id: Number, 
        name: String, 
        price: Number, 
        quantity: Number 
    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});



userOrdersSchema.pre('save', async function(next) {
    if (!this.isNew) return next();

    const counter = await Counter.findByIdAndUpdate(
        { _id: 'orderId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.tokenNumber = counter.seq;
    next();
});

const Order = mongoose.model("Order", userOrdersSchema);
export default Order;
