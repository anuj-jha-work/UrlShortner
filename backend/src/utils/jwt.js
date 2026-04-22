import jwt from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../config/constants.js";
export const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, jwtSecret, { expiresIn: jwtExpiresIn });
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
};
