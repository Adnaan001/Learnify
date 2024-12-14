import { useState,useEffect } from "react"
import { useSelector } from "react-redux";


export const Requirements=({label,placeholder,errors,getValues,setValue,watch})=>{

    const [requirements,setRequirements]=useState("");
    const [reqList,setReqList]=useState([]);

    const {editCourse}=useSelector((state)=>state.course);

    useEffect(()=>{
        if(editCourse)
        {   
            const initialList=getValues("requirements").split(",");
            setReqList(initialList);
        }
    },[])

    function addReqHandler(){
        if(requirements && !reqList.includes(requirements))
        {
            const updatedList=[...reqList,requirements];
            setReqList(updatedList);
            setValue("requirements",updatedList);
            setRequirements("");
        }
    }

    function removeReqHandler(index){
        const updatedList=reqList.filter((_,i)=>i!==index);
        setReqList(updatedList);
        setValue("requirements",updatedList)
    }

    return(
        <div className="flex flex-col gap-1" >
            <label 
                htmlFor="requirements"
                className="text-gray-200">
                    {label}<sup className="text-red-600">*</sup>
            </label>
            <input 
                type="text" 
                placeholder={placeholder}
                value={requirements}
                onChange={(e)=>setRequirements(e.target.value)}
                id="requiremnets"

                className="bg-primary-500 text-gray-300 py-3 pl-3 rounded-xl shadow-[1px_2px_4px_#3a3949]"
            />
            <div className="text-[#3b82f3] cursor-pointer" onClick={addReqHandler}>
                Add
            </div>
            <div className="text-white">
                {
                    reqList.map((req,index)=>(
                        <p key={index}>
                            {req}
                            <span className="text-gray-400 cursor-pointer" onClick={()=>removeReqHandler(index)}> 
                                {` clear`}
                            </span>
                        </p>
                    ))  
                }
            </div>
            {/* <p className="text-red-400">{watch("requirements")}</p> */}
        </div>
    )
}