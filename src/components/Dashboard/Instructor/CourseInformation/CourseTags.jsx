import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";


export const CourseTags=({register,errors,watch,label,placeholder,setValue,getValues})=>{

    const [tagList,setTagList]=useState([]);
    const [tagInput,setTagInput]=useState("");

    const {editCourse}=useSelector((state)=>state.course);

    useEffect(()=>{
        if(editCourse)
        {   
            // console.log("getValues(tags)==>",getValues("tags"))
            const initialList=getValues("tags").split(",");
            // console.log(initialList);
            setTagList(initialList);
        }
    },[])

    function addTag(e){
        if(e.key === "Enter")  
        {
            e.preventDefault();
            if(tagInput && !tagList.includes(tagInput))
            {
                const updatedTagList=[...tagList,tagInput];
                setTagList(updatedTagList);
                setValue("tags",updatedTagList);
                setTagInput("");
            }
        }
    }

    function removeTag(index){
        const updatedTagList=tagList.filter((_,i)=>i!==index);
        setTagList(updatedTagList);
        setValue("tags",updatedTagList);
    }       

    return(
        <div>
            <div 
                className={` ${tagList.length>0 && 
                                "my-8 flex flex-wrap"
                            }
                        `}
            >
                {
                    tagList.map((tag,index)=>(
                        <span 
                            key={index} 
                            className="text-white p-3 bg-[#3b82f3] rounded-full m-2 cursor-pointer flex items-center gap-1"
                        >
                            {tag}
                            <RxCross2 onClick={()=>removeTag(index)}/>
                        </span>
                        ))
                }
            </div>

            <div className="flex flex-col gap-1" >
                <label 
                    htmlFor="tags"
                    className="text-gray-200">
                        {label}<sup className="text-red-600">*</sup>
                </label>
                <input 
                    type="text" 
                    placeholder={placeholder}
                    id="tags"
                    value={tagInput}
                    onChange={(e)=>setTagInput(e.target.value)}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    onKeyDown={addTag}
                />
                {
                    errors.tags && <p className="text-red-600">{errors.tags.message}</p>
                }
            </div>
        </div>
    )
}