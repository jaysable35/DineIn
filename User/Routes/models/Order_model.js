import mongoose from 'mongoose';
import Counter from './Counter.js';

const userOrdersSchema = new mongoose.Schema({
    items: [{ 
        id: Number, 
        marathi: String,
        name: String, 
        price: Number, 
        quantity: Number,
        parcel: { type: Boolean, default: false }
    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
    parcel: { type: Boolean, default: false }
});


const acceptedOrderSchema= new mongoose.Schema({
    items:[{
        id:Number,
        marathi:String,
        name:String,
        price:Number,
        quantity:Number,
         parcel: { type: Boolean, default: false }

        
    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
    parcel: { type: Boolean, default: false }
})

const doneOrderSchema= new mongoose.Schema({
    items:[{
        id:Number,
        marathi:String,
        name:String,
        price:Number,
        quantity:Number,
         parcel: { type: Boolean, default: false }

    }],
    total: { type: Number, required: true },
    token: { type: Number, required: true },
    parcel: { type: Boolean, default: false }
},{ timestamps: true })

const newOrderTokenSchema = new mongoose.Schema({
    token: {
        type: Number,
        required: true,
        default: 301, // Start the sequence from 301
    },
});


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
const NewOrderToken = mongoose.model('NewOrderToken', newOrderTokenSchema);

export {Order,AcceptedOrder,DoneOrder,NewOrderToken};
