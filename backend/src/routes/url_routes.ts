import { Router } from "express";
import { redirectUrlController, createUrlController, getAllUrlsController, getMyUrlsController } from "../controllers/url_controller.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { optionalAuth, authenticate } from "../middlewares/auth.js";


const router = Router();

interface UrlParams {
    shortId: string;
}


router.route("/api/create")
.post(optionalAuth, wrapAsync(createUrlController));

router.route("/api/urls")
.get(wrapAsync(getAllUrlsController));

router.route("/api/my-urls")
.get(authenticate, wrapAsync(getMyUrlsController));

router.route("/:shortId")
.get(wrapAsync(redirectUrlController));



export default router;