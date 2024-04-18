const mongoose = require('mongoose');

const medSchema = new mongoose.Schema({
  id_med: { type: Number, required: true },
  price: { type: Number, required: true },
  Name_meds: { type: String, required: true },
  description_meds: { type: String, required: true },
  Expiration_date: { type: Date, required: true },
  userfid: { type: Number, required: true },
  namefcategory: { type: String, required: true },
});

const Med = mongoose.model('Med', medSchema);

module.exports = Med;
