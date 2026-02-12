import express from "express";
import { 
    createSkill, 
    getAllSkill, 
    getSkillBySlug, 
    searchSkills 
} from "../controllers/skill_controller.js";
import { verifyToken } from "../middlewares/isAuth.js";
import { verifyAdmin } from "../middlewares/admin.js";

const skillRouter = express.Router();

// IMPORTANT ORDER

skillRouter.get("/search", searchSkills);
skillRouter.get("/", getAllSkill);
skillRouter.get("/:slug", getSkillBySlug);
skillRouter.post("/admin", verifyToken, verifyAdmin, createSkill);

export default skillRouter;
