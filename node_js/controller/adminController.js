const fileSchema = require('../models/fileSchema');

const getAllFiles = async (req, res) => {
  try {
    const files = await fileSchema.file_data
      .find()
      .populate({ path: 'userId' });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json(error);
  }
};

const serchFile = async (req, res) => {
  const searchingData = req.query.searchingData.trim();
  try {
    if (!req.query.searchingData == '') {
      const serchResult = await fileSchema.file_data
        .find({
          givenFileName: { $regex: searchingData, $options: 'i' },
        })
        .populate({ path: 'userId' });
      res.status(200).json(serchResult);
    }
  } catch (error) {
    res.status(200).json({ error: true });
  }
};

module.exports = {
  getAllFiles,
  serchFile,
};
