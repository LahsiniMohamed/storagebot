const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const {b64toBlob} = require("../controller/functions")
const fs = require('fs');
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("ervcaf-a4ab0.appspot.com");


const upload = async (req, res) => {
    console.log('uploading file ...')

    try {
        if(!req.body.name){
          req.body.name = "test"
        }
        const {blob, name, mimetype, savePath} = req.body
        console.log('file requested',name)
        if(blob){
            console.log('data exists')
        }
        fs.writeFile('./documents/'+name, blob,'base64',(err)=>{
          if(err) return console.log('error creating file',err)
          console.log('created file successufully')
        })
        console.log('upload file')
        await bucket.upload('./documents/'+name,{
          destination:savePath+'/'+name
        })

        console.log('file uploaded successufully')
        console.log('deleting file created')
        fs.unlink('./documents/'+name,(err)=>{
          if(err){
            console.log('error deleting file', err)
          }
          console.log('file deleted successufully')
        })
        res.status(200).send({
          message:'file uploaded successufully'
        })

      } catch (err) {
        console.log('error getting uploading file',err)
        res.status(500).send({
          message: `Could not upload the file: ${req.body.name}. ${err}`,
        });
      }
  }


module.exports = {
    upload
  };
  