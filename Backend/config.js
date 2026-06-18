import dotenv from "dotenv"

dotenv.config()

export const config ={
    db:{
        URI: process.env.DB_URI
    },
    Jwt:{
        SECRET: process.env.JWT_SECRET_KEY
    },
    email:{
        USER_EMAIL: process.env.USER_EMAIL,
        USER_PASSWORD: process.env.USER_PASSWORD
    },
    cloudinary:{
        CLOUDINARY_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
}