const express = require('express')

const router = express.Router()

const doctorController = require('../controllers/doctorController')

//http://localhost:3000/api/doctors/search?firstName=John&lastName=Doe 
router.get("/search", doctorController.queryDoctorName)

router.get("/", doctorController.doctors)

router.get("/:id", doctorController.doctor)

router.post("/create", doctorController.createDoctor)

router.delete("/delete/:id", doctorController.deleteDoctor)

router.put("/update/:id", doctorController.updateDoctor)



module.exports = router