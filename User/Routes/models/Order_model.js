import mongoose from 'mongoose';
import Counter from './Counter.js';

const userOrdersSchema = new mongoose.Schema({
    items: [{
        id: Number,
        marathi: String,
        name: String,
        price: Number,
        quantity: Number,
        parcel: { type: Boolean, default: false },
        bottle: { type: Number, default: 0 }
    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
    parcel: { type: Boolean, default: false }
});


const acceptedOrderSchema = new mongoose.Schema({
    items: [{
        id: Number,
        marathi: String,
        name: String,
        price: Number,
        quantity: Number,
        parcel: { type: Boolean, default: false },
        bottle: { type: Number, default: 0 }


    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
    parcel: { type: Boolean, default: 0 }
})

const doneOrderSchema = new mongoose.Schema({
    items: [{
        id: Number,
        marathi: String,
        name: String,
        price: Number,
        quantity: Number,
        parcel: { type: Boolean, default: false },
        bottle: { type: Number, default: 0 }


    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
    parcel: { type: Boolean, default: false }
}, { timestamps: true })

const sequenceSchema = new mongoose.Schema({
    token: {
        type: Number,
        required: true,
        default: 301, // Start the sequence from 301
    },
});

const offlineOrderSchema = new mongoose.Schema({
    
})

userOrdersSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    const counter = await Counter.findByIdAndUpdate(
        { _id: 'orderId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.token = counter.seq;
    next();
});


const Order = mongoose.model("Order", userOrdersSchema);
const AcceptedOrder = mongoose.model("AcceptedOrder", acceptedOrderSchema);
const DoneOrder = mongoose.model("DoneOrder", doneOrderSchema);
const sequence = mongoose.model('sequence', sequenceSchema);

export { Order, AcceptedOrder, DoneOrder, sequence };
