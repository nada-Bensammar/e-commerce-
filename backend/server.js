const app = require('./app');
const { connect } = require('./config/db');
const PORT = process.env.PORT || 5000;

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});