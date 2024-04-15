const Patient = require("../models/patientSchema");

const mongoose = require("mongoose");

module.exports.patients = (req, res) => {
  Patient.find({})
    .then((patients) => res.send(patients))
    .catch((error) => res.send(error));
};

module.exports.patient = (req, res) => {
  const patientID = req.params.id;

  Patient.findById(patientID)
    .then((patients) => res.send(patients))
    .catch((error) => res.send(error));
};
