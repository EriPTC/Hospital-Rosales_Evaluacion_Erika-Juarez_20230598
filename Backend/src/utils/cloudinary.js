import multer from "multer";
import {v2 as Cloudinary} from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import { config } from "../../config.js";

Cloudinary.config({
    cloud_name: config.cloudinary.CLOUDINARY_NAME,
    api_key: config.cloudinary.CLOUDINARY_API_KEY,
    api_secret: config.cloudinary.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage ({
    cloudinary:Cloudinary,
    params:{
        folder: "HotelRosalesEvaluacion",
        allowed_formats: ["jpg", "jpeg", "png"] 
    }
})

const upload = multer ({storage})

export default upload