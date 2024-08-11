import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';

// Create S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Define CORS configuration
const corsConfig = {
  Bucket: process.env.S3_BUCKET_NAME, // Ensure this is correctly loaded from your environment variables
  CORSConfiguration: {
    CORSRules: [
      {
        AllowedHeaders: ['*'],
        AllowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
        AllowedOrigins: ['*'],
        ExposeHeaders: [],
      },
    ],
  },
};

// Create command
const command = new PutBucketCorsCommand(corsConfig);

// Function to set CORS configuration
(async () => {
  try {
    const data = await s3.send(command);
    console.log('CORS configuration set successfully:', data);
  } catch (err) {
    console.error('Error setting CORS configuration:', err);
  }
})();
