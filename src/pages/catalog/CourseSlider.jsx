// import Swiper from "swiper"
import {Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination , Navigation, Autoplay} from "swiper/modules";
import { RatingStars } from "../../components/Common/RatingStars";
import { useNavigate } from "react-router";

export const CourseSlider=({categoryData})=>{
    // console.log("catalogPagedataa==>",categoryData)
    const navigate=useNavigate();
    return (
        <div className="my-12">
            <Swiper
                loop={true}
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable:true
                }}
                navigation={true}
                autoplay={{
                    delay:1000,
                    disableOnInteraction:true
                }}
                modules={[Pagination,Navigation,Autoplay]}
                className="mySwiper w-full h-[35rem]"
            >
                {
                    categoryData.courses.map((course)=>(
                        <SwiperSlide 
                            key={course._id}
                        >
                            <div 
                                className="flex flex-col text-white gap-4 cursor-pointer"
                                onClick={()=>navigate(`/course/${course._id}`)}
                            >
                                <img src={course.thumbnail} alt="Thumbnail" className="w-[20rem] h-[20rem] object-contain" />
                                <p className="text-lg font-semibold">{course.title}</p>
                                <div>
                                    <RatingStars courseId={course._id} className={"text-[#3B82F6]"} ratingLength={course?.ratingAndReview.length}/>
                                    {/* <p className="text-gray-400 text-sm ml-2">{course?.ratingAndReview.length} Ratings</p> */}
                                </div>
                                <p>Rs. {course.price}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}