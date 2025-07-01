const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
 filename: (req,file,cb) => {
    cb(null , `${Date.now()}-${file.originalname}`); // Use a timestamp to avoid filename conflicts
  },

});

//file filter 
const filter = (req,file,cb) =>{
    const allowedTypes = ['image/jpeg','image/png','image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true); // Accept the file
    }else{
        cb(new Error('only .jpeg , .jpg and .png format allowed!'), false); // Reject the file
    }
};

const upload = multer({
    storage ,
    fileFilter : filter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
})

module.exports = upload; // Export the configured multer instance