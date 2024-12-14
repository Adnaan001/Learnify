import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { getInstructorStats } from "../../../../services/operations/ProfileApis";
import { apiConnector } from "../../../../services/apiconnector";
import { courseEndpoints } from "../../../../services/apis";
import { InstructorPieChart } from "../../../../components/Dashboard/Instructor/I_Dashboard/InstructorPieChart";
import { useNavigate } from "react-router";
import { PiHandWavingThin } from "react-icons/pi";



export const InstructorDashboard=()=>{
    const {user}=useSelector((state)=>state.profile);

    const [instructorStats,setInstructorStats]=useState([]);
    const [courses,setCourses]=useState([]);

    const [totalStudents,setTotalStudents]=useState(0);
    const [totalIncome,setTotalIncome]=useState(0);

    const navigate=useNavigate();

    useEffect(()=>{
        async function fetchInstructorStats(){
            const result=await getInstructorStats();
            // console.log("result in fetchInstructorStats==>",result?.courseData);
            setInstructorStats(result?.courseData);

            const result2=await apiConnector("GET",courseEndpoints.GET_INSTRUCTOR_COURSES);
            // console.log("result of getInstructorCourses==>",result2.data?.courses);
            setCourses(result2.data?.courses);


        }

        fetchInstructorStats()
    },[])

    useEffect(()=>{
        function getData(){
            // console.log("instructorStats==>",instructorStats)
            setTotalStudents(instructorStats.reduce((acc,cval)=>acc+cval.totalStudents,0));
            setTotalIncome(instructorStats.reduce((acc,cval)=>acc+cval.totalIncome,0));
        }
        getData();
    },[instructorStats])

    // useEffect(()=>{
    //     console.log("totalStudents==>",totalStudents);
    //     console.log("totalIncome==>",totalIncome);
    // },[totalStudents,totalIncome])

    return(
        <div className=" my-6 w-[80%] mx-auto">
            <div>
                <h2 className="text-white text-2xl">Hi {user?.firstName}<PiHandWavingThin className="inline-block ml-1 mb-1 text-black bg-yellow-200 rounded-md"/></h2>
                <p className="text-gray-400 text-sm">Let's start something new</p>
            </div>
            {
                instructorStats.length!==0
                ? (
                    <div className="flex gap-4 my-4 w-full">
                        <InstructorPieChart instructorStats={instructorStats}/>
                        <div className="flex flex-col gap-4 p-4 w-[30%] rounded-md bg-primary-600 border border-primary-400 shadow-md">
                            <h3 className="text-white font-semibold">Statistics</h3>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Total Courses</p>
                                <p className="text-white text-lg">{courses.length}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Total Students</p>
                                <p className="text-white text-lg">{totalStudents}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-400 text-sm">Total Income</p>
                                <p className="text-white text-lg">Rs. {totalIncome}</p>
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div>
                        Loading....
                    </div>
                )
            }
            {
                courses
                && (
                    <div className="p-4 w-[92%] rounded-md bg-primary-600 border border-primary-400 shadow-md">

                        <div className="flex justify-between">
                            <p className="text-white font-semibold">Your Courses</p>
                            <p
                                onClick={()=>navigate('/dashboard/my-courses')}
                                className="text-[#2563EB] cursor-pointer"
                            >
                                View All
                                </p>
                        </div>
                        <div className="flex gap-4 my-4">
                            {
                                courses.slice(0,3).map((course)=>(
                                    <div >
                                        <img src={course?.thumbnail} alt="" className="rounded-md"/>
                                        <div>
                                            <p className="text-white font-semibold my-2">{course.title}</p>
                                            <p className="text-gray-400 text-sm">{course?.studentsEnrolled.length} Students | Rs. {course.price}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}