import { Router } from "express";
import {createDummyTemplateData, createUser} from "../controllers/dummyTemplateController.js";

const router = Router();

router.post("/dummy-templates",createDummyTemplateData)
router.post("/user",createUser);


export default router;