import { categories } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";


export const getCatalogPageDtails=async (categoryId)=>{
    try{
        const result=await apiConnector("POST",categories.GET_CATEGORY_DETAILS,{categoryId});
        return result.data;
    }catch(e){
        toast.error(e.response?.data?.message||e.message);
        console.error("ERROR==>",e.response?.data?.Error);
    }
}