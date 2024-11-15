import mongoose from 'mongoose';

const sequenceSchema = new mongoose.Schema({
    _id: { type: String },
    seq: { type: Number, default: 101 }
});

sequenceSchema.statics.incrementAndReset = async function (sequenceId) {
    const sequence = await this.findByIdAndUpdate(
        sequenceId,
        { $inc: { seq: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    if (sequence.seq > 150) {
        sequence.seq = 101;
        await sequence.save();
    }

    return sequence.seq;
};

const Sequence = mongoose.model("Sequence", sequenceSchema);

export default Sequence;
