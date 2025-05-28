import Coupon from "../models/coupon.js";


export const validateCoupon = async (req, res) => {
  const { code, userId } = req.body;

 
  const coupon = await Coupon.findOne({ code });

 
  if (!coupon || (coupon.expiresAt && coupon.expiresAt < Date.now())) {
    return res.status(400).json({ valid: false, message: "Coupon is expired or invalid" });
  }

 
  if (coupon.usageLimit && coupon.usedBy.length >= coupon.usageLimit) {
    return res.status(400).json({ valid: false, message: "Coupon usage limit reached" });
  }


  if (coupon.usedBy.includes(userId)) {
    return res.status(400).json({ valid: false, message: "Coupon already used by you" });
  }

  
  res.json({ valid: true, discount: coupon.discount });
};


export const useCoupon = async (req, res) => {
  const { code, userId } = req.body;

  
  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    return res.status(404).json({ error: "Coupon not found" });
  }


  coupon.usedBy.push(userId);


  await coupon.save();

  
  res.json({ success: true });
};
