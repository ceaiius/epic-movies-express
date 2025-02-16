import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/commentController.js";
import { updateComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, createComment); // Create a comment
router.get("/:postId", getCommentsByPost); // Get comments for a post
router.delete("/:id", protect, deleteComment); // Delete a comment
router.put("/:id", protect, updateComment); // Delete a comment

export default router;