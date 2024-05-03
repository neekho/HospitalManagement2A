const mongoose = require('mongoose')

const Schema = mongoose.Schema


const doctorDocument = Schema({
    firstName: {
        type: String,
        required: [true, "first name is needed"],
      },
    
      lastName: {
        type: String,
        required: [true, "last name is needed"],
      },

      speciality: {
        type: String,
        required: [true, "speciality is needed"],
      },

})



const Doctor = mongoose.model("Doctor", doctorDocument);
module.exports = Doctor;