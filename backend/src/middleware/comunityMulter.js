const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./public/images/comunity/")
    },
     filename : (req,file,cb) => {
        cb(null, "com-" + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({ storage })

module.exports = upload;