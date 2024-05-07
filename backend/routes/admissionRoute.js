const express = require('express')

const router = express.Router()

const admissionController = require('../controllers/admissionController')

router.get("/", admissionController.admissions)

router.get("/:id", admissionController.admission)

router.post("/create", admissionController.createAdmission)

router.put("/update/:id", admissionController.updateAdmission)

router.delete("/delete/:id", admissionController.deleteAdmission)


module.exports = router