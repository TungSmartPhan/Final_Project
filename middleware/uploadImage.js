const  multer = require('multer');

//set storage
const storage = multer.diskStorage({
    //desitination
    desitination: function(req, res, callback) {
        callback(null,'./uploads/')
    },
    //filename
    filename: function(req, file, callback) {
        callback(null,file.fieldname + '-' + Date.now() + file.originalname)
    }
})

 const filerFilter = (req, res, callback) => {
     callback(null, true)
 }

 let upload = multer({
     storage: storage,
     fileFilter: filerFilter
 })

 module.exports = upload.single('avatar')