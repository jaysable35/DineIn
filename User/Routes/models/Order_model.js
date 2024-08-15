import mongoose from 'mongoose';
import Counter from './Counter.js';

const userOrdersSchema = new mongoose.Schema({
    items: [{ 
        id: Number, 
        name: String, 
        price: Number, 
        quantity: Number 
    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
});

const acceptedOrderSchema= new mongoose.Schema({
    items:[{
        id:Number,
        name:String,
        price:Number,
        quantity:Number
    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
})

const doneOrderSchema= new mongoose.Schema({
    items:[{
        id:Number,
        name:String,
        price:Number,
        quantity:Number
    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
},{ timestamps: true })


userOrdersSchema.pre('save', async function(next) {
    if (!this.isNew) return next();

    const counter = await Counter.findByIdAndUpdate(
        { _id: 'orderId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.token= counter.seq;
    next();
});


const Order = mongoose.model("Order", userOrdersSchema);
const AcceptedOrder=mongoose.model("AcceptedOrder",acceptedOrderSchema);
const DoneOrder=mongoose.model("DoneOrder",doneOrderSchema);

export {Order,AcceptedOrder,DoneOrder};
