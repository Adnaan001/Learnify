import { useDispatch } from "react-redux"
import { Dbtn } from "../../Common/Dbtn";


export const DeleteModal=({setDeleteModal,deleteModal,text,deleteAction,cancelAction})=>{
    const dispatch=useDispatch();

    return(
        <div className={`fixed top-0 left-0 flex justify-center items-center w-full h-full bg-red-400 bg-opacity-35 backdrop-blur-2xl modal z-[100] transition-all duration-200 ease-in scale-0 ${deleteModal && "scale-100"}`}>
            <div className="p-8 bg-red-900 border border-red-800 bg-opacity-55 flex flex-col gap-2 rounded-md ">
                <p className="text-white font-semibold text-2xl">Are You Sure?</p>
                <p className="text-gray-400">{text}</p>
                <div className="flex gap-4 mt-4">
                    <button 
                        onClick={deleteAction}
                        className="rounded-md font-medium px-4 py-2 text-center hover:scale-95 bg-gradient-to-r
                                     text-white hover:text-black from-[#f63b3b] to-[#eb2525] shadow-[2px_2px_8px_#eb2525] 
                                     hover:from-[#fa6060] hover:to-[#f63b3b]"
                    >
                        Delete
                    </button>
                    <div onClick={()=>setDeleteModal(false)}>
                        <Dbtn>  
                            <span>Cancel</span>
                        </Dbtn>
                    </div>
                </div>   
            </div>
        </div>
    )
}