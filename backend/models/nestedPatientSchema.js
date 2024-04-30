const moongose = require('mongoose');

const Schema = moongose.Schema;

const nestedPatientSchema = Schema({
    
    firstName: {
        type: String,
        required: [true, "first name is needed"],
    },
    
      lastName: {
        type: String,
        required: [true, "last name is needed"],
    },
    
    age: {
        type: Number,
        required: [true, "age is required"],
    },
    
    active: {
        type: Boolean,
        default: true,
    },
    
    confined: {
        type: Boolean,
        default: true,
    },

    allegergies: {
        type: [String]
    },

    admissions: {
        type: [{
            confineDate: {
                type: Date, 
                default: new Date()
            },

            diagnosis: {
                type: String,
                default: "none yet"
            },

            dischargeDate: {
                type: Date,
                default: null
            },

            attendingDoctor: {
                firstName: {type: String, required:[true, "doctor first name is needed"]},
                lastName: {type: String, required:[true, "doctor last name is needed"]},
                speciality: {type: String},

            }

        }]
    }

      

});


// {
// 	“firstName”: “Wowers”,
// 	“lastName”: “McArthur”,
// 	“age”: 22,
// 	“active: false,
// 	“allergies”: [“peanuts”, “shrimp”],
// 	“admissions”: [
// 		{
// 			“confineDate”: “2024-04-29”,
// 			“diagnosis“: “Cancer”,
// 			“dischargeDate”: “”,
// 			“attendingDoctor”: {
// 				“firstName”: “Name”,
// 				“lastName”: “Surname”
// 				“speciality”: “Cancer”
// 			}
			
// 		},

// 		{
// 			“confineDate”: “2024-04-29”,
// 			“diagnosis“: “Cancer”,
// 			“dischargeDate”: “”,
// 			“attendingDoctor”: {
// 				“firstName”: “Name”,
// 				“lastName”: “Surname”,
// 				“speciality”: “Cancer”
// 			}

// 		},
// 		…..
	
// 	]
// }



// request body for postman
// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "age": 30,
//     "allergies": ["Peanuts", "Penicillin"],
//     "admissions": [
//       {
//         "diagnosis": "Sprained ankle",
//         "attendingDoctor": {
//           "firstName": "Jane",
//           "lastName": "Smith",
//           "speciality": "Orthopedics"
//         }
//       }
//     ]
//   }




const NestedPatient = mongoose.model("NestedPatient", nestedPatientSchema);
module.exports = NestedPatient;
