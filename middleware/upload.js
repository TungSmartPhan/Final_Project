const fs = require("fs");

module.exports = async function(req, res, next) {
try {
    //check file exists
    // if(typeof req.file==='undefined' || typeof req.body==='undefined')
    // return res.status(400).json({ message: "Issue with uploading this image" });

    if(!req.files || Object.keys(req.files).length === 0)
    return res.status(400).json({ message: "No files were uploaded"})

    const file = req.files.file;
    // console.log(file);
  //app use upload folder
  // let image = req.file.path;
  
  //file type
  // if(
  //   !req.file.mimetype.includes("jpeg") &&
  //   !req.file.mimetype.includes("jpg") &&
  //   !req.file.mimetype.includes("png")
  // ){
  //     //remove file
  //   fs.unlinkSync(image)
  //   return res.status(400).json({ message: "This file is not supported"})
  // }

  //file size
  // if(req.file.size > 1024*1024)
  if(file.size > 1024*1024)
  { 
      //remove file
      // fs.unlinkSync(image)
      // removeTemp(file.tempFilePath)
      fs.unlinkSync(file.tempFilePath)
      return res.status(400).json({ message: "This file is too large (Max: 1MB)" })
  }

  //file type 
  if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
  {
    fs.unlinkSync(file.tempFilePath)
    return res.status(400).json({ message:"File format is incorrect" })
  }

  //success
  next();
} catch (error) {
  return res.status(500).json({ message:error.message})
}
};

const removeTemp = (path) => {
  fs.unlink(path, error => {
    if(error) throw error
  })
}