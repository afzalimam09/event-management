import config from "../../core/config.js";
import catchAsync from "../../helper/catchAsync.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your account credentials
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

export const handleFilesUpload = catchAsync(async (req, res, next) => {
    const fileData = req.file.buffer;
    const fileName = req.file.originalname;

    // Determine the file type based on the file extension
    const fileExtension = fileName.split(".").pop();
    let resourceType = "image";
    let folder = "events/images";
    if (fileExtension === "pdf") {
        resourceType = "raw";
        folder = "events/documents";
    }

    // Upload the file to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(fileData, {
        overwrite: true,
        folder: folder,
        public_id: fileName,
        resource_type: resourceType,
    });
    if (uploadRes) {
        res.status(201).json({
            status: "success",
            message: "files uploaded successfully",
            url: uploadRes.secure_url,
        });
    }
});
