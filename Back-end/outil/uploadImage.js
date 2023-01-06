const path = require("path");
const multer = require("multer");


//destination file au niveau de image
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images");
    },
    //override pour ajouter a new image cet function de rename fille 
    filename: (req, file, callback) => {
        const newImageName  = Date.now() + path.extname(file.originalname);
        callback(null, newImageName);

    },
});


//exports storage configueation et filtrage de image 

module.exports =  multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (
        file.mimetype == "image/png" || 
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
        ) {
        callback(null, true);
        } else {
        callback(null, false);
        return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});