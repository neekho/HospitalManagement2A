const NestedPatient = require('../models/testSchema')



const createAdmission = async (req, res) => {
    const patientId  = req.params.patientID
    const admissionData = req.body

    console.log(patientId)
  
    try {
      const patient = await NestedPatient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
  
      // Add the admission to the admissions array
      patient.admission.push(admissionData);
      await patient.save();
  
      const newAdmissionIndex = patient.admission.length - 1;

      res.status(201).json(patient.admission[newAdmissionIndex]); 
      // Return the newly added admission as a JSON response

    } catch (error) {
      console.error('Error creating admission:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }


    // {
    //     "confineDate": "2024-05-03T12:00:00Z",
    //     "diagnosis": "Lung Cancer",
    //     "dischargeDate": null,
    //     "attendingDoctor": {
    //       "firstName": "Jane",
    //       "lastName": "Smith",
    //       "speciality": "Cancer"
    //     }
    //   }


};
  
  module.exports = {
    createAdmission
  };