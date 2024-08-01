import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
 
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats:['jpg','jpeg',"png"],
    params:{
        folder:"food-images",
        transformations:[{width:500,height:500,crop:"limit"}]
    }
}) 
export {storage};