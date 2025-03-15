require('dotenv').config();
import app, { listen } from './app';
const app = express();
import { connect } from './config/db';
const PORT = process.env.PORT || 5001;

connect().then(() => {
  listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});