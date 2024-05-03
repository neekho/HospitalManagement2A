const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

router.get("/", patientController.patients);

// api/v1/patients/id
// api/v1/patients/661cd3a0e28300c6a3444b46
router.get("/query", patientController.queryPatientName);
router.get("/:id", patientController.patient);



//create
router.post("/create", patientController.createPatient);

// create a nested patient record
router.post("/nested", patientController.nested);


router.delete("/delete/:patientID", patientController.deletePatient);

router.put("/update/:id", patientController.updatePatient);



module.exports = router;
