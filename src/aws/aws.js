const aws = require('aws-sdk');
const AWS_ACCESS_KEY_ID="AKIAY3L35MCRZNIRGT6N"
const AWS_SECRET_ACCESS_KEY="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"
const AWS_REGION ="ap-south-1"

aws.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
})


uploadFiles = async (file) => {
    return new Promise((resolve, reject) => {
        const s3 = new aws.S3({apiVersion : "2006-03-01"});
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "abc/" + file.originalname, 
            Body: file.buffer
        }
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)
        })
    })
}

module.exports = {
    uploadFiles
}
