import {Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Pagination , Navigation, Autoplay,FreeMode} from "swiper/modules";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiconnector";
import { endpoints } from "../../services/apis";
import ReactStars from "react-rating-stars-component"

export const ReviewSlider=()=>{
    const [allReviews,setAllReviews]=useState();
    useEffect(()=>{
        async function fetchAllReviews(){
            try{
                const result=await apiConnector("GET",endpoints.GET_ALL_REVIEWS);

                setAllReviews(result.data?.Response);
            }catch(e){
                console.error(e.response.data?.EEROR ||e.message)
                toast.error(e.response.data?.message);
            }
        }
        fetchAllReviews();
    },[])
    return(
        <div className="w-11/12 mx-auto">
            <h3 className="text-white text-4xl font-semibold my-24 text-center">Reviews from other learners</h3>
            {
                (allReviews && allReviews.length!==0)
                    ? (
                        <div>
                        <Swiper
                            loop={true}
                            slidesPerView={4}
                            spaceBetween={30}
                            autoplay={{
                                delay:1000,
                            }}
                            freeMode={true}
                            modules={[Autoplay,FreeMode,Pagination]}
                            className=" w-full h-fit mb-12 mt-4"
                        >
                        {
                            allReviews.map((review)=>(
                                <SwiperSlide key={review._id} className="bg-primary-600 p-4 rounded-md ">
                                    <div className="flex items-center">
                                        <img src={review?.user.image} alt="" className="rounded-full inline-block mr-2 w-[50px] h-[50px] object-cover"/>
                                        <div className="inline-block">
                                            <p className="text-white font-medium">{review?.user?.firstName} {review?.user?.lastName}</p>
                                            <p className="text-gray-400 text-sm">{review?.course?.title}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white mt-4">{review?.review}</p>
                                        <div className="flex items-center gap-1 text-secondary-400">
                                            <p className="self-end mb-2">{review?.rating}</p>
                                            <ReactStars
                                                activeColor={"#B186FF"}
                                                isHalf={true}
                                                value={review?.rating}
                                                size={20}
                                                edit={false}
                                                classNames={"mx-auto mt-4"}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    </div>
                )
                :(
                    <div>
                        Loading....
                    </div>
                )
            }
        </div>
    )
}