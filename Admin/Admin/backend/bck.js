import 'dotenv/config';
import express from 'express';
import AWS from 'aws-sdk';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Endpoint to list all orders
app.get('/admin', async (req, res) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Prefix: 'orders/'
        };

        const data = await s3.listObjectsV2(params).promise();
        const orders = data.Contents.map(item => item.Key);

        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders
        });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
});

// Endpoint to get a specific order by orderId
app.get('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `orders/${orderId}.json`
        };

        const data = await s3.getObject(params).promise();
        const orderData = JSON.parse(data.Body.toString('utf-8'));

        res.status(200).json({
            message: 'Order retrieved successfully',
            order: orderData
        });
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
