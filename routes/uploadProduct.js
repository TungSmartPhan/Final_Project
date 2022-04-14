const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Upload image only admin can use
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded." });

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "Product" },
      async (error, result) => {
        //after upload will have file tpm
        if (error) throw error;

        removeTmp(file.tempFilePath);
        // res.json({ result });
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) res.status(500).json({ message: "No image selected" });

    cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
      if (error) throw error;
      res.json({ message: "Deleted Image" });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//Delete tmp File Function
const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};

module.exports = router;
