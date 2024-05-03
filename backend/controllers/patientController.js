const Patient = require("../models/patientSchema");


module.exports.patients = (req, res) => {
  Patient.find({ active: true })
    .then((patients) => res.send(patients))
    .catch((error) => res.send(error));
};

module.exports.patient = (req, res) => {
  const patientID = req.params.id;

  Patient.findById(patientID)
    .then((patients) => res.send(patients))
    .catch((error) => res.send(error));
};

module.exports.createPatient = (req, res) => {
  const { firstName, lastName, age, phoneNumber, confined, dateConfined } = req.body;

  const newPatient = new Patient({
    firstName,
    lastName,
    age,
    phoneNumber,
    confined,
    dateConfined
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

  const update = { active: false, confined: false };

  Patient.findByIdAndUpdate(patientID, update, { new: true })
    .then((patient) => res.send(patient))
    .catch((error) => res.send(error));
};

module.exports.updatePatient = (req, res) => {
  const { firstName, lastName, age, active, confined } = req.body;

  console.log(req.body);

  const patientID = req.params.id;
  console.log(patientID);

  const updatedFields = { firstName, lastName, age, active, confined };

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























const NestedPatient = require('../models/testSchema')

//api/v1/patients/search?firstName=Ethan&lastName=DelaCruz

module.exports.queryPatientName = (req, res) => {

  const queryFirstName = req.query.firstName;
  const queryLastName = req.query.lastName;


  NestedPatient.find({firstName: queryFirstName, lastName: queryLastName})
  .then((patient) => 
      res.status(200).json({'result': patient})
  )
  .catch((error) => res.status(500).json({error: error.message || "Internal Server Error in querying by name"}))
}

module.exports.nested = (req, res) => {
  const { firstName, lastName, age, phoneNumber, confined, allergies, admission } = req.body;

  const newPatient = new NestedPatient({
    firstName, lastName, age, phoneNumber, confined, allergies, admission
  });

  // {"age": "twelve"}
  if (typeof age !=='number') {
    return res.status(400).json({error: "invalid age"})
  }

  if (isNaN(age) || age < 1 || age > 130) {
    return res.status(400).json({ error: "Age must be a number between 1 and 130." });
  }

  // {"lastName": 344}
  if (typeof lastName !=='string') {
    return res.status(400).json({error: "invalid lastnmae"})
  }

  if (!/^09\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({ error: "Phone number must be in the format 09xxxxxxxxx." });
  }


  try {
    const savedPatient = newPatient.save();
    res.status(201).json({ "new patient": newPatient });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }


  // REQUEST BODY FOR THIS POST REQUEST
  // {
  //   "firstName": "First",
  //   "lastName": "Surname",
  //   "age": 15,
  //   "allergies": ["A", "B"],
  //   "admission": [
  //     {
  //       "diagnosis": "Heat Stroke",
  //       "attendingDoctor": {
  //         "firstName": "AAA",
  //         "lastName": "BBB",
  //         "speciality": "Ortho"

  //       }
  //     }
  //   ]
    
  // }

}