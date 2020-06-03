const express = require('express');
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const storage = multer.diskStorage({
  destination: function(req, res, cb){
      cb(null, `${__dirname}/client/public/uploads/`)
  },
  filename: function(req, files, cb){
      cb(null, files.fieldname + '-' + Date.now()+ path.extname(files.originalname))
  }
  
})



const upload = multer ({storage, limits: {fieldSize: 10000000}, fileFilter: function(req, file, cb){checkFileType(file, cb)}}).single('image')


function checkFileType(file, cb){
  
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())

  const mimetype =filetypes.test(file.mimetype);

  if(mimetype && extname){
      return cb(null, true)
  } else {
      cb('Error: image only')
  }
}


app.post('/upload', upload, (req, res) => {
  console.log(req.file)
});

app.listen(5000, () => console.log('Server Started...'));