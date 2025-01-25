import express from "express";
import googleAuth from "../controllers/authControllers/authController";

const authRoutes = express.Router();

authRoutes.post("/google-auth", googleAuth);

export default authRoutes;
