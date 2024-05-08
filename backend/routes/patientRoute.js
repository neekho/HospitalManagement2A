const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

const admissionController = require('../controllers/admissionController')


// api/v1/patients/query?firstName=Value&lastName=Surname
router.get("/query", patientController.queryPatientName);

router.get("/:id", patientController.patient);

// shows all patients
router.get("/", patientController.patients);


// create a nested patient record
router.post("/create", patientController.createPatient);

// delete entire patient record
router.delete("/delete/:id", patientController.deletePatient)









// ADMISSION

// create an admission record for a given patient
router.post("/create/admission/:patientID", admissionController.createAdmission)


// you will need to handle the deletion and updating of admission records for x patient, the method createAdmission pushes or inserts an admission object to a 
// a specific patient's admission list.
// in addition, you will need to handle the deletion and updating of a doctor's info WITHIN the admission record.

// you may opt for this nested document approach in contrast to referencing an object id, which i will discuss in the last branch of this repo.



// router.put("/update/admission/:patientID", admissionController.updateAdmission)
// router.delete("delete/admission/:patientiD", admissionController.deleteAdmission)



// END ADMISSION
















module.exports = router;
