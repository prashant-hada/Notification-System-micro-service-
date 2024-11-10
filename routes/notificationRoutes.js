import { Router } from "express";
import {sendNotification, scheduleNotification} from "../controllers/notificationController.js"

const router = Router();

router.post("/send", sendNotification);
router.post("/schedule", scheduleNotification);

export default router