import { Outlet, useLocation, useParams } from "react-router"
import { VideoDetailsSidebar } from "../../components/View-Course/VideoDetailsSidebar"
import { useState,useEffect } from "react"
import { ReviewModal } from "../../components/View-Course/ReviewModal";
import { useDispatch,useSelector } from "react-redux";
import { setCourseEntireData,setCompletedVideos,setCourseSectionData,setTotalLectures } from "../../slices/viewCourseSlice";
import { getCourseDetails,getCourseProgress } from "../../services/operations/CourseApis";

export const ViewCourse=()=>{
    const [reviewModal,setReviewModal]=useState(false);
    const {courseId}=useParams();
    const location=useLocation();
    const {courseEntireData,courseSectionData,totalNoOfLectures,completedVideos}=useSelector((state)=>state.viewcourse);


    const dispatch=useDispatch();

    useEffect(()=>{
        async function getFullCourseDetails(){
            const result=await getCourseDetails(courseId);
            const progressRes=await getCourseProgress(courseId);

            // console.log("ProgressRes==>",progressRes)
            dispatch(setCourseEntireData(result));
            dispatch(setCourseSectionData(result?.section));
            dispatch(setCompletedVideos(progressRes?.completedVideos))
            
            var totalLength=0;
            
                result?.section.forEach((sec)=>{
                    totalLength+=sec.subSection.length;
                })

            dispatch(setTotalLectures(totalLength));
        }

        getFullCourseDetails();
    },[])

    return(
        <div className="flex gap-4">
            <div className="w-[20%] min-h-screen bg-primary-400 border-r-2 border-primary-100">
                <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            </div>
            <div className="w-[77%] my-4">
                <Outlet/>
            </div>
            {
                reviewModal
                && <ReviewModal ReviewModal={reviewModal} setReviewModal={setReviewModal}/>
            }
        </div>
    )
}