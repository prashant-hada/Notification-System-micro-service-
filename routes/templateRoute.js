import { Router } from "express";
import {
    getTemplateById, 
    getAllTemplates, 
    createTemplate, 
    updateTemplate, 
    deleteTemplate
} from "../controllers/templateController.js"

const router = Router();

router.get("get-one/:templateId", getTemplateById);
router.get("/get-all",getAllTemplates);
router.post("/create", createTemplate);
router.patch("/update:templateId", updateTemplate);
router.delete("/delete/:templateId", deleteTemplate)

export default router;