var express = require('express');
const { getAllFiles, serchFile } = require('../controller/adminController');
const { verifyToken } = require('../middleware/middleware');

var router = express.Router();

/* router for adding categories. */
router.get('/getAllFiles',verifyToken, getAllFiles);

/* router for getting searched file. */
router.get('/serchFile',verifyToken, serchFile);

module.exports = router;
