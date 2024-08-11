import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

// Set up Socket.IO server
const io = new Server(httpServer, {
    cors: {
        origin: "https://dinein-1.onrender.com", // Replace with your client URL
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true
    }
});

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the order schema and model for the `orders` collection
const orderSchema = new mongoose.Schema({
    token: Number,
    items: Array,
    status: String // This will be either "current" or "accepted"
});

const Order = mongoose.model('Order', orderSchema);

// Define the order schema and model for the `final_orders` collection
const finalOrderSchema = new mongoose.Schema({
    token: Number,
    items: Array,
    status: String // This will be "done"
});

const FinalOrder = mongoose.model('FinalOrder', finalOrderSchema);

app.use(cors());
app.use(express.json());

// Endpoint to get all current and accepted orders
app.get('/ambika-admin/dashboard', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Endpoint to move an order from "current" to "accepted"
app.patch('/ambika-admin/orders/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { token: parseInt(token) },
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }

        io.emit('orderUpdated', updatedOrder); // Emit event to all connected clients

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Endpoint to move an order from `accepted` to `done`
app.patch('/ambika-admin/final-orders/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { status } = req.body;

        // Find the order in the `Order` collection
        const orderToMove = await Order.findOne({ token: parseInt(token) });

        if (!orderToMove) {
            return res.status(404).send('Order not found');
        }

        // Create a new order in the `FinalOrder` collection
        const newFinalOrder = new FinalOrder({
            token: orderToMove.token,
            items: orderToMove.items,
            status: "done"
        });

        await newFinalOrder.save();

        // Remove the order from the `Order` collection
        await Order.deleteOne({ token: parseInt(token) });

        io.emit('orderUpdated', newFinalOrder); // Emit event to all connected clients

        res.json(newFinalOrder);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Endpoint to decline an order (remove from `orders` or `final_orders`)
app.delete('/ambika-admin/orders/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Attempt to delete from `Order` collection
        const result = await Order.deleteOne({ token: parseInt(token) });

        if (result.deletedCount === 0) {
            // If not found in `Order`, attempt to delete from `FinalOrder` collection
            const finalResult = await FinalOrder.deleteOne({ token: parseInt(token) });

            if (finalResult.deletedCount === 0) {
                return res.status(404).send('Order not found');
            }

            io.emit('orderDeleted', { token: parseInt(token) });
            return res.status(204).send(); // No Content
        }

        io.emit('orderDeleted', { token: parseInt(token) });
        res.status(204).send(); // No Content
    } catch (err) {
        res.status(500).send('Server error');
    }
});

io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
