import { NextFunction } from "express";

const multer = require('multer'); 

var storage = multer.diskStorage({
    destination: './images',
    filename: function (req: Request, file: any, callback: any) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({
    storage: storage
}).array('file', 10);

export const filesUploader = (req : any, res : any, next: NextFunction) => {
    upload(req, res, function (err : any) {
        req.uploadError = false;
        if (err) {
            req.uploadError = true;
            console.log(err);
            return res.end("Error uploading file."+__dirname);
        }
        next();
    });
}