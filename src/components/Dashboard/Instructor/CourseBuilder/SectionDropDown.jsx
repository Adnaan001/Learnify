import { useDispatch, useSelector } from "react-redux"
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { ConfirmationModal } from "../../ConfirmationModal";
import { deleteSection, deleteSubSection } from "../../../../services/operations/CourseApis";
import { MdOutlineArrowDropUp } from "react-icons/md";
import { LectureModal } from "./LectureModal";


export const SectionDropDown=({setEditSectionName,setSectionName,editSectionName,setEditSectionIndex})=>{
    const {course}=useSelector((state)=>state.course);
    const dispatch=useDispatch();

    // console.log(course);

    const [openSectionIndex,setOpenSectionIndex]=useState(null);
    const [sectionModal,setSectionModal]=useState("");
    const [lectureModal,setLectureModal]=useState("");
    const [subSection,setSubSection]=useState(null);
    const [editLectureModal,setEditLectureModal]=useState("");
    const [viewLectureModal,setViewLectureModal]=useState("");
    const [subSectionDeleteModal,setSubSectionDeleteModal]=useState("");

    const handleToggle = (index) => {
        setOpenSectionIndex(openSectionIndex === index ? null : index);
    };


    return(
    
        <>
            {
                course.section.length>0
                &&  (
                        <div className="my-6 bg-primary-500 p-8 rounded-lg">
                            {
                                course?.section.map((section,index)=>(
                                    <div key={index}>
                                        <>
                                            <div className="flex items-center justify-between my-4 cursor-pointer border-b-2 border-primary-300 border-opacity-40">
                                                <div className="flex items-center gap-1 text-gray-400">
                                                    <RxDropdownMenu  onClick={()=>handleToggle(index)}/>
                                                    <h5 
                                                        className="text-white hover:bg-primary-400 p-1 px-2 select-none"
                                                        onClick={()=>handleToggle(index)}
                                                    >
                                                        {section?.sectionName}
                                                    </h5>
                                                </div>
                                                <div className="flex gap-2 text-gray-400">
                                                    <MdModeEdit onClick={()=>{
                                                        setEditSectionName((prev)=>!prev);
                                                        setEditSectionIndex(index);
                                                        editSectionName 
                                                        ? setSectionName("")
                                                        : setSectionName(section?.sectionName);
                                                    }}/>
                                                    <RiDeleteBin6Line onClick={()=>setSectionModal(section)}/>
                                                    <div className="border border-gray-400"></div>
                                                    {
                                                        openSectionIndex==index
                                                        ? <MdOutlineArrowDropUp onClick={()=>handleToggle(index)}/>
                                                        : <MdOutlineArrowDropDown onClick={()=>handleToggle(index)}/>
                                                    }
                                                </div>
                                                <ConfirmationModal
                                                    setModal={setSectionModal}
                                                    Modal={sectionModal}
                                                    text1={"Delete this Section"}
                                                    text2={`All the lectures in the section {${sectionModal.sectionName}} will be deleted`}
                                                    btn1Text={"Delete"}
                                                    btn2Text={"Cancel"}
                                                    btn1Click={()=>dispatch(deleteSection(sectionModal._id,course._id,setSectionModal))}
                                                />
                                            </div>
                                        </>
                                        <div>
                                            {
                                                openSectionIndex==index
                                                && (
                                                    <div className="ml-6 mt-2">
                                                        {
                                                            section?.subSection.map((subSection,index)=>(
                                                                <div key={index}>
                                                                    <div className="flex items-center justify-between my-4 cursor-pointer border-b-2 border-primary-300 border-opacity-40">
                                                                        <div className="flex items-center gap-1 text-gray-400">
                                                                            <RxDropdownMenu/>
                                                                            <h5 
                                                                                className="text-white hover:bg-primary-400 p-1 px-2 select-none"
                                                                                onClick={()=>{
                                                                                    setViewLectureModal(section._id);
                                                                                    setSubSection(subSection);
                                                                                }}
                                                                            >
                                                                                {subSection?.title}
                                                                            </h5>
                                                                        </div>
                                                                        <div className="flex gap-2 text-gray-400">
                                                                            <MdModeEdit onClick={()=>{
                                                                                setEditLectureModal(section._id);
                                                                                setSubSection(subSection);
                                                                            }}/>
                                                                            <RiDeleteBin6Line onClick={()=>setSubSectionDeleteModal(subSection)}/>
                                                                        </div>
                                                                        <ConfirmationModal
                                                                            setModal={setSubSectionDeleteModal}
                                                                            Modal={subSectionDeleteModal}
                                                                            text1={"Delete this Lecture"}
                                                                            text2={`The lecture {${subSectionDeleteModal.title}} will be deleted permanently`}
                                                                            btn1Text={"Delete"}
                                                                            btn2Text={"Cancel"}
                                                                            btn1Click={()=>dispatch(deleteSubSection(subSectionDeleteModal._id,section._id,course._id,setSubSectionDeleteModal))}
                                                                        />
                                                                    </div>                                                                    
                                                                </div>
                                                            ))
                                                        }
                                                        <div 
                                                            className={`flex items-center text-[#3b83f6] select-none cursor-pointer`}
                                                            onClick={()=>setLectureModal(section._id)}
                                                        >
                                                            <IoMdAdd/>
                                                            Add Lecture
                                                        </div>
                                                    </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }
            {
                viewLectureModal
                &&  <LectureModal
                        Modal={viewLectureModal}
                        setModal={setViewLectureModal}
                        headTxt={"Viewing Lecture"}
                        subSection={subSection}
                        viewModal={true}
                    />
            }
            {
                editLectureModal
                &&  <LectureModal
                        Modal={editLectureModal}
                        setModal={setEditLectureModal}
                        headTxt={"Editing Lecture"}
                        subSection={subSection}
                        editModal={true}
                    />
            }
            {
                lectureModal
                &&  <LectureModal
                        Modal={lectureModal}
                        setModal={setLectureModal}
                        headTxt={"Adding Lecture"}
                        createModal={true}
                    />
            }
        </>
    )
}