const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://dbuser:Fitness123@cluster0.tsgreh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Connection error:', err));

module.exports = mongoose;