import { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

export const Thumbnail=({label,setValue,getValues,register})=>{

    const[imgFile,setImgFile]=useState("");
    const onDrop=useCallback((acceptedFiles)=>{
        // console.log("acceptedFile==>",acceptedFiles);
        acceptedFiles.map(
            (file)=>setImgFile(
                Object.assign(file,{
                    preview: URL.createObjectURL(file)
                })
            )
        )
    },[])  

    const {editCourse}=useSelector((state)=>state.course);

    useEffect(()=>{
        if(editCourse)
        {
            // console.log("imgFIle in thumbnail==>",getValues("imgFile"));
              
            setImgFile(
                Object.assign({preview:getValues("imgFile")})
            )
        }
    },[])

    useEffect(()=>{
        // console.log("now the imgFile is ==>",imgFile)
        setValue("imgFile",imgFile);
        return ()=>{
            URL.revokeObjectURL(imgFile.preview);
        }
    },[imgFile])

    const{getRootProps,getInputProps,isDragActive,acceptedFiles}=useDropzone({onDrop});
    return(
        <>
            <label htmlFor="tags" className="text-gray-200">
                {label}<sup className="text-red-600">*</sup>
            </label>
            <div 
                {...getRootProps()}
                className={`  
                            flex flex-col gap-1 bg-primary-500 text-gray-300 p-8 w-[100%] 
                            rounded-xl -mt-4 shadow-[1px_2px_4px_#3a3949] border border-dashed border-gray-500
                            ${isDragActive && " bg-primary-100"}
                        `} 
            >
                <input {...getInputProps()} type="file" id="tags" hidden/>
                {
                    imgFile
                    ?
                    (
                        <>
                            <img src={imgFile.preview} alt="THUMBNAIL" className="object-contain h-[400px] w-full"/>
                            {
                                editCourse
                                && (
                                    <div className="text-gray-400 text-center mt-2">
                                        CLICK ANYWHERE TO UPDATE THUMBNAIL
                                    </div>
                                )
                            }
                        </>
                    ):
                    (
                        isDragActive
                        ?
                        (<FiUploadCloud className="text-[#3b82f3] text-9xl mx-auto"/> ):
                        (
                            <div className="text-xs flex flex-col items-center gap-2 text-gray-400">
                                <div className="aspect-square rounded-full bg-primary-800 w-12 relative">
                                    <FiUploadCloud className="text-[#3b82f3] text-3xl text-center absolute top-2 right-2"/> 
                                </div>
                                <p>Drag and drop an image, or <span className="text-[#3b82f3] cursor-pointer">Browse</span></p>
                                <p>Max 6MB each (12MB for videos)</p>
                                <ul className=" list-disc flex justify-around text-gray-500 w-full mt-2">
                                    <li>Aspect ratio 16:9</li>
                                    <li>Recommended size 1024x576</li>
                                </ul>
                            </div>
                        )
                    )
                }


            </div>
        </>

    )
}