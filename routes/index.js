import { Router } from "express";
import DummyDataRouter from "./dummyDataRoute.js"
import TemplateRouter from "./templateRoute.js"
import NotificationRouter from "./notificationRoutes.js" 
import PreferenceRouter from "./userRoute.js"

const router = Router();
router.get("/",(req,res,next)=>{
    res.send("Hi from server")
})

router.use("/create-data",DummyDataRouter);
router.use("template",TemplateRouter);
router.use("notification",NotificationRouter);
router.use("/preference",PreferenceRouter);

export default router;