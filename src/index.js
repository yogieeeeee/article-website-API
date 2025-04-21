import express from "express"
import upload from "express-fileupload"
import connectDB from "./config/db.js"
import createAdmin from "./setup/createAdmin.js"
const app = express()

connectDB()
createAdmin()
app.use(express.json())
app.use(upload())

app.listen(5000, () => {
  console.log("server is running on port 5000")
})
