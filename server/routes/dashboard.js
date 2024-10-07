import express from "express";
import { dashboard } from "../controllers/Dashboard.js";

const router = express.Router();
router.get("/getAllUser", dashboard.getAllUser);
router.get("/getLoginAttempts", dashboard.getAllLoginAttempts);
router.post("/createPost", dashboard.createPost);
router.get("/getPost", dashboard.getPostById);
router.get("/getPosts", dashboard.getPosts);
router.patch("/updatePost", dashboard.updatePost);
router.delete("/deletepost", dashboard.deletePost);
router.post("/generate-acc-otp", dashboard.generateOtpAndSave);
router.post("/verify-acc-otp", dashboard.verifyOtp);
router.post("/verify-bank-pin", dashboard.verifyBankPin);
router.post("/set-acc-pass", dashboard.setPassword);
router.get("/getAccount", dashboard.getSingleAccount);
router.get("/getAccounts", dashboard.getAccounts);
router.get("/getAllAccounts", dashboard.getAllAccounts);
router.get("/getNotifications", dashboard.getNotifications);
router.get("/getNotification", dashboard.getNotification);
router.patch("/deleteNotification", dashboard.deleteNotification);
router.delete("/deleteAccount", dashboard.deleteAccount);
router.get("/editProfile", dashboard.editUserProfile);

export default router;
