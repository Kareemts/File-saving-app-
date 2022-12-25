var express = require('express');
const {
  signUp,
  login,
  uploadPdf,
  getUploadedFiles,
  download,
  serchFileUser,
} = require('../controller/userController');
var router = express.Router();

/* router for signUp */
router.post('/signUp', signUp);

/* router for login */
router.post('/login', login);

/* router for uploding pdf */
router.post('/uploadPdf', uploadPdf);

/* router for getting uresrUploaded posts */
router.get('/getUploadedFiles', getUploadedFiles);

/* router for downloading the file */
router.get('/download', download);

/* router for searching  file */
router.get('/serchFileUser', serchFileUser);

module.exports = router;
