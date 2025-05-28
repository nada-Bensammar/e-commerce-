import express from "express";
import { validateCoupon, useCoupon } from "../controllers/couponcontroller.js";

const router = express.Router();

router.post("/validate", validateCoupon);
router.post("/use", useCoupon);

export default router;
