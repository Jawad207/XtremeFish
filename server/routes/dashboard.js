import express from "express";
import { dashboard } from "../controllers/Dashboard.js";


const router = express.Router();


router.get("/getAllUser", dashboard.getAllUser);
router.get("/getLoginAttempts", dashboard.getAllLoginAttempts);

export default router;
