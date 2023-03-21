// for .env files
require('dotenv').config();
// to get AWS to work
// const aws = require("aws-sdk/clients/s3");
const aws = require("aws-sdk");
// crypto from node.js standard library
const crypto = require("crypto")
// util from node.js standard library
const util = require('util')
const randomBytes = util.promisify(crypto.randomBytes)


const region = "us-east-1"
const bucketName = process.env.S3_BUCKET
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey  = process.env.SECRET_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

async function generateUploadUrl(){
    // Generates random image name
    const rawBytes = await randomBytes(16)
    let imageName = rawBytes.toString("hex")
    console.log(`This is the image name: ${imageName}`)
    imageName = `${imageName}.png`
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    }

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params)
    return uploadUrl;
}

module.exports  = { generateUploadUrl }