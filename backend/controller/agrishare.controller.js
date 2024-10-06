import { agriShare } from "../models/agrishare.model.js";
import { v2 as cloudinary } from 'cloudinary';
export const agrishare = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "farming related repots is required" });
        }
        const { UploadCropImage } = req.files;
        const allowedFormats = ["image/jpeg", "image/png"];
        if (!allowedFormats.includes(UploadCropImage.mimetype)) {
            return res.status(400).json({ message: "invalid photo format. Only jpeg and png are alloweed" });
        }
        const { title, SuccessStories, Category } = req.body;
        if (!title || !SuccessStories || !Category) {
            return res.status(400).json({ message: "title,SuccessStories,Category are required fields" });
        }
        const Farmername = req?.user?.name;
        const Farmerphoto = req?.user?.photo;
        const createdby = req?.user?._id;
        const cloudinaryResponse = await cloudinary.uploader.upload(
            UploadCropImage.tempFilePath
        )
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error)
        }

        const farmingdata = {
            title,
            SuccessStories,
            Category,
            Farmername,
            Farmerphoto,
            createdby,
            UploadCropImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        };
        const agrishare = await agriShare(farmingdata)

        res.status(201).json({ message: "farming related information send successfully", agrishare });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "interal server error" });
    }
};

export const deleteinfo = async (req, res) => {
    const { id } = req.params;
    const agrishareinfo = await agriShare.findById(id);
    if (!agrishareinfo) {
        return res.status(404).json({ message: "farming info not found" })
    }
    await agrishareinfo.deleteOne();
    res.status(200).json({ message: "farming information deleted succesfully" });
};


export const getallfarmingInfo = async (req, res) => {
    const allfarmingInfo = await agriShare.find();
    res.status(200).json(allfarmingInfo);
};