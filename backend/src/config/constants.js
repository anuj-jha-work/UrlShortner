import dotenv from 'dotenv';
dotenv.config();
const nanoidSize = Number(process.env.NANOID_SIZE);
const port = Number(process.env.PORT);
const mongoUri = String(process.env.MONGO_URI);
const frontendUrl = String(process.env.FRONTEND_URL);
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
export { nanoidSize, port, mongoUri, frontendUrl, jwtSecret, jwtExpiresIn };
