import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router"
import { getCourseDetails, getCourseProgress } from "../../services/operations/CourseApis";
import { useDispatch, useSelector } from "react-redux";
import { setCompletedVideos, setCourseEntireData, setCourseSectionData, setTotalLectures } from "../../slices/viewCourseSlice";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { Dbtn } from "../Common/Dbtn";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";


export const VideoDetailsSidebar=({setReviewModal})=>{
    const {courseId,sectionId,subSectionId}=useParams();
    const dispatch=useDispatch();
    const location=useLocation();
    const navigate=useNavigate();

    const [activeSection,setActiveSection]=useState(null);
    const [activeSubSection,setActiveSubSection]=useState(null);

    const {courseEntireData,courseSectionData,totalNoOfLectures,completedVideos}=useSelector((state)=>state.viewcourse);


    useEffect(()=>{
        async function setDetails(){
            if(courseSectionData)
            {
                if(!courseSectionData.length)
                    return;
    
                const currentSectionIndex=courseSectionData.findIndex((sec)=>sec._id===sectionId);
                setActiveSection(courseSectionData[currentSectionIndex]?._id);
                
                const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex((subSec)=>subSec._id===subSectionId);
                const currentSubSection=courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]._id;
                setActiveSubSection(currentSubSection);
            }
        }

        setDetails();
    },[courseEntireData,courseSectionData,location.pathname]);

    return(
        <div className="">
            {
                !courseEntireData
                ? (<p>Loading....</p>)
                : (
                    <>
                        <div className="flex items-center justify-between p-4 my-4">
                            <IoChevronBackCircleSharp 
                                className="text-gray-400 cursor-pointer" size={35} 
                                onClick={()=>navigate('/dashboard/enrolled-courses')}
                            />
                            <Dbtn active={true} onClick={()=>setReviewModal(true)}>
                                Add Review
                            </Dbtn>
                        </div>
                        <div className="px-3 pb-4 border-b-2 border-primary-300 mx-2">
                            <p className="text-white font-medium text-lg">{courseEntireData?.title}</p>
                            <p className="text-gray-400 text-sm">{completedVideos.length}/{totalNoOfLectures}</p>
                        </div>
                        {
                            courseSectionData.map((section)=>(
                                <div key={section._id}>
                                    <div 
                                        className="text-gray-400 flex items-center justify-between bg-primary-300 my-1 py-4 px-2 cursor-pointer"
                                        onClick={()=>setActiveSection(section._id)}
                                    >
                                        <p className="text-white">{section.sectionName}</p>
                                        {
                                            activeSection===section._id
                                            ? (<MdKeyboardArrowUp/>)
                                            : (<MdKeyboardArrowDown/>)
                                        }
                                    </div>
                                    <div
                                        className={`transition-all duration-300 ease-in-out
                                            ${activeSection===section._id ? " max-h-[500px] opacity-100" : " max-h-0 opacity-0"}`}
                                    >
                                        {
                                            section.subSection.map((subSec)=>(
                                                <div key={subSec._id}>
                                                    <form action="">
                                                        <div 
                                                            className={`flex gap-2 items-center pl-6 cursor-pointer
                                                                pr-2 py-2 ${activeSubSection===subSec._id 
                                                                    ? "bg-[#3b83f6] text-white" 
                                                                    : " text-[#3b83f6] hover:bg-primary-500"}`}
                                                            onClick={()=>navigate(`/view-course/${courseEntireData._id}/section/${section._id}/subSection/${subSec._id}`)}
                                                        >
                                                            <input 
                                                                type="checkbox" 
                                                                id="lecture" 
                                                                checked={completedVideos.includes(subSec._id)}
                                                            />
                                                            <label 
                                                                htmlFor="lecture"
                                                            >
                                                                <p>{subSec?.title}</p>
                                                            </label>
                                                        </div>
                                                    </form>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </>
                )
            }
        </div>   
    )
}