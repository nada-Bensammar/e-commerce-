import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"


dotenv.config();


const uri = process.env.DATABASE_URL;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

console.log('Database URL:', process.env.DATABASE_URL);

const app = express();
app.use(cors())

app.use(express.json());



import userroutes from "./routes/userroute.js"
import productroutes from './routes/productRoutes.js';
import orderroutes from './routes/orderroute.js';
import paymentroutes from './routes/paymentRoute.js';
import reviewroutes from './routes/reviewroutes.js';

import commentroutes from './routes/commentroute.js'

app.use('/api/users', userroutes);
app.use('/api/products', productroutes);
app.use('/api/orders', orderroutes);
app.use('/api/payments', paymentroutes);
app.use('/api/reviews', reviewroutes);

app.use('/api/comments', commentroutes)
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.get('/api/test', (req, res) => {
  res.json({ message: "API is working!" });
  
}); 


app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from backend!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});