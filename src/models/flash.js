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
  },
  work_to: {
    type: String,
  },
});
module.exports = mongoose.model("flash", flash);
