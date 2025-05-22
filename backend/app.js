import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import productRoute from './routes/productRoutes.js';
import userroute from './routes/userroute.js';
import orderroute from './routes/orderroute.js';
import reviewroute from './routes/reviewroutes.js';
import commentroute from './routes/commentroute.js';
import adminroute from './routes/adminroute.js';

import cartRoutes from './routes/cartroute.js'



dotenv.config();
const app = express();

app.use(cors());
 
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


app.use('/api/products', productRoute);
app.use('/api/users', userroute);
app.use('/api/orders', orderroute);
app.use('/api/reviews', reviewroute);
app.use('/api/comments', commentroute);
app.use('/api/admin', adminroute);
app.use('/api/cart',cartRoutes);



app.get('/', (req, res) => {
  res.send('Welcome to the Electronics Shop API!');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});