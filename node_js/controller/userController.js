const schema = require('../models/userShema');
const fileSchema = require('../models/fileSchema');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const authentication = require('../authentication/jwt/jwtAuthentication');
const objectId = require('mongodb').ObjectId;

// for signUp
const signUp = async (req, res) => {
  try {
    let userExi = await schema.user_data.findOne({
      userName: req.body.userName,
    });
    if (userExi) {
      console.log('User Exist');
      res.status(200).json({ userExi: true });
    } else {
      let data = req.body;
      data.role = 'user';
      data.password = await bcrypt.hash(data.password, 10);
      schema.user_data(data).save();
      res.status(200).json({ userSignUp: true });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

// for login
const login = async (req, res) => {
  try {
    let user = await schema.user_data.findOne({ userName: req.body.userName });
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(async (result) => {
        if (result) {
          jwt = await authentication.jwtAthentication({ user });
          res
            .status(200)
            .json({ userLogin: true, userData: user.fullName, token: jwt });
        } else {
          res.status(200).json({ userLogin: false }); //invalid password
        }
      });
    } else {
      res.status(200).json({ userLogin: false }); // invalid  userName or password
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true }); //invalid password
  }
};

const uploadPdf = (req, res) => {
  const data = {};
  data.userId = req.query.userId;
  data.uploadedTime = Date.now();
  try {
    const storage = multer.diskStorage({
      destination: path.join(__dirname, '../public/', 'files'),
      filename: (req, file, cb) => {
        data.FileName = file.originalname + '-' + Date.now();
        cb(null, data.FileName + '.pdf');
      },
    });

    const upload = multer({ storage: storage }).single('file');

    upload(req, res, (err) => {
      if (!req.file) {
        console.log('no file');
        res.status(200).json({ noFile: 'select image' });
      } else {
        fileSchema
          .file_data(data)
          .save()
          .then((result) => {
            res.status(200).json({ posted: result });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(error);
          });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUploadedFiles = async (req, res) => {
  try {
    const files = await fileSchema.file_data.find({
      userId: req.query.userId,
    });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json(error);
  }
};

const serchFileUser = async (req, res) => {
  const searchingData = req.query.searchingData.trim();
  try {
    if (!req.query.searchingData == '') {
      const serchResult = await fileSchema.file_data.find({
        $and: [
          { userId: req.query.userId },
          { FileName: { $regex: searchingData, $options: 'i' } },
        ],
      });
      res.status(200).json(serchResult);
    }
  } catch (error) {
    res.status(200).json({ error: true });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileDeleted = await fileSchema.file_data.findByIdAndRemove(
      req.query.fileId,
      {
        new: true,
      }
    );
    res.status(200).json(fileDeleted);
  } catch (error) {
    res.status(200).json({ error: true });
  }
};

module.exports = {
  signUp,
  login,
  uploadPdf,
  getUploadedFiles,
  serchFileUser,
  deleteFile,
};
