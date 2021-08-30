const { Storage } = require("@google-cloud/storage");
const fs = require('fs');
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("ervcaf-a4ab0.appspot.com");


const upload = async (req, res) => {
    try {

        const {blob, name, mimetype, savePath} = req.body
        console.log('............ uploading : ',name,' ............')
        if(blob){
            console.log('data exists')
        }
        fs.writeFile('./documents/'+name, blob,'base64',(err)=>{
          if(err) {
            throw err
        }
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
            throw err
          }
          console.log('file deleted successufully')
        })
        res.status(200).send({
          message:'file uploaded successufully'
        })

      } catch (err) {
        console.log('error while uploading file',err)
        res.status(500).send({
          message: `Could not upload the file: ${req.bo.dy.name} ${err}`,
        });
      }
  }


module.exports = {
    upload
  };
  