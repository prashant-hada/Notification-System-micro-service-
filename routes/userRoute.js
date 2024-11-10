import { Router } from "express";
import updateUserPreference from "../controllers/userController.js"

const router = Router();

router.patch("/update", updateUserPreference);
export default router;