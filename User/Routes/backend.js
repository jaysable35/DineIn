import dotenv from 'dotenv';
import express from 'express';
import Order from './models/Order_model.js';
import Counter from './models/Counter.js';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import http from 'http'
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Create a Socket.IO server instance with CORS options
app.use(cors({
    origin: "https://dinein.live", // The origin of your client application
    methods: ["GET", "POST","DELETE","OPTION","PATCH"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true
}));


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("DB Connected"))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.options('*',cors());
app.use(express.json());

app.post('/ambika/user/cart', async (req, res) => {
    try {

        const counter = await Counter.findByIdAndUpdate(
            { _id: 'orderCounter' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const token=counter.seq;
        const { cart, total } = req.body;
        const orderId=uuidv4();

        const order = new Order({
            orderId,
            items: cart,
            token,
            total
        });
        await order.save();
        
        res.status(200).json({ 
            
            message: 'Order placed successfully', 
            token
        });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
});

// Route to fetch orders based on status
app.get('/ambika-admin/dashboard', async (req, res) => {
    try {
        // Fetch all orders (or modify to fetch based on criteria if needed)
        const orders = await Order.find(); 

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Update order status
app.patch('/ambika-admin/orders/:token', async (req, res) => {
    const { token } = req.params;
    const { status } = req.body;

    try {
        // Find the order by token and update its status
        const updatedOrder = await Order.findOneAndUpdate(
            { token },
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
});

// Finalize order (for "done" status)
app.post('/ambika-admin/orders/finalize/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Move the order to the finalized collection or update its status
        const order = await Order.findOneAndUpdate(
            { token },
            { finalized: true }, // You can customize this to suit your logic
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order finalized successfully',
            order
        });
    } catch (error) {
        console.error('Error finalizing order:', error);
        res.status(500).json({ message: 'Error finalizing order', error: error.message });
    }
});

// Delete an order
app.delete('/ambika-admin/orders/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Find and delete the order by token
        const deletedOrder = await Order.findOneAndDelete({ token });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order deleted successfully',
            order: deletedOrder
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
});

app.patch('/ambika-admin/orders/:id', async (req, res) => {
    const { id } = req.params; // Order ID from the URL
    const { status } = req.body; // Status from the request body

    try {
        if (!status) {
            return res.status(400).send({ error: 'Status is required' }); // Return 400 if status is missing
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).send({ error: 'Order not found' }); // Return 404 if order not found
        }

        res.send(updatedOrder); // Return the updated order
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ error: 'Failed to update order status' }); // Return 500 for any other errors
    }
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
