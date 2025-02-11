import express from "express";
import { createPost, getAllPosts, updatePost, deletePost } from "../controllers/postController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost); // Create a post
router.get("/", getAllPosts); // Get all posts
router.put("/:id", protect, updatePost); // Update a post
router.delete("/:id", protect, deletePost); // Delete a post

export default router;