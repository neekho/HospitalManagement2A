const Patient = require("../models/testSchema");

module.exports.queryPatientName = (req, res) => {

  const queryFirstName = req.query.firstName;
  const queryLastName = req.query.lastName;

  const query = {}

  if (queryFirstName) {
    query.firstName = queryFirstName
  }

  if (queryLastName) {
    query.lastName = queryLastName
  }

  console.log(query)



  Patient.find(query)
  .then((patient) => 
      res.status(200).json({'result': patient})
  )
  .catch((error) => res.status(500).json({error: error.message || "Internal Server Error in querying by name"}))
}


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

module.exports.createPatient = (req, res) => {
  const { firstName, lastName, suffix, age, phoneNumber, confined, allergies, admissions } = req.body;

  const allowedSuffixes = ["Sr.", "Jr.", "II", "III", "IV", "PhD"]

  if (!allowedSuffixes.includes(suffix)) {
    return res.status(400).json({ error: "Invalid suffix provided" })
  }


  if (isNaN(age) || age < 1 || age > 130) {
    return res.status(400).json({ error: "Age must be a number between 1 and 130." })
  }

  if (!/^09\d{9}$/.test(phoneNumber)) {
    return res.status(400).json({ error: "Phone number must be in the format 09xxxxxxxxx." })
  }

  const newPatient = new Patient({
    firstName,
    lastName,
    suffix,
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
