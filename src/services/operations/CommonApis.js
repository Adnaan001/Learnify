import { apiConnector } from "../apiconnector";
import { contact } from "../apis";
import toast from "react-hot-toast";


const {SUBMIT_CONTACT_FORM}=contact;

export function submitForm(firstName,lastName,email,callingcode,phone,message){
    return async (dispatch)=>{
        const toastId=toast.loading('Loading...');
        try{
            const result=await apiConnector('POST',SUBMIT_CONTACT_FORM,{firstName,lastName,email,callingcode,phone,message});
            toast.success(result.data?.message);
        }catch(e){
            toast.error(e.response?.data?.message||e.message);
            console.error("ERROR==>",e.response?.data?.Error);
        }finally{
            toast.dismiss(toastId)
        }
    }
}
