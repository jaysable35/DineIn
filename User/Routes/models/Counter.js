import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: { type: String },
    seq: { type: Number, default: 1 }
});

counterSchema.statics.incrementAndReset = async function (counterId) {
    const counter = await this.findByIdAndUpdate(
        counterId,
        { $inc: { seq: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    if (counter.seq > 50) {
        counter.seq = 1;
        await counter.save();
    }

    return counter.seq;
};

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
