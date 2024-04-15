const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientDocument = new Schema({
  firstName: {
    type: String,
    required: [true, "first name is needed"],
  },

  lastName: {
    type: String,
    required: [true, "last name is needed"],
  },

  age: {
    type: Number,
    required: [true, "age is required"],
  },

  active: {
    type: Boolean,
    default: true,
  },

  confined: {
    type: Boolean,
    default: true,
  },

  dateConfined: {
    type: Date,
    default: new Date(),
  },
});

const Patient = mongoose.model("Patient", patientDocument);
module.exports = Patient;
