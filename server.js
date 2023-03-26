const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

// Routers
const PatientRouter = require("./routes/patient")
const DoctorRouter = require("./routes/doctor")
const AdminRouter = require("./routes/admin")
const LoginRouter = require("./routes/login")
const RegisterRouter = require("./routes/register")
const ContactusRouter = require("./routes/contactus")

// constanst
const { MONGO_URI,PORT } = require('./constants')

// Middlewares
app.use(express.json(),(err,req,res,next) => {      // bodyparse middle ware checks for valid body format
  if(err)
    res.sendStatus(400)
  else
    next()
})


app.use(cors())      // cors middleware

// Connection to Database
mongoose.set("strictQuery", true);
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT,() => {
        console.log(`Server Running on PORT ${PORT}`)
    })
})


// Routes
app.use("/login",LoginRouter)           // Login Router
app.use("/register",RegisterRouter)     // Register Router
app.use("/contact-us",ContactusRouter)  // Contact us Router
app.use("/patient",PatientRouter)       // Patient Router
app.use("/doctor",DoctorRouter)         // Doctor Router
app.use("/admin",AdminRouter)           // Admin Router
app.use("*",(req,res) => {
  res.sendStatus(404)                   // No path found
})
