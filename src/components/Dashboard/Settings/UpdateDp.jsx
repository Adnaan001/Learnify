import { useDispatch, useSelector } from "react-redux";
import {Dbtn} from "../../Common/Dbtn"
import { useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import toast from "react-hot-toast";
import { updateProfilePic } from "../../../services/operations/ProfileApis";

export const UpdateDp=()=>{
    const {user}=useSelector((state)=>state.profile);
    const fileInputRef=useRef();
    const [preview,setPreview]=useState("");
    var previewURL="";

    const [dp,setDp]=useState();

    function handleFileInput(){
        console.log("fileInputRef==>",fileInputRef);
        fileInputRef.current.click();
    }
    function handleFileChange(e){
        // console.log("e.target.file",e.target.files[0]);
        const file=e.target.files[0];
        console.log("file is=>",file)
        if(file)
        {
            previewURL=URL.createObjectURL(file);
            console.log("previewURL==>",previewURL)
            setPreview(previewURL);
            setDp(file);
        }

    }

    const dispatch=useDispatch();
    async function uploadImage(){
        if(!dp)
        {
            toast.error('Please select the file');
            return;
        }
        const formData=new FormData();
        formData.append("imgFile",dp);
        dispatch(updateProfilePic(formData));
        URL.revokeObjectURL(previewURL)

    }

    return(
        <div className="bg-primary-600 border border-primary-400 shadow-lg rounded-md p-8 flex gap-4">
            <img src={preview||user?.image} alt="User Image" className=" aspect-square w-20 rounded-full object-cover" />
            <div>
                <p className="text-white mb-2">Change Profile Picture</p>
                <div className="">
                <input 
                    ref={fileInputRef}
                    type="file" 
                    name="Select" 
                    id="Select"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="flex gap-4 mt-4">
                    <Dbtn>
                        <span onClick={handleFileInput}> Select </span>
                    </Dbtn>
                    <Dbtn active={true} extra={true}>
                        <span onClick={uploadImage}>
                            Upload
                        </span>
                        <LuUpload/>
                    </Dbtn>
                </div>
                </div>
            </div>
        </div>
    )
}