const mongoose = require("mongoose");



// NESTED DOCUMENTS

// {
// 	“firstName”: “Wowers”,
// 	“lastName”: “McArthur”,
// 	“age”: 22,
// 	“false,
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

// 		}
	
	
// 	]

// }
// below is how we will structure the document above

const Schema = mongoose.Schema

const nestedPatientSchema = Schema({

    firstName: {
        type: String,
        required: [true, "first name is needed"],
        trim: true, // "   ONG    " -> "Ong"
        
        
    },
    
    lastName: {
        type: String,
        required: [true, "last name is needed"],
        trim: true
    },

    suffix: {
        type: String,
        enum: ["Sr.", "Jr.", "II", "III", "IV", "PhD", "MD", "Prof"] 
    
    },

    age: {
        type: Number,
        required: [true, "age is required"],
        min: 1,
        max: 130

    },
    
    phoneNumber: {
        type: String, 
        validate: {
          validator: function(v){
            // 09xxxxxxxxx
            // data: 09772102013
            return /^09\d{9}$/.test(v);
          },
    
          message: props => `${props.value} is not a valid phone number format pls use 09xxxxxxxxx`,
          required: [true, "phone number is required"]
        }
    },
    
    confined: {
        type: Boolean,
        default: true,
    },


    allergies: {
        type: [String],
        trim: true
    },

    admission: {
        type: [
            {
                confineDate: {type: Date, default: new Date()},
                diagnosis: {type: String, default: "in the process of checking", trim: true},
                dischargeDate: {type: Date, default: null},

                attendingDoctor: {
                    firstName: {type: String, required:[true, 'doctor first name required'], trim: true},
                    lastName: {type: String, required:[true, 'doctor last name required'], trim:true},
                    speciality: {type: String}

                }
            }
        ]
    }

});


const NestedPatient = mongoose.model('NestedPatient', nestedPatientSchema)

module.exports = NestedPatient;