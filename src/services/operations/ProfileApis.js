import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profile } from "../apis";
import {setUser} from "../../slices/profileSlice"
import { setToken } from "../../slices/authSlice";
import { logout } from "./Authapis";


const
{
    UPDATE_PROFILE_PIC,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    CHANGE_PASSWORD,
    GET_INSTRUCTOR_STATS
}=profile


export function updateProfilePic(formData){
    return async(dispatch)=>{
        const toastId=toast.loading('Uploading...');
        try{
            const result=await apiConnector('PUT',UPDATE_PROFILE_PIC,formData);
            // console.log("result in update profile is ==>",result);
            localStorage.setItem("user",JSON.stringify(result.data?.updatedRes));
            toast.success(result.data?.message)

        }catch(e){
            if (e.response?.status === 400 && e.response?.data?.Error.includes('File size')) {
                toast.error("The file size must be less than 10 MB.");
            } else {
                toast.error(e.response?.data?.message || e.message);
            }
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }

    }
}

export function updateProfile(firstName,lastName,gender,dob,callingCode,phone,about){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const result=await apiConnector('PUT',UPDATE_PROFILE,{firstName,lastName,gender,dob,callingCode,phone,about});
            // console.log("Result of update profile is ==>",result);
            localStorage.setItem("user",JSON.stringify(result.data?.updatedRes));
            toast.success(result.data?.message)
        }catch(e){
            toast.error(e.response?.data?.message || e.message);
        }finally{
            toast.dismiss(toastId);
        }

    }
}

export function changePassword(currentPassword,newPassword){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const result=await apiConnector("PUT",CHANGE_PASSWORD,{currentPassword,newPassword});
            // console.log("Result from Change password==>",result);
            toast.success(result.data?.message)
        }catch(e){
            toast.error(e.response?.data?.message || e.message);
        }finally{
            toast.dismiss(toastId);
        }
    }
}

export function deleteAccount(){
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...");
        try{
            const result=await apiConnector("DELETE",DELETE_ACCOUNT);
            // console.log("Result from Delete account==>",result);
            dispatch(setToken(null));
            dispatch(setUser(null));
            toast.success(result.data?.message);

        }catch(e){
            toast.error(e.response?.data?.message || e.message);
        }finally{
            toast.dismiss(toastId);
        }
    }
}

export async function getInstructorStats(){
    try{
        const result=await apiConnector('GET',GET_INSTRUCTOR_STATS);
        // console.log("result of getInstructorStats==>",result);
        return result.data;
    }catch(e){
        console.error(e.message);
    }
}