const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
