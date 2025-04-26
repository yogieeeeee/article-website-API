import express from "express"
import upload from "express-fileupload"
import connectDB from "./config/db.js"

// Setup
import createAdmin from "./setup/createAdmin.js"
// Routes
import authRoute from "./routers/auth.route.js"
import adminRoute from "./routers/admin.route.js"
const app = express()

connectDB()
createAdmin()
app.use(express.json())
app.use(upload())

// Authorization route
app.use("/api/auth", authRoute)
// Admin route
app.use("/api/admin", adminRoute)

app.listen(5000, () => {
  console.log("server is running on port 5000")
})
