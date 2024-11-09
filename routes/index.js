import { Router } from "express";
import DummyDataRouter from "./dummyDataRoute.js"

const router = Router();
router.get("/",(req,res,next)=>{
    res.send("Hi from server")
})
router.use("/create-data",DummyDataRouter);

export default router;