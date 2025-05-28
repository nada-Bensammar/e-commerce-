import express from "express";
import { getProductRecommendations } from "../services/aiService.js";

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { productName } = req.body;

  try {
    const recommendations = await getProductRecommendations(productName);
    res.json({ recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI recommendation failed." });
  }
});

export default router;
