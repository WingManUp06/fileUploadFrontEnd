// Allows .env files
require('dotenv').config();
const express = require("express");
const app = express();
// removes the error message
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
// Importing the s3 file
const s3 = require("./s3.js"); // HERE
// The port for our project
const PORT = 3000;

// allows form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// serves static content
app.use(express.static('public'))

// Routes
app.get("/s3Url", async (req, res) => {
    console.log("got the req")
    const url = await s3.generateUploadUrl()
    console.log(url)
    res.send({ url })
})

// Telling the app to listen on port 3000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})