const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    const uri = 'mongodb+srv://salmaahmed1660:BQIRwPLTFsDUuzCO@med.gihucf5.mongodb.net/';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongoDB;
