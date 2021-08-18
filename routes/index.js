const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

router.get('/',(req,res)=>{
    res.send('hello world')
})

router.post("/document", controller.upload);


module.exports = {router};
