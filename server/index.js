// Import
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// MULTER
const multer = require('multer');

// Server
const app = express();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

// Send to uploads folder project
// app.post('/upload', (req, res, next) => {
//   const upload = multer({ storage }).single('toto');
//   upload(req, res, (err) => {
//     if (err) {
//       return res.send(err);
//     }
//     res.json(req.file);
//   });
// });

// Send to cloudinary
app.post('/upload', (req, res, next) => {
  const upload = multer({ storage }).single('cover');
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }
    console.log('file uploaded to server');
    console.log(req.file);

// SEND FILE TO CLOUDINARY
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: 'aventureproject',
      api_key: '948783114823729',
      api_secret: 'SXAHxVu3YFS1LB72-tSH_dcAluY',
    });

    const { path } = req.file;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `${uniqueFilename}`, tags: 'gamebook' }, // directory and tags are optional
      (err, image) => {
        if (err) return res.send(err);
        let query = 'INSERT INTO story (image) VALUES (?)';
        console.log('file uploaded to Cloudinary');
        // remove file from server
        const fs = require('fs');
        fs.unlinkSync(path);
        // return image details
        res.json(image);
      },
    );
  });
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH, HEAD');
  next();
});


// Start on :3000
app.listen(3000);

// importing route
const routes = require('./app/routes');

routes(app);
