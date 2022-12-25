var express = require('express');
const { getAllFiles, serchFile } = require('../controller/adminController');

var router = express.Router();

/* router for adding categories. */
router.get('/getAllFiles', getAllFiles);

/* router for getting searched file. */
router.get('/serchFile', serchFile);

module.exports = router;
