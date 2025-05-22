import Cart from '../models/cart.js';

const getUserCart = async (userId) => {
  return await Cart.findOne({ userId });
};

export const getCart = async (req, res) => {
  const cart = await getUserCart(req.user._id);
  res.json(cart || { userId: req.user._id, items: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await getUserCart(req.user._id);

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [] });
  }

  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  cart.updatedAt = Date.now();
  await cart.save();
  res.json(cart);
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await getUserCart(req.user._id);
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(i => i.productId.toString() === productId);
  if (item) item.quantity = quantity;

  cart.updatedAt = Date.now();
  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const cart = await getUserCart(req.user._id);

  if (cart) {
    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    cart.updatedAt = Date.now();
    await cart.save();
  }

  res.json(cart || { userId: req.user._id, items: [] });
};

export const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });
  res.json({ message: 'Cart cleared' });
};
