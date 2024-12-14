import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "video-react";
import 'video-react/dist/video-react.css';
import { Dbtn } from "../Common/Dbtn";
import { setCourseProgress } from "../../services/operations/CourseApis";
import { updateCompletedVideos } from "../../slices/viewCourseSlice";


export const VideoDetails=()=>{

    const [videoData,setVideoData]=useState(null);
    const [videoEnded,setVideoEnded]=useState(false);
    const {courseId,sectionId,subSectionId}=useParams();
    const playerRef=useRef();

    const navigate=useNavigate();
    const location=useLocation();
    const dispatch=useDispatch();

    const {courseEntireData,courseSectionData,totalNoOfLectures,completedVideos}=useSelector((state)=>state.viewcourse);

    console.log("rendereddd")

    useEffect(()=>{
        async function setData(){
            if(courseEntireData && courseSectionData)
            {
                if(!courseSectionData.length)
                    return;

                if(!courseId && !sectionId && !subSectionId )
                    navigate('/dashboard/enrolled-courses');
                else{
                    const filteredSection=courseSectionData.filter((sec)=> sec._id===sectionId);
                    console.log("fiteredSection==>",filteredSection);
        
                    const filteredSubSection=filteredSection[0].subSection.filter((subSec)=>subSec._id===subSectionId);
                    // console.log("filteredSubSection==>",filteredSubSection)
                    
                    console.log("setting....")
                    setVideoData(filteredSubSection[0]);
                }

            }
        }
        setData();
    },[courseId, courseSectionData, courseEntireData, location.pathname])

    useEffect(()=>{
        console.log("videoData==>",videoData)
    },[videoData])

    function isFirstVideo(){
        const sectionIndex=courseSectionData.findIndex((sec)=>sec._id===sectionId);
        // console.log("sectionIndex==>",sectionIndex);

        const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((subSec)=>subSec._id===subSectionId);
        // console.log("subSectionIndex==>",subSectionIndex)

        if(sectionIndex===0 && subSectionIndex===0)
            return true;
        else
            return false;
    }

    function isLastVideo(){
        console.log("called last video..")
        console.log("courseSectionData==>",courseSectionData);
        const sectionIndex=courseSectionData.findIndex((sec)=>sec._id===sectionId);
        console.log("sectionINdex-===>",sectionIndex)
        const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((subSec)=>subSec._id===subSectionId);

        if(sectionIndex === courseSectionData.length-1 && subSectionIndex === courseSectionData[sectionIndex]?.subSection.length-1)
            return true;
        else
            return false;


    }

    function goTONextVideo(){
        const sectionIndex=courseSectionData.findIndex((sec)=>sec._id===sectionId);

        const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((subSec)=>subSec._id===subSectionId);

        if(subSectionIndex === courseSectionData[sectionIndex]?.subSection.length-1)
        {
            const nextSectionId=courseSectionData[sectionIndex+1]._id;
            const nextSubSectionId=courseSectionData[sectionIndex+1].subSection[0]._id;
            navigate(`/view-course/${courseEntireData._id}/section/${nextSectionId}/subSection/${nextSubSectionId}`)
        }        
        else
        {
            const nextSubSectionId=courseSectionData[sectionIndex].subSection[subSectionIndex+1]._id;
            navigate(`/view-course/${courseEntireData._id}/section/${sectionId}/subSection/${nextSubSectionId}`)
        }
    }

    function goToPreviousVideo(){
        const sectionIndex=courseSectionData.findIndex((sec)=>sec._id===sectionId);

        const subSectionIndex=courseSectionData[sectionIndex].subSection.findIndex((subSec)=>subSec._id===subSectionId);

        if(subSectionIndex !== 0)
        {
            const prevSubSectionId=courseSectionData[sectionIndex].subSection[subSectionIndex-1]._id;
            navigate(`/view-course/${courseEntireData._id}/section/${sectionId}/subSection/${prevSubSectionId}`)
        }        
        else
        {
            const prevSectionId=courseSectionData[sectionIndex-1]._id;
            const prevSectionTotalNoOfLecture=courseSectionData[sectionIndex-1].subSection.length;
            const prevSubSectionId=courseSectionData[sectionIndex-1].subSection[prevSectionTotalNoOfLecture-1]._id;
            navigate(`/view-course/${courseEntireData._id}/section/${prevSectionId}/subSection/${prevSubSectionId}`)
        }
    }
    
    function handleMarkAsComplete(Id){
        dispatch(setCourseProgress(courseId,Id));
        dispatch(updateCompletedVideos(Id));
    }

    return(
        <div className="relative">
            {
                !videoData
                ? "Loading...."
                :(
                    <>
                    <Player
                        ref={playerRef}
                        aspectRatio="16:9"
                        playsInline
                        src={videoData?.video}
                        onEnded={()=>setVideoEnded(true)}
                    >
                        {
                            videoEnded
                            && (
                                <div className=" bg-gray-800 bg-opacity-0 backdrop-blur-sm modal flex flex-col justify-center items-center absolute  w-full h-full top-0 z-50 ">
                                    <div className="flex flex-col gap-2">
                                        {
                                            !completedVideos.includes(subSectionId)
                                            && (
                                                <Dbtn
                                                    active={true}
                                                    onClick={()=>handleMarkAsComplete(subSectionId)}
                                                    className={"text-base"}
                                                >
                                                    Mark As Completed
                                                </Dbtn>   
                                            )
                                        }
                                        <Dbtn
                                            active={true}
                                            className={"text-base"}
                                            onClick={()=>{
                                                if(playerRef.current)
                                                {
                                                    playerRef.current?.seek(0);
                                                    setVideoEnded(false);
                                                }
                                            }}
                                        >
                                            Rewatch
                                        </Dbtn>
                                    </div>
                                    {/* --------------------- */}
                                    <div
                                        className="mt-4 flex gap-2"
                                    >
                                        {
                                            !isFirstVideo()
                                            && (
                                                <Dbtn
                                                    active={false}

                                                    onClick={goToPreviousVideo}
                                                >
                                                    Prev
                                                </Dbtn>
                                            )
                                        }
                                        {
                                            !isLastVideo()
                                            && (
                                                <Dbtn
                                                    active={false}
                                                    onClick={()=>goTONextVideo()}
                                                >
                                                    Next
                                                </Dbtn>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </Player>
                    <div className="text-white my-4 mx-4">
                        <p className="text-4xl">{videoData?.title}</p>
                        <p className="text-base my-2">{videoData?.description}</p>
                    </div>
                    </>
                )
            }
        </div>
    )
}