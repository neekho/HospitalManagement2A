const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientDocument = new Schema({
  firstName: {
    type: String,
    required: [true, "first name is needed"],
    trim: true, // "   ONG    " -> "Ong"
    
    
  },

  lastName: {
    type: String,
    required: [true, "last name is needed"],
  },

  age: {
    type: Number,
    required: [true, "age is required"],
    min: 1,
    max: 130

  },

  phoneNumber: {
    type: String, 
    validate: {
      validator: function(v){
        // 09xxxxxxxxx
        // data: 09772102013
        return /^09\d{9}$/.test(v);
      },

      message: props => `${props.value} is not a valid phone number format pls use 09xxxxxxxxx`,
      required: [true, "phone number is required"]
    }
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
