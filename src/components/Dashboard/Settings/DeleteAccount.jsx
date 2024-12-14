import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeleteModal } from "./DeleteModal";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../../services/operations/ProfileApis";

export const DeleteAccount=()=>{
    const [deleteModal,setDeleteModal]=useState(false);
    const dispatch=useDispatch();
    return(
        <div className="bg-red-900 bg-opacity-55 shadow-lg rounded-md p-9 flex gap-4 mb-24 border border-red-800 ">
            <div className="bg-red-500 rounded-full h-fit bg-opacity-25">
                <RiDeleteBin6Fill className="text-red-600 m-2 text-2xl"/>
            </div>
            <div>
                <p className="text-white font-medium text-lg mb-2">Delete Account</p>
                <p className="text-gray-300">
                    Would you like to delete account?
                </p>
                <p className="text-gray-300">
                    This account contains Paid Courses. Deleting your account will remove all the contain associated with it.
                </p>
                <p className="text-red-600 cursor-pointer mt-2" onClick={()=>setDeleteModal(prev=>!prev)}>
                    <em>I want to delete my account.</em>
                </p>
                <DeleteModal 
                    setDeleteModal={setDeleteModal} 
                    deleteModal={deleteModal}
                    text={"You want to delete your account"}
                    deleteAction={()=>dispatch(deleteAccount())}
                    cancelAction={()=>setDeleteModal(false)}
                    
                />

            </div>
        </div>
    )
}