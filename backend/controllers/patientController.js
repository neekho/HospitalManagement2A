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


module.exports.patients = (req, res) => {

  NestedPatient.find()
  .then((patients) => 
      res.status(200).json(patients)
  )
  .catch((error) => res.status(500).json({error: error.message || "Internal Server Error in querying by name"}))
}






module.exports.createPatient = (req, res) => {
  const { firstName, lastName, suffix, age, phoneNumber, confined, allergies, admission } = req.body;

  const newPatient = new NestedPatient({
    firstName, lastName, suffix, age, phoneNumber, confined, allergies, admission
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

  const allowedSuffixes = ["Sr.", "Jr.", "II", "III", "IV", "PhD", "MD", "Prof"]; // List all allowed suffixes

  // Check if the entered suffix is within the list of allowed suffixes
  if (!allowedSuffixes.includes(suffix)) {
    return res.status(400).json({ error: "Invalid suffix provided" });
  }

  try {


    const savedPatient = newPatient.save();
    res.status(201).json({ "new patient": newPatient });
  } catch (error) {

    if (error.name === 'ValidationError') {

      res.status(400).json({ message: error.message });
    }

    res.status(500).json({ error: error.message || "Internal Server Error" });
  }


//   REQUEST BODY FOR THIS POST REQUEST
//   {
//     "firstName": "First",
//     "lastName": "Surname",
//     "suffix": "III",
//     "age": 15,
//     "phoneNumber": "09123456789"
//     "allergies": ["A", "B"],
//     "admission": [
//       {
//         "diagnosis": "Heat Stroke",
//         "attendingDoctor": {
//           "firstName": "AAA",
//           "lastName": "BBB",
//           "speciality": "Ortho"

//         }
//       }
//     ]
    
//   }

// }


}

module.exports.deletePatient = (req, res) => {

  const patientID = req.params.id;

  NestedPatient.findByIdAndDelete(patientID)
  .then(() => res.status(200).json({message: `succesfully deleted admission ${patientID}`}))
  .catch((err) => res.status(500).json({error: err.message || "Interal Server Error in deleting patient"}))

}