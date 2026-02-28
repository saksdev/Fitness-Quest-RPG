const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit if DB connection fails in dev
  });

module.exports = mongoose;