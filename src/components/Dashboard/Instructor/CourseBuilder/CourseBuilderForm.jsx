import { useDispatch, useSelector } from "react-redux"
import { setStep } from "../../../../slices/courseSlice";
import { RiAddCircleLine } from "react-icons/ri";
import { Dbtn } from "../../../Common/Dbtn";
import { MdNavigateNext } from "react-icons/md";
import { useState } from "react";
import { SectionDropDown } from "./SectionDropDown";
import { createSection, updateSection } from "../../../../services/operations/CourseApis";
import toast from "react-hot-toast";


export const CourseBuilderForm=()=>{
    const [editSectionName,setEditSectionName]=useState(false);
    const [sectionName,setSectionName]=useState("");
    const [editSetionIndex,setEditSectionIndex]=useState(null);
    const {course}=useSelector((state)=>state.course);
    const dispatch=useDispatch();

    function submitHandler(e){
        e.preventDefault();  
        if(editSectionName)
        {
            dispatch(updateSection(sectionName,course.section[editSetionIndex]._id,course._id));
            setSectionName("");
            setEditSectionName((prev)=>!prev);
            return;
        }
        dispatch(createSection(sectionName,course._id));
        setSectionName("");
    }

    function nxtHandler(){
        if(course.section.length>0 && course.section.every((section)=>section.subSection.length>0))
            dispatch(setStep(3));
        else
            toast.error("Please create at least one section, and ensure each section contains at least one sub-section.");
    }
    return(
        <div className="bg-primary-700 shadow-lg text-white p-8 rounded-lg mt-8">
            <form action="" className="flex flex-col gap-2" onSubmit={submitHandler}>
                <h3 className="text-3xl mb-8">Course Builder</h3>
                <label htmlFor="section">
                    Section Name <sup className="text-red-700">*</sup>
                </label>
                <input 
                    type="text"
                    id="section" 
                    value={sectionName}
                    onChange={(e)=>setSectionName(e.target.value)}
                    placeholder="Add a section to build your course"
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                <div className="flex items-center gap-2">
                    <button 
                        type="submit"
                        className="bg-transparent border-2 border-[#3f86fa] rounded-lg flex items-center justify-center
                                    text-[#3f86fa] p-2 mt-4 gap-1"
                    >
                        <RiAddCircleLine/>
                        {
                            editSectionName
                            ? (
                                <div>
                                    Edit Section Name
                                </div>
                            )
                            : (
                                <div>
                                    Create Section
                                </div>
                            )
                        }
                    </button>
                    {    
                        editSectionName 
                        && <span 
                                className="self-end underline text-sm text-gray-400 cursor-pointer"
                                onClick={()=>{
                                    setSectionName("");
                                    setEditSectionName(false);
                                }}
                            >
                                    Cancel Edit
                            </span>    
                    }
                </div>
            </form>
            <SectionDropDown setEditSectionName={setEditSectionName} setSectionName={setSectionName} editSectionName={editSectionName} setEditSectionIndex={setEditSectionIndex} />
            <div className="flex gap-2 mt-4 justify-end">
                <Dbtn onClick={()=>dispatch(setStep(1))}>
                    Back
                </Dbtn>
                <Dbtn active={true} onClick={nxtHandler}>
                    Next
                    <MdNavigateNext className="inline-block ml-1"/>
                </Dbtn>
            </div>


        </div>

    )  
}