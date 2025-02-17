import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {getNotifications, markAllAsRead, getUnreadNotificationCount } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.get("/count", protect, getUnreadNotificationCount);
router.post("/read", protect, markAllAsRead);

export default router;