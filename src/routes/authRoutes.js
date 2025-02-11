import express from "express";
import passport from "passport";
import { registerUser, loginUser, getUser, googleAuthSuccess, logoutUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  googleAuthSuccess
);

router.post("/logout", protect, logoutUser);


export default router;
