import { Table, Tbody, Th, Thead, Tr } from "react-super-responsive-table";
import { Dbtn } from "../../../../components/Common/Dbtn"
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import { apiConnector } from "../../../../services/apiconnector";
import { courseEndpoints } from "../../../../services/apis";
import { useDispatch, useSelector } from "react-redux";
import CoursesTable from "./CoursesTable";
import { useNavigate } from "react-router";
import { setCourse, setEditCourse, setEditInstructorCourse, setStep } from "../../../../slices/courseSlice";


export default function IndexMyCourses(){

    const [courses,setCourses]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [courseDeleteModal,setCourseDeleteModal]=useState("");

    async function fetchCourses(){
        const result=await apiConnector('GET',courseEndpoints.GET_INSTRUCTOR_COURSES);
        dispatch(setEditInstructorCourse(false));
        dispatch(setCourse(null));
        dispatch(setStep(1));
        dispatch(setEditCourse(false))
        // console.log("runningggg....")
        if(result)
           setCourses(result.data.courses);

        setTimeout(()=>console.log(courses),1000);
    }

    useEffect(()=>{fetchCourses()},[courseDeleteModal]);
    return(
        <div className="mx-[6rem]">
            <div className="flex items-center justify-between my-8">
                <h2 className="text-3xl text-white">
                    My Courses
                </h2>
                <Dbtn 
                    active={true} 
                    type={"button"} 
                    extra={true} 
                    onClick={()=>{
                                navigate("/dashboard/add-course")
                                dispatch(setEditCourse(false));
                                dispatch(setStep(1));
                                dispatch(setCourse(null));
                            }}
                >
                    Add Course
                    <GoPlus/>
                </Dbtn>
            </div>
            {
                courses
                && <CoursesTable 
                        courses={courses} 
                        setCourses={setCourses}
                        courseDeleteModal={courseDeleteModal}
                        setCourseDeleteModal={setCourseDeleteModal}
                    />
            }

        </div>
    )
} 