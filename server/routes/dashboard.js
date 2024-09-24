import express from "express";
import { dashboard } from "../controllers/Dashboard.js";


const router = express.Router();


router.get("/getAllUser", dashboard.getAllUser);
router.get("/getLoginAttempts", dashboard.getAllLoginAttempts);
router.post("/createPost", dashboard.createPost);
router.get("/getPost", dashboard.getPostById);
router.get("/getPosts", dashboard.getPosts);
router.get("/updatePost", dashboard.updatePost);
router.delete("/deletepost", dashboard.deletePost);

export default router;
