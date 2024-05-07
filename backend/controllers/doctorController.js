const Doctor = require('../models/doctorSchema');


module.exports.doctors = (req, res) => {
    Doctor.find({})
    .then((doctors) => res.status(200).json(doctors))
    .catch((err) => res.status(500).json({error: err.message || "Internal Server Error in getting all doctors"}))
}

module.exports.doctor = (req, res) => {

    const doctorID = req.params.id

    Doctor.findById(doctorID)
    .then((doctor) => res.status(200).json(doctor))
    .catch((err) => res.status(500).json(err))

}


module.exports.createDoctor = (req, res) => {

    const { firstName, lastName, speciality} = req.body

    const newDoctor = Doctor({
        firstName,
        lastName,
        speciality
    })

    try {

        const saveDoctor = newDoctor.save()
        res.status(201).json({'new doctor': newDoctor})

    } catch(err) {
        res.status(500).json({'error': err.message || 'Internal Server Error in creating a doctor'})

    }


};


module.exports.updateDoctor = (req, res) => {

    const { firstName, lastName, speciality, active} = req.body

    const updatedAttributes = {firstName, lastName, speciality, active}

    const doctorID = req.params.id;

    Doctor.findByIdAndUpdate(doctorID, updatedAttributes, {new: true})
    .then((updatedDoctorInfo) => res.status(200).json(updatedDoctorInfo))
    .catch((err) => res.status(500).json({error: err.message || "Internal Server Error in updating doctor" }))


};


module.exports.deleteDoctor = (req, res) => {
    const doctorID = req.params.id

    Doctor.findByIdAndDelete(doctorID)
    .then(() => res.status(200).json({message: `succesfully deleted ${doctorID}`}))
    .catch((err) => res.status(500).json({error: err.message || "Interal Server Error in deleting doctor"})) 
}


module.exports.queryDoctorName = (req, res) => {

    const queryFirstName = req.query.firstName;
    const queryLastName = req.query.lastName;


    console.log(queryFirstName, queryLastName)


    Doctor.find({firstName: queryFirstName, lastName: queryLastName})
    .then((doctor) => 
        res.status(200).json({'result': doctor})
    )
    .catch((error) => res.status(500).json({error: error.message || "Internal Server Error in querying by name"}))
}