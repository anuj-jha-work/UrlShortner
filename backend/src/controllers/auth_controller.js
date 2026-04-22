import { registerUser, loginUser } from "../services/auth_service.js";
import { ExpressError } from "../utils/expressError.js";
import { findUserById } from "../dao/user_dao.js";
export const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ExpressError("All fields are required", 400);
    }
    try {
        const authResponse = await registerUser(name, email, password);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: authResponse,
        });
    }
    catch (error) {
        if (error.message.includes("already exists")) {
            throw new ExpressError(error.message, 409);
        }
        throw new ExpressError(error.message, 400);
    }
};
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ExpressError("Email and password are required", 400);
    }
    try {
        const authResponse = await loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: authResponse,
        });
    }
    catch (error) {
        throw new ExpressError(error.message, 401);
    }
};
export const getMeController = async (req, res) => {
    const userId = req.user.userId;
    const user = await findUserById(userId);
    if (!user) {
        throw new ExpressError("User not found", 404);
    }
    res.status(200).json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
    });
};
