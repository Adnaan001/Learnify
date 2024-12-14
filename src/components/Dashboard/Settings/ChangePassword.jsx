import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Dbtn } from "../../Common/Dbtn";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../services/operations/ProfileApis";


export const ChangePassword=()=>{

    const {handleSubmit,reset,register,formState:{errors}}=useForm({
        defaultValues:{
            currentPassword:"",
            newPassword:"",
        }
    });


    const [showCurrentPassword,setshowCurrentPassword]=useState(true);
    const [showNewPassword,setShowNewPassword]=useState(true);

    const dispatch=useDispatch();
    
    function submitDetails(data){
        console.log("personal Details",data);
        dispatch(changePassword(data.currentPassword,data.newPassword));
    }

    return(
        <div>
            <div className="bg-primary-600 border border-primary-400 shadow-lg rounded-md p-8 flex flex-col gap-4">
                <p className="text-white font-medium text-xl">Password</p>
                <div className="flex gap-4">
                    <div className="relative flex flex-col gap-1 w-full">
                        <label 
                            htmlFor="currentPassword"
                            className="text-gray-200">
                                Current Password
                        </label>
                        <input
                            required
                            type={`${showCurrentPassword ? "password":"text"}`}
                            placeholder="Enter Current Password"
                            id="currentPassword"
                            {...register("currentPassword",{required:"Please fill out this field"})}
                            className="bg-primary-500 text-gray-300 py-3 pl-3 rounded-xl shadow-[1px_2px_4px_#3a3949]"
                        />
                        {
                            errors.currentPassword && <p className="text-red-600">{errors.currentPassword.message}</p>
                        }
                        <div className="absolute text-gray-400 cursor-pointer top-[2.8rem] right-2">
                            {
                                showCurrentPassword
                                ?
                                (<FaEyeSlash onClick={()=> setshowCurrentPassword(false)}/>)
                                :
                                (<FaEye onClick={()=> setshowCurrentPassword(true)}/>) 
                            }
                        </div>
                    </div>
                    <div className=" relative flex flex-col gap-1 w-full">
                        <label 
                            htmlFor="newPassword"
                            className="text-gray-200">
                                New Password
                        </label>
                        <input
                            required
                            type={`${showNewPassword ? "password":"text"}`}
                            placeholder="Enter New Password"
                            id="newPassword"
                            {...register("newPassword",{required:"Please fil out this field"})}
                            className="bg-primary-500 text-gray-300 py-3 pl-3 rounded-xl shadow-[1px_2px_4px_#3a3949]"
                        />
                        {
                            errors.newPassword && <p className="text-red-600">{errors.newPassword.message}</p>
                        }
                        <div className="absolute text-gray-300 cursor-pointer top-[2.8rem] right-3">
                            {
                                showNewPassword
                                ?
                                (<FaEyeSlash onClick={()=> setShowNewPassword(false)}/>)
                                :
                                (<FaEye onClick={()=> setShowNewPassword(true)}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 justify-end my-8">
                <div onClick={handleSubmit(()=>reset())}>
                    <Dbtn>
                        cancel
                    </Dbtn>
                </div>
                <div onClick={handleSubmit(submitDetails)}>
                    <Dbtn active={true}>
                        Save
                    </Dbtn>
                </div>
            </div>
        </div>
    )
}