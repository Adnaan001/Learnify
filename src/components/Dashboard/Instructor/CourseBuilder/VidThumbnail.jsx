import { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

export const VidThumbnail=({label,setValue,getValues,register,editLecture,viewModal})=>{

    const[vidFile,setVidFile]=useState("");
    const onDrop=useCallback((acceptedFiles)=>{
        // console.log("acceptedFile==>",acceptedFiles);
        acceptedFiles.map(
            (file)=>setVidFile(
                Object.assign(file,{
                    preview: URL.createObjectURL(file)
                })
            )
        )
    },[])  


    //this useEffect is when you want to edit/change your lecture video, this will show the prev. video fetched from course.section.subSection
    useEffect(()=>{
        if(editLecture)
        {
            console.log("vidFile in Lecture is==>",getValues("vidFile"));
              
            setVidFile(
                Object.assign({preview:getValues("vidFile")})
            )
        }
    },[])

    //this useEffect is whenever vidFile is changeing you are setting it in the form's vidFile
    useEffect(()=>{
        console.log("now the vidFile is ==>",vidFile)
        setValue("vidFile",vidFile);
        return ()=>{
            URL.revokeObjectURL(vidFile.preview);
        }
    },[vidFile])

    const{getRootProps,getInputProps,isDragActive,acceptedFiles}=useDropzone({
        onDrop,
        disabled:viewModal
    });
    return(
        <>
            <label htmlFor="tags" className="text-gray-200">
                {label}<sup className="text-red-600">*</sup>
            </label>
            <div 
                {...getRootProps()}
                className={`  
                            flex flex-col gap-1 bg-primary-500 text-gray-300 p-4 w-[100%] 
                            rounded-xl -mt-4 shadow-[1px_2px_4px_#3a3949] border border-dashed border-gray-500
                            ${isDragActive && " bg-primary-100"}
                        `} 
            >
                <input {...getInputProps()} type="file" id="tags" hidden readOnly={viewModal}/>
                {
                    vidFile
                    ?
                    (
                        <>
                            <video 
                                controls
                                src={vidFile.preview} 
                                alt="LECTURE VIDEO" 
                                className="object-cover h-[150px] w-full rounded-lg"
                            />
                            {
                                (editLecture && !viewModal)
                                && (
                                    <div className="text-gray-400 text-center mt-2">
                                        CLICK ANYWHERE TO UPDATE LECTURE VIDEO
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
                                <p>Drag and drop a video, or <span className="text-[#3b82f3] cursor-pointer">Browse</span></p>
                                <p>Max 50MB for videos</p>
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