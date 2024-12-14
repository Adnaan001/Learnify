import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { dateFormater1 } from "../../../../utils/DateFormatter";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { IoTime } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../../services/operations/CourseApis";
import { setCourse, setEditCourse, setEditInstructorCourse, setStep } from "../../../../slices/courseSlice";
import { DeleteModal } from "../../../../components/Dashboard/Settings/DeleteModal";
import { useState } from "react";
import convertSeconds from "../../../../utils/convertSeconds";


export default function CoursesTable({courses,setCourses,courseDeleteModal,setCourseDeleteModal}){
    const navigate=useNavigate();
    const dispatch=useDispatch();

    return(
        <div>
            <Table>
                <Thead>
                    <Tr className="text-gray-400 border border-primary-400">
                        <Th className="text-start py-4 px-2">COURSES</Th>
                        <Th className="text-start py-4 px-2">DURATION</Th>
                        <Th className="text-start py-4 px-2">PRICE</Th>
                        <Th className="text-start py-4 px-2">ACTIONS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {  
                        courses.length===0
                        ?(
                            <Tr>
                                <Td className="font-bold text-primary-400 m-4">NO COURSES FOUND</Td>
                            </Tr>
                        )
                        :(
                            courses.map((course)=>(
                                <Tr key={course._id} className="text-gray-300 border border-primary-400">
                                    <Td className="flex gap-4 mr-32 py-2 ml-4">
                                        <img src={course.thumbnail} alt="Thumbnail" className="w-[18rem] rounded-md h-[200px] object-contain" />
                                        <div className="flex flex-col gap-4">
                                            <h4 className="text-white text-xl">{course.title}</h4>
                                            <p className="text-gray-400 text-sm">{course.description}</p>
                                            <p className="text-sm">Created: {dateFormater1(course.createdAt)}</p>
                                                {
                                                    course.status==="Drafted"
                                                    ?(
                                                        <div className="flex items-center gap-1 text-rose-700 font-bold bg-primary-400 shadow-md w-fit rounded-full p-2 text-sm">
                                                            <IoTime/>
                                                            <p>Drafted</p>
                                                        </div>
                                                    )
                                                    :(
                                                        <div className="flex items-center gap-1 text-[#3b83f6] font-bold bg-primary-400 shadow-md w-fit rounded-full p-2 text-sm">
                                                            <IoIosCheckmarkCircle/>
                                                            <p>Published</p>
                                                        </div>
                                                    )
                                                }
                                        </div>
                                    </Td>
                                    <Td className="px-4 py-2">{convertSeconds(course.totalDuration)}</Td>
                                    <Td className="px-4 py-2">&#8377;{course.price}</Td>
                                    <Td className="px-4 py-2">
                                        <div className="flex items-center justify-evenly">
                                            <FiEdit2 
                                                className="cursor-pointer"
                                                onClick={()=>{
                                                    dispatch(setCourse(course));
                                                    dispatch(setEditCourse(true));
                                                    dispatch(setEditInstructorCourse(true));
                                                    dispatch(setStep(1));
                                                    navigate("/dashboard/add-course");
                                                }}
                                            />
                                            <RiDeleteBin6Line 
                                                className="cursor-pointer" 
                                                onClick={()=>setCourseDeleteModal(course._id)}
                                            />
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                        )
                    }
                </Tbody>
            </Table>
            <DeleteModal
                deleteModal={courseDeleteModal}
                setDeleteModal={setCourseDeleteModal}
                text={"You want to delete this course"}
                deleteAction={()=>dispatch(deleteCourse(courseDeleteModal,setCourseDeleteModal))}
                cancelAction={()=>setCourseDeleteModal("")}
            />
        </div>
    )
}