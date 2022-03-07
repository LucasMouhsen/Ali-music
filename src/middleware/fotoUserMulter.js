const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, "./public/images/fotoUser/")
    },
     filename : (req,file,cb) => {
        cb(null, "user-" + Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({ storage })

module.exports = upload;