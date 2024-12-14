import { Dbtn } from "../Common/Dbtn"

export const ConfirmationModal=({setModal,Modal,text1,text2,btn1Text,btn2Text,btn1Click})=>{
    return(
        <div className={`fixed top-0 left-0 flex justify-center items-center w-full h-full bg-white bg-opacity-15 backdrop-blur-lg modal z-[100] transition-all duration-200 ease-in scale-0 ${Modal && "scale-100"}`}>
            <div className="p-8 bg-primary-700 flex flex-col gap-2 rounded-md w-1/5">
                <p className="text-white font-semibold text-2xl">{text1}</p>
                <p className="text-gray-400">{text2}</p>
                <div className="flex gap-4 rounded-md shadow-lg mt-4">
                    <div onClick={btn1Click}>
                        <Dbtn active={true}>
                            <span>{btn1Text}</span>
                        </Dbtn>
                    </div>
                    <div onClick={()=>setModal(false)}>
                        <Dbtn>  
                            <span>{btn2Text}</span>
                        </Dbtn>
                    </div>
                </div>   
            </div>
        </div>
    )
}