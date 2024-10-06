import { request } from "express";
import mongoose from "mongoose";
const agrishareSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    UploadCropImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    Category: {
        type: String,
        required: true,

    },
    SuccessStories: {
        type: String,
        required: true,
        minlength: [200, "should contain atleast 200 character"]
    },
    Farmername: {
        type: String,
    },
    Farmerphoto: {
        type: String,
    },
    createdby: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
})
export const agriShare = mongoose.model("agrishare", agrishareSchema);