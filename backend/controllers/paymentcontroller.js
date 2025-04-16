import stripe from '../config/stripe.js';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    
    
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), 
      currency: 'usd',
      metadata: { 
        userId: req.user?.id || 'guest' 
      }
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount / 100 
    });
    
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ 
      error: err.message || 'Payment processing failed' 
    });
  }
};