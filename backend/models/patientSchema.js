const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const referencePatient = Schema({
  firstName: {
      type: String,
      trim: true,
      required: [true, "first name is needed"],
  },
  
  lastName: {
      type: String,
      trim: true,
      required: [true, "last name is needed"],
  },

  suffix: {
    type: String,
    enum: ["Sr.", "Jr.", "II", "III", "IV", "PhD", "MD", "Prof"] 

},
  
  age: {
      type: Number,
      min: 0,
      max: 130,
      required: [true, "age is required"],
  },

  phoneNumber: {
      type: String,
      validate: {
          validator: function(v) {
            return /^09\d{9}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number format, please use 09xxxxxxxxx`,
          required: [true, "phone number is required"]
      }
  },

  confined: {
      type: Boolean,
      default: true,
  },

  allergies: {
      type: [String]
  },

  admissions: [{type: mongoose.Types.ObjectId, ref: "Admission"}]
  

    

})

const Patient = mongoose.model("Patient", referencePatient);
module.exports = Patient;
