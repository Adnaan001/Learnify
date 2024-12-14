import { useDispatch, useSelector } from "react-redux";
import { RenderSteps } from "./RenderSteps"
import { MdOutlineElectricBolt } from "react-icons/md";
import { useEffect } from "react";
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice";



export const IndexAddCourse=()=>{
    const {editInstructorCourse}=useSelector((state)=>state.course);
    const dispatch=useDispatch();
    const {editCourse}=useSelector((state)=>state.course);

    useEffect(()=>{
        if(!editCourse)
        {
            dispatch(setStep(1));
            dispatch(setEditCourse(null));
        }
    },[])
    return(
        <div className="mx-4">
            <h2 className="text-4xl text-white mt-4 mb-12">
                {
                    editInstructorCourse
                    ? ("Edit Course")
                    : ("Add Course")
                }
            </h2>
            <div className="flex gap-12 my-6 ml-12">
                    <RenderSteps/>

                <div className="bg-primary-700 p-8 h-[50%] w-[40%]">
                    <h3 className="text-white text-lg font-medium">
                        <MdOutlineElectricBolt className="text-[#3B82F6] inline-block mb-1 -ml-5"/>
                        Course Upload Tips
                    </h3>
                    <ul className="text-white list-disc mt-6 text-xs flex flex-col gap-3">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>

    )
}