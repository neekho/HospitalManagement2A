const Admission = require('../models/admissionSchema')



const admissions = (req, res) => {
 Admission.find({})
 .then((admissions) => res.status(200).json(admissions))
 .catch((error) => res.status(500).json({error: error.message || "Internal Server Error in getting all admissions"}))
}


const admission = (req, res) => {

    const admissionId = req.params.id

    Admission.findById(admissionId)
    .then((admission) => res.status(200).json(admission))
    .catch((error) => res.status(500).json({error: error.message || `Internal Server Error in getting ${admissionId} admission`}))
   }
   
   

const createAdmission = (req, res) => {
    
    const { admissionDate, dischargeDate, diagnosis } = req.body 

    const newAdmission = Admission({
        admissionDate,
        dischargeDate,
        diagnosis
    })

    try {

        newAdmission.save()
        res.status(201).json({'new admission': newAdmission})

    } catch (error) {
        res.status(500).json({error: error.message || "Internal Server in creating an admission"})
    }


};


const updateAdmission = (req, res) => {
  const { admissionDate, dischargeDate, diagnosis } = req.body

  const updateAdmissions = { admissionDate, dischargeDate, diagnosis}

  const admissionId = req.params.id

  Admission.findByIdAndUpdate(admissionId, updateAdmissions, {new: true})
  .then((updatedAdmission) => res.status(200).json(updatedAdmission))
  .catch((error) => res.status(500).json({error: error.message || `error in updating admission document`}))
}
   
const deleteAdmissison = (req, res) => {

    const admissionId = req.params.id

    Admission.findByIdAndDelete(admissionId)
    .then(() => res.status(200).json({message: `succesfully deleted admission ${admissionId}`}))
    .catch((err) => res.status(500).json({error: err.message || "Interal Server Error in deleting admission"})) 

}

module.exports = { admissions, admission, createAdmission, updateAdmission, deleteAdmissison }