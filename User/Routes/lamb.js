const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

exports.handler = async (event) => {
    // Determine the resource path to differentiate between user profile and order requests
    const resourcePath = event.resource;
    if (resourcePath === "/order") {
        // Handle user orders
        const userOrder = JSON.parse(event.body);

        const params = {
            TableName: 'UserOrders', // Replace with your DynamoDB table name
            Item: {
                phone:userOrder.phone,
                orderId: userOrder.orderId, // Ensure you have a unique identifier
                userId: userOrder.userId,
                items: userOrder.items,
                total: userOrder.total,
                orderDate: userOrder.orderDate
                // Add other order attributes as needed
            }
        };

        try {
            await dynamo.put(params).promise();

            const message = `New order created: ${JSON.stringify(userOrder)}`;
            const snsParams = {
                Message: message,
                TopicArn: 'arn:aws:sns:us-east-2:992382606877:OrderNotifications.fifo' // Replace with your SNS topic ARN for orders
            };

            await sns.publish(snsParams).promise();

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Order saved successfully' })
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Could not save order' })
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid resource path' })
        };
    }
};
