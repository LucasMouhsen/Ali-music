const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./public/images/articulos/")
    },
     filename : (req,file,cb) => {
        cb(null, "art-" + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({ storage })

module.exports = upload;