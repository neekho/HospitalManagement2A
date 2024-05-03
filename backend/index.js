require("dotenv").config();
const express = require("express");
const app = express();
const portNumber = 4000;

const mongoose = require("mongoose");

// Middleware

app.use(express.json());

// DB Connection

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

let db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => console.log("connected to MongoDB"));

// Routes
// Patients
const patientRoute = require("./routes/patientRoute");
app.use("/api/v1/patients", patientRoute);


// Doctors
const doctorRoute = require("./routes/doctorRoute");
app.use("/api/v1/doctors", doctorRoute);

// Admissions 
const admissionRoute = require('./routes/admissionRoute')
app.use("/api/v1/admissions", admissionRoute)













app.listen(portNumber, () => {
  console.log("new changee 1");
  console.log("new changee 2");

  console.log("new changee 3");

  console.log(`server is running on http://localhost:${portNumber}`);

  console.log("new changee 4");
});



// 1. Araneta
// 2. Ong
// 3. Carandang
// 4. Gallardo
// 5. Estacio
// 6. Quiroz
// 7. Manalo
// 8. Lopez (code)
// 9. Espinoza (code)
