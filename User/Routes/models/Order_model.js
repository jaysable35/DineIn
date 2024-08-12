import mongoose from 'mongoose';
import Counter from './Counter.js';

// Base schema for orders
const orderBaseSchema = new mongoose.Schema({
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

// Schema for current orders
const userOrdersSchema = new mongoose.Schema({
    ...orderBaseSchema.obj, // Use the base schema fields
});

// Pre-save hook to handle token generation
userOrdersSchema.pre('save', async function(next) {
    if (!this.isNew) return next();

    const counter = await Counter.findByIdAndUpdate(
        { _id: 'orderId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.token = counter.seq; // Use the correct field name here
    next();
});

// Schema for accepted orders
const acceptedOrderSchema = new mongoose.Schema({
    ...orderBaseSchema.obj, // Use the base schema fields
});

// Schema for final orders
const finalOrderSchema = new mongoose.Schema({
    ...orderBaseSchema.obj, // Use the base schema fields
});

// Models
const Order = mongoose.model('Order', userOrdersSchema);
const AcceptedOrder = mongoose.model('AcceptedOrder', acceptedOrderSchema);
const FinalOrder = mongoose.model('FinalOrder', finalOrderSchema);

export default { Order, AcceptedOrder, FinalOrder };
