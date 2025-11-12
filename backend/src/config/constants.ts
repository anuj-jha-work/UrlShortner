import dotenv from 'dotenv';
dotenv.config();

const nanoidSize: number = Number(process.env.NANOID_SIZE);
const port: number = Number(process.env.PORT);
const mongoUri: string = String(process.env.MONGO_URI);
const frontendUrl: string = String(process.env.FRONTEND_URL);
const jwtSecret: string = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const jwtExpiresIn: string = process.env.JWT_EXPIRES_IN || '7d';

export { nanoidSize, port, mongoUri,frontendUrl, jwtSecret, jwtExpiresIn };
