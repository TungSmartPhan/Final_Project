const fs = require("fs");

module.exports = async function (req, res, next) {
  try {
    //check file exists
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ message: "No files were uploaded" });

    const file = req.files.file;
    //file type
    le.mimetype.includes("png");

    if (file.size > 1024 * 1024) {
      fs.unlinkSync(file.tempFilePath);
      return res
        .status(400)
        .json({ message: "This file is too large (Max: 1MB)" });
    }

    //file type
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      fs.unlinkSync(file.tempFilePath);
      return res.status(400).json({ message: "File format is incorrect" });
    }

    //success
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTemp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
