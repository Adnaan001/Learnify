const cloudinary=require('cloudinary').v2;

exports.uploadToCloudinary=(file,folder,quality)=>
{
    const options={
        folder,
        resource_type:"auto",
    }
    if(quality)
        options.quality=quality;

    return cloudinary.uploader.upload(file.tempFilePath,options);
}



