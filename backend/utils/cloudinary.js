import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
 
 
cloudinary.config({
    cloud_name:'dfk3zo6p6',
    api_key:'635935456921661',
    api_secret: 'al7lNuT5N3d2wWfbzPy6iYMeZX4'
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