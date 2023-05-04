import multer from "multer";

//primero se configura donde se almacenaran los archivos
const storage = multer.diskStorage({
    //hace referencia de donde se guardara el archivo
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    //hace referencia a como se llamara el archivo final
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
 export const uploader = multer({storage})
