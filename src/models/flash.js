const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird");

const flash = new Schema({
  active: {
    type: Boolean,
    required: true,
    unique: true,
  },
  work_from: {
    type: String,
    required: true,
  },
  work_to: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("flash", flash);
