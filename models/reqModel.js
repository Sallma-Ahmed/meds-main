const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
  nameofuser: { type: String, required: true },
  idfreq: { type: String, required: true },
  namenewca: { type: String, required: true },
  namenewmeds: { type: String, required: true },
  status: { type: String, required: true},
});

const ReqModel = mongoose.model('ReqModel', reqSchema);

module.exports = ReqModel;
