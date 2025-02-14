import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile, uploadAvatar } from "../controllers/profileController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/uploads/" });

router.put("/update", protect, updateProfile);
router.post("/avatar", protect, upload.single("avatar"), uploadAvatar);

export default router;