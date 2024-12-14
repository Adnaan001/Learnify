import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router"
import { buyCourse } from "../../services/operations/StudentEnrollmentApi";
import { addToCart } from "../../slices/cartSlice";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../../services/operations/CourseApis";
import { RatingStars } from "../../components/Common/RatingStars";
import { dateFormater1 } from "../../utils/DateFormatter";
import { RiInformation2Line } from "react-icons/ri";
import { MdLanguage } from "react-icons/md";
import { Dbtn } from "../../components/Common/Dbtn";
import { IoMdArrowDropright } from "react-icons/io";
import { FaShareSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";
import convertSeconds from "../../utils/convertSeconds";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Footer } from "../../components/Footer/Footer";
import { IoVideocamOutline } from "react-icons/io5";

export const CourseDetails=()=>{

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const params=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [course,setCourse]=useState({});
    const location=useLocation();

    console.log("user==>",user)

    console.log("Course Params==>",params);

    useEffect(()=>{
        async function fetchCourseDetails(){
            const result=await getCourseDetails(params.courseid);
            console.log("result==>",result)
            setCourse(result);
        }
        fetchCourseDetails();
    },[])
    
    // useEffect(()=>{
    //     console.log("course==>",course)
    // },[course])



    const [isActive,setIsActive]=useState([]);

    function handleActive(id){
        setIsActive(
            isActive.includes(id)
            ? isActive.filter((c_id)=>c_id!==id)
            : isActive.concat(id)
        )
    }

    function handleBuyCourse(){
        if(token)
        {
            buyCourse(token,[params.courseid],user,navigate,dispatch);
            return;
        }
        toast.error("Please Login/Signup");
        navigate('/login')
    }

    function handleAddToCart(){
        console.log("course==>",course)
        dispatch(addToCart(course))
    }

    function handleShare(){
        copy(window.location.href)
        toast.success("Link Copied to Clipboard")
    }

    function subSectionLength(){
        var length=0;
        course?.section.forEach((sec)=>{
            length+=sec?.subSection.length;
        })
        return length;
    }

    return(
        <div>
            {
                Object.keys(course).length === 0 
                ? (<p>Loading......</p>)
                : (
                    <div>
                        <div className="bg-[#556E94] relative">
                            <div className="w-11/12 mx-auto p-24">
                                <h1 className="text-white font-semibold text-4xl">{course.title}</h1>
                                <p className="text-gray-400 mt-1">{course.description}</p>
                                <div className="flex gap-2 text-white my-4 items-center">
                                    <RatingStars courseId={course._id} className={"text-secondary-400"} ratingLength={course?.ratingAndReview.length}/>
                                    <p>{course?.studentsEnrolled.length} student(s) enrolled</p>
                                </div>
                                <p className="text-white">Created By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                                <div className="flex gap-1 text-white items-center mt-2">
                                    <RiInformation2Line/> 
                                    <p>Created at {dateFormater1(course?.createdAt)}</p>
                                    <MdLanguage className="ml-2"/>
                                    <p>English</p>
                                </div>
                            </div>
                            {/* ================================================================= */}
                            <div className="flex flex-col absolute top-[2rem] right-[12rem] bg-primary-200 p-4 rounded-md">
                                <div>
                                    <img src={course?.thumbnail} alt="" className="w-[350px] h-[200px] object-cover"/>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-2xl mt-4">Rs. {course?.price}</p>
                                    <Dbtn active={true} className={"w-full my-4"}>
                                        {
                                            course?.studentsEnrolled.find((student)=>student===user._id)
                                            ? (
                                                <p 
                                                    onClick={()=>navigate(`/view-course/${course._id}/section/${course?.section[0]._id}/subSection/${course?.section[0].subSection[0]._id}`)}
                                                >
                                                    Go To Course
                                                </p>
                                            )
                                            : (
                                                <p onClick={handleBuyCourse}>
                                                    Buy Course
                                                </p>
                                            )
                                        }
                                    </Dbtn>
                                    {
                                        ( user && !course?.studentsEnrolled.includes(user._id) )
                                        && (
                                            <Dbtn 
                                                className={"w-full"}
                                                onClick={handleAddToCart}
                                            >
                                                Add to Cart
                                            </Dbtn>
                                        )
                                    }
                                    <p className="text-white text-xs text-center my-4">30-Day Money-Back Guarantee</p>
                                    
                                    <div>
                                        <p className="text-white font-medium text-lg ">This Course Includes:</p>
                                        {
                                            course?.requirements.split(',').map((requirement,index)=>(
                                                <div className="flex text-primary-700 text-sm items-center" key={index}>
                                                    <IoMdArrowDropright/>
                                                    <p>{requirement}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div 
                                        className="flex text-[#2563EB] items-center justify-center gap-1 mt-2 cursor-pointer"
                                        onClick={handleShare}
                                    >
                                        <FaShareSquare/>
                                        <p className="text-center">Share</p>
                                    </div>
                                </div>
                            </div>
                            {/* ============================================================================== */}
                        </div>
                        <div className="w-11/12 mx-auto px-24 my-6">
                            <div className="border-2 border-primary-400 w-[60%] p-4 rounded-md">
                                <h3 className="text-white text-2xl font-semibold">What you'll learn</h3>
                                <p className="text-white text-sm mt-3">{course?.benefits}</p>
                            </div>
                            <div>
                                <h3 className="text-white text-2xl font-semibold mt-6 my-4">Course Content</h3>
                                <p className="text-white mb-2">{course?.section.length} section(s) {subSectionLength()} lecture(s) {convertSeconds(course?.totalDuration)} total length</p>
                            </div>
                            <div>
                                {
                                    course?.section.map((sec)=>(
                                        <div className="w-[60%] select-none" key={sec._id}>
                                            <div
                                                className="flex justify-between bg-primary-200
                                                p-4 rounded-sm text-white cursor-pointer border border-primary-100"
                                                onClick={()=>handleActive(sec._id)}
                                            >
                                                <div className="flex items-center">
                                                    {
                                                        isActive.includes(sec._id)
                                                        ? <MdKeyboardArrowUp/>
                                                        : <MdKeyboardArrowDown/>
                                                    }
                                                    {sec?.sectionName}
                                                </div>
                                                <div className="text-[#2563EB] font-semibold">
                                                    {sec?.subSection.length} lecture(s)
                                                </div>
                                            </div>
                                            <div
                                                className={`overflow-hidden transition-all duration-1000 ease-in-out text-white 
                                                    ${isActive.includes(sec._id) 
                                                        ? "max-h-[500px] opacity-100 " 
                                                        : "max-h-0 opacity-0 duration-[500ms]"}`} 
                                            >
                                                {
                                                    sec?.subSection.map((subSec)=>(
                                                        <div 
                                                            className="flex items-center py-4 border-2 border-t-0 border-primary-300"
                                                            key={subSec._id}
                                                        >
                                                            <IoVideocamOutline className="mr-2 ml-6"/>
                                                            {subSec?.title}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mb-12">
                                <h3 className="text-white font-semibold text-2xl mt-6 mb-2">Author</h3>
                                <img 
                                    src={course?.instructor?.image} 
                                    alt="" 
                                    className="rounded-full inline-block mr-2 w-[80px] h-[80px] object-cover"
                                />
                                <p className="text-white inline-block">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                            </div>
                        </div>
                    </div>

                )
            }

            <Footer/>
        </div>
    )
}