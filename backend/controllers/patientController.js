const { model } = require("mongoose");
const Patient = require("../models/patientSchema");


module.exports.patients = (req, res) => {
  
  Patient.find({})
  .populate({
      path: 'admissions',
      populate: {
          path: 'attendingDoctor',
          model: 'Doctor'
      }
  })
  .exec()
  .then((patients) => res.send(patients))
  .catch((error) => res.send(error));

};

module.exports.patient = (req, res) => {
  const patientID = req.params.id;

  Patient.findById(patientID).populate({path: 'admissions', populate: {path: 'attendingDoctor', model: 'Doctor'}})
    .then((patients) => res.send(patients))
    .catch((error) => res.send(error));
};

module.exports.createPatient = (req, res) => {
  const { firstName, lastName, age, phoneNumber, confined, allergies, admissions } = req.body;

  const newPatient = new Patient({
    firstName,
    lastName,
    age,
    phoneNumber,
    confined,
    allergies,
    admissions
  });

  try {
    const savedPatient = newPatient.save();
    res.status(201).json({ "new patient": newPatient });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports.deletePatient = (req, res) => {
  const patientID = req.params.patientID;
  console.log(patientID);

  const update = {confined: false};

  Patient.findByIdAndUpdate(patientID, update, { new: true })
    .then((patient) => res.send(patient))
    .catch((error) => res.send(error));
};

module.exports.updatePatient = (req, res) => {
  const { firstName, lastName, age, confined } = req.body;

  console.log(req.body);

  const patientID = req.params.id;
  console.log(patientID);

  const updatedFields = { firstName, lastName, age, confined };

  console.log(updatedFields);

  Patient.findByIdAndUpdate(patientID, updatedFields, { new: true })
    .then((updatedPatient) => {
      if (!updatedPatient) {
        return res.status(404).json({ error: "patient not found" });
      }

      res.status(200).json(updatedPatient);
    })

    .catch((error) => {
      res.status(500).json({ error: error.message || "Internal server error" });
    });
};
