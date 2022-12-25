var express = require('express');
const {
  signUp,
  login,
  uploadPdf,
  getUploadedFiles,
  serchFileUser,
  deleteFile,
} = require('../controller/userController');
const { verifyToken } = require('../middleware/middleware');
var router = express.Router();

/* router for signUp */
router.post('/signUp', signUp);

/* router for login */
router.post('/login', login);

/* router for uploding pdf */
router.post('/uploadPdf', verifyToken, uploadPdf);

/* router for getting uresrUploaded posts */
router.get('/getUploadedFiles', verifyToken, getUploadedFiles);

/* router for searching  file */
router.get('/serchFileUser', verifyToken, serchFileUser);

/* router for deleting file */
router.delete('/deleteFile', verifyToken, deleteFile);

module.exports = router;
