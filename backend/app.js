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
import categoryroutes from './routes/categoryroutes.js';
import commentroutes from './routes/commentroute.js'

app.use('/api/users', userroutes);
app.use('/api/products', productroutes);
app.use('/api/orders', orderroutes);
app.use('/api/payments', paymentroutes);
app.use('/api/reviews', reviewroutes);
app.use('/api/categories', categoryroutes);
app.use('/api/comments', commentroutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});