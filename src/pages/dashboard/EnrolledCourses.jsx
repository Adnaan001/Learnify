import { useEffect, useState } from "react"
import { getUserEnrolledCourses } from "../../services/operations/CourseApis"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router";


export const EnrolledCourses=()=>{

    const [enrolledCourses,setEnrolledCourses]=useState([]);
    const [filter,setFilter]=useState("All");
    const navigate=useNavigate();
    useEffect(()=>{
        async function getEnrolledCourses(){
            const result=await getUserEnrolledCourses();
            setEnrolledCourses(result);
        }

        getEnrolledCourses();
    },[])
    
    return(
        <div className=" mx-4">
            <h2 className="text-4xl text-white mb-12 mt-4">Enrolled Courses</h2>
            <div className="w-[70rem]">
                <Table>
                    <Thead>
                        <Tr className="bg-primary-300 text-white font-semibold p-4">
                            <Th className="text-start py-4 px-2 rounded-tl-lg">Course Name</Th>
                            <Th className="text-start py-4 px-2">Duration</Th>
                            <Th className="text-start py-4 px-2 ">Progress</Th>
                            <Th className="text-start py-4 px-2 rounded-br-lg"></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            enrolledCourses.length === 0
                            ? (
                                <Tr>
                                    <Td className="text-white px-2 py-4">You are not enrolled into any course yet</Td>
                                </Tr>
                            )
                            : (
                                enrolledCourses.map((course)=>(
                                    <Tr key={course._id} className="border-b-2 border-primary-400">
                                        <Td 
                                            className="flex gap-4 p-4 cursor-pointer"
                                            onClick={()=>navigate(`/view-course/${course._id}/section/${course?.section[0]._id}/subSection/${course?.section[0].subSection[0]._id}`)}
                                        >
                                            <div>
                                                <img src={course.thumbnail} alt="thumbnail"  width={50} height={50}/>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{course.title}</p>
                                                <p className="text-gray-400 text-sm">{course.description}</p>
                                            </div>
                                        </Td>
                                        <Td className="text-white py-4 px-2">
                                            2hr 35min
                                        </Td>
                                        <Td className="py-4 px-2">
                                            <div>
                                                <p className="text-white mb-2 text-sm">Progress {course?.progressPercentage}%</p>
                                                <ProgressBar 
                                                    completed={course?.progressPercentage}
                                                    customLabel=" "
                                                    height="10px"
                                                    bgColor="#009799"
                                                />
                                            </div>
                                        </Td>
                                    </Tr>
                                ))
                            )
                        }
                    </Tbody>
                </Table>
            </div>
        </div>
    )
}