const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Image = require("./Image");
const Address = require("./Address");
const {
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const carSchema = new mongoose.Schema({
  title: DEFAULT_STRING_SCHEMA_REQUIRED,
  description: { ...DEFAULT_STRING_SCHEMA_REQUIRED, maxLength: 1024 },
  carType: DEFAULT_STRING_SCHEMA_REQUIRED,
  carModel: DEFAULT_STRING_SCHEMA_REQUIRED,
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  image: Image,
  address: Address,
  likes: [String],
  bookedDates: {
    type: [Schema.Types.Mixed],
    default: [],
  },
  price: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Car = mongoose.model("cars", carSchema);

module.exports = Car;
