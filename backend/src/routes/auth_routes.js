import { Router } from "express";
import { registerController, loginController, getMeController, } from "../controllers/auth_controller.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { authenticate } from "../middlewares/auth.js";
const router = Router();
router.route("/register").post(wrapAsync(registerController));
router.route("/login").post(wrapAsync(loginController));
router.route("/me").get(authenticate, wrapAsync(getMeController));
export default router;
