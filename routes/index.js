import { Router } from "express";
import DummyDataRouter from "./dummyDataRoute.js"
import TemplateRouter from "./templateRoute.js"

const router = Router();
router.get("/",(req,res,next)=>{
    res.send("Hi from server")
})

router.use("/create-data",DummyDataRouter);
router.use("template",TemplateRouter)

export default router;