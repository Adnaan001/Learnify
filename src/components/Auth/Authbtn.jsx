export const Authbtn=({children})=>{
    return(
        <button className=" w-full bg-gradient-to-r from-[#5de0e6] to-[#004aad] shadow-[2px_2px_8px_#004aad] hover:scale-95 p-4 rounded-lg font-semibold hover:from-[#81eaf0] hover:to-[#3078d7] hover:text-gray-800 transition-all duration-300">
            {children}
        </button>
    )
}