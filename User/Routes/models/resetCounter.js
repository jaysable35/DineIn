import mongoose from 'mongoose';
import Counter from './Counter'; // Adjust the path to your Counter model
import cron from 'node-cron';

// Connect to MongoDB
mongoose.connect('mongodb://your_mongodb_uri', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const resetCounter = async (counterId) => {
    try {
        const result = await Counter.findByIdAndUpdate(
            counterId,
            { seq: 1 }, // Reset the seq field to 1
            { new: true, upsert: true } // Create the document if it doesn't exist
        );
        
        if (result) {
            console.log(`Counter reset successfully:`, result);
        } else {
            console.log('Counter not found or created.');
        }
    } catch (error) {
        console.error('Error resetting counter:', error);
    }
};

// Schedule the counter reset to run at midnight every day
cron.schedule('20 10 * * *', () => {
    console.log('Resetting counter...');
    resetCounter('orderCounter'); // Replace 'orderCounter' with the actual _id of your counter document
});
