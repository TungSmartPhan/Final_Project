//upload avatar
const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const uploadController = {
  uploadAvatar: async (req, res) => {
    try {
      //get file
    console.log('upload file');
      const file = req.files.file;
      console.log(file);

      cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'avatar', 
        width: 150,
        height: 150,
        crop:'fill'
      },async (error, result) => {
        if (error) throw error;
        fs.unlinkSync(file.tempFilePath)
        console.log({result})
        res.json({message:"Your avatar is uploaded",url: result.secure_url})
      })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};


module.exports = uploadController;
