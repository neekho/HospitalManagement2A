const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const admissionDocument = Schema({

    patient: {type: mongoose.Types.ObjectId, ref: "Patient"},
 
    admissionDate: {
        type: Date,
        default: new Date()
    },

    dischargeDate: {
        type: Date,
        default: null
    },

    diagnosis: {
        type: String,
        default: "in the process of diagnosing.."
    },

    attendingDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }



})

const Admission = mongoose.model("Admission", admissionDocument);
module.exports = Admission;


