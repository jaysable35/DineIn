    import dotenv from 'dotenv';
    import express from 'express';
    import {Order} from './models/Order_model.js';
    import {AcceptedOrder} from './models/Order_model.js'
    import {DoneOrder} from './models/Order_model.js'
    import Counter from './models/Counter.js';
    import cors from 'cors';
    import http from 'http'
    import { Server as SocketIOServer } from 'socket.io';
    import mongoose from 'mongoose';
    import { log } from 'console';

    dotenv.config();
    const app = express();
    const server = http.createServer(app);
    const io = new SocketIOServer(server);

    // Create a Socket.IO server instance with CORS options
    app.use(cors({
        origin: 'https://dinein.live', // The origin of your client application
        methods: ["GET", "POST", "DELETE", "OPTION", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }));


    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    mongoose.connect(process.env.MONGO_UL)
        .then(() => console.log("DB Connected"))
        .catch(err => console.log('MongoDB Connection Error:', err));

    app.options('*', cors());

    app.use(express.json());
    //route for sending the order from the user
    // Place order route
        app.post('/ambika/user/cart', async (req, res) => {
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
                const { cart, total } = req.body;

                if (!cart || cart.length === 0) {
                    return res.status(400).json({ message: 'Cart is empty or undefined' });
                }

                const counter = await Counter.findByIdAndUpdate(
                    'orderCounter',
                    { $inc: { seq: 1 } },
                    { new: true, upsert: true, session }
                );

                const tokenNum = counter.seq;

                const order = new Order({
                    items: cart,
                    total,
                    token: tokenNum,
                    parcel: cart.some(item => item.parcel) // Check if any item has parcel
                });
                await order.save({ session });

                await session.commitTransaction();
                session.endSession();

                res.status(200).json({
                    message: 'Order placed successfully',
                    token: tokenNum
                });

            } catch (error) {
                await session.abortTransaction();
                session.endSession();

                console.error('Error placing order:', error);
                res.status(500).json({ message: 'Error placing order', error: error.message });
            }
        });


    app.get('/ambika-admin/dashboard', async (req, res) => {
        try {
            const currentOrders = await Order.find();
            const acceptedOrders = await AcceptedOrder.find();
            const doneOrders = await DoneOrder.find().sort({ createdAt: -1 });

            const orders = [
                ...currentOrders.map(order => ({ ...order.toObject(), status: 'current', parcel: order.parcel })),
                ...acceptedOrders.map(order => ({ ...order.toObject(), status: 'accepted', parcel: order.parcel })),
                ...doneOrders.map(order => ({ ...order.toObject(), status: 'done', parcel: order.parcel }))
            ];

            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ message: 'Error fetching orders', error: error.message });
        }
    });







    // Update order status

    // Finalize order (for "done" status)
    // app.post('/ambika-admin/dashboard', async (req, res) => {
    //     const { token } = req.params;

    //     try {
    //         // Move the order to the finalized collection or update its status
    //         const order = await Order.Order.findOneAndUpdate(
    //             { token },
    //             { finalized: true }, // You can customize this to suit your logic
    //             { new: true }
    //         );

    //         if (!order) {
    //             return res.status(404).json({ message: 'Order not found' });
    //         }

    //         res.status(200).json({
    //             message: 'Order finalized successfully',
    //             order
    //         });
    //     } catch (error) {
    //         console.error('Error finalizing order:', error);
    //         res.status(500).json({ message: 'Error finalizing order', error: error.message });
    //     }
    // });

    // Delete an order
    app.delete('/ambika-admin/dashboard', async (req, res) => {
        const { id } = req.body; // Get ID from the request body
        console.log("body is:",req.body)
        try {
            const result = await Order.findByIdAndDelete(id) || await AcceptedOrder.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ error: 'Failed to delete order' });
        }
    });





    app.post('/ambika-admin/dashboard', async (req, res) => {
        const { status, id: _id } = req.body;
        console.log("_id is:", _id);
        console.log("body is:", req.body);

        try {
            if (status === 'accepted') {
                // Move from Orders to AcceptedOrders
                const order = await Order.findById(_id);
                
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                console.log("order:", order);

                // Create a new AcceptedOrder with the found order data
                const acceptedOrder = new AcceptedOrder(order.toObject());
                await acceptedOrder.save();

                // Delete the original order
                await Order.findByIdAndDelete(_id);

                res.status(200).json({ message: 'Order moved to acceptedOrders', acceptedOrder });

            } else if (status === 'done') {
                // Move from AcceptedOrders to DoneOrders
                const order = await AcceptedOrder.findById(_id);
                
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                console.log("order:", order);

                // Create a new DoneOrder with the found order data
                const doneOrder = new DoneOrder(order.toObject());
                await doneOrder.save();

                // Delete the accepted order
                await AcceptedOrder.findByIdAndDelete(_id);

                res.status(200).json({ message: 'Order moved to doneOrders', doneOrder });

            } else {
                res.status(400).json({ error: 'Invalid status' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error updating order status', details: error.message });
        }
    });




    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });