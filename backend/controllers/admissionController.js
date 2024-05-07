const Admission = require('../models/admissionSchema')
const Patient = require('../models/patientSchema')


const admissions = (req, res) => {
 Admission.find({}).populate("attendingDoctor")
 .then((admissions) => res.status(200).json(admissions))
 .catch((error) => res.status(500).json({error: error.message || "Internal Server Error in getting all admissions"}))
}


const admission = (req, res) => {

    const admissionId = req.params.id

    Admission.findById(admissionId).populate("attendingDoctor")
    .then((admission) => res.status(200).json(admission))
    .catch((error) => res.status(500).json({error: error.message || `Internal Server Error in getting ${admissionId} admission`}))
   }
   
   

const createAdmission = async (req, res) => {
    
    const { patient, admissionDate, dischargeDate, diagnosis, attendingDoctor} = req.body

    const newAdmission = Admission({
        patient,
        admissionDate,
        dischargeDate,
        diagnosis,
        attendingDoctor
        
    })

    try {

        newAdmission.save()

        // this will insert the admission record/object to the associated patient's admission list.
        await Patient.findByIdAndUpdate(patient, { $push: { admissions: newAdmission._id } });
        res.status(201).json({'new admission': newAdmission})

    } catch (error) {
        res.status(500).json({error: error.message || "Internal Server in creating an admission"})
    }


};


const updateAdmission = async (req, res) => {

  const admissionID = req.params.id

  try {
      
        const { admissionDate, dischargeDate, diagnosis, attendingDoctor } = req.body
      
        const updateFields = { admissionDate, dischargeDate, diagnosis, attendingDoctor }
        
        const updateAdmission = await Admission.findByIdAndUpdate(admissionID, updateFields, {new: true})

        if (!updateAdmission) {
            return res.status(404).json({ error: "Admission not found" });
        }

        return res.status(200).json({ message: `Successfully updated admission ${admissionID}`, admission: updateAdmission });

  } catch(error) {
        res.status(500).json({ error: error.message || "Internal Server Error in updating admission" });

  }

}
   


const deleteAdmission = async (req, res) => {
    try {
        const admissionID = req.params.id;

        // Find the admission document by ID using the id from the path param
        const admission = await Admission.findById(admissionID);

        if (!admission) {
            return res.status(404).json({ error: "Admission not found" });
        }

        const patientID = admission.patient

        // Remove the admission from the patient's admissions list
        await Patient.findByIdAndUpdate(patientID, { $pull: { admissions: admissionID } });

        // Delete the admission document
        await Admission.findByIdAndDelete(admissionID);

        res.status(200).json({ message: `Successfully deleted admission ${admissionID}` });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error in deleting admission" });
    }
};


module.exports = { admissions, admission, createAdmission, updateAdmission, deleteAdmission }