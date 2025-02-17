import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getNotifications,
  markAllAsRead, // Add this
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.post("/read", protect, markAllAsRead);

export default router;