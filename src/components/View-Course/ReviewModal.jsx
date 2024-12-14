import { useDispatch, useSelector } from "react-redux"
import { Dbtn } from "../Common/Dbtn"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"
import { rateCourse } from "../../services/operations/CourseApis"

export const ReviewModal=({ReviewModal,setReviewModal})=>{
    const {user}=useSelector((state)=>state.profile);
    const dispatch=useDispatch();
    const {courseId}=useParams();

    const {handleSubmit,setValue,getValues,formState:{errors},register}=useForm({
        defaultValues:{
            review:"",
            rating:0,
        }
    })

    function addRating(val){
        setValue("rating",val);
    }

    function reviewHandler(data){
        dispatch(rateCourse(data.rating,data.review,courseId));
    }
    return(
        <div className={`fixed top-0 left-0 flex justify-center items-center w-full h-full bg-white bg-opacity-15 backdrop-blur-lg modal z-[100] transition-all duration-200 ease-in}`}>
            <div className=" bg-primary-700 flex flex-col gap-2 rounded-lg w-[40%] overflow-auto">
                <div className="bg-primary-500 flex p-4 py-3 items-center justify-between rounded-md text-white">
                    <p className="text-2xl font-medium">Add Review</p>
                    <RxCross2 className="text-2xl cursor-pointer" onClick={()=>setReviewModal(false)}/>
                </div>
                <div className="self-center my-4">
                    <div className="flex items-center gap-2">
                        <img src={user?.image} alt="" className="rounded-full" />
                        <div className="text-white">
                            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                            <p>Posting Publicly</p>
                        </div>
                    </div>
                    <ReactStars
                        activeColor={"#B186FF"}
                        isHalf={true}
                        count={5}
                        size={32}
                        onChange={addRating}
                        classNames={"mx-auto my-4"}
                    />
                </div>
                <form action="" onSubmit={handleSubmit(reviewHandler)}>
                    <div className="flex flex-col text-white mx-8">
                        <label 
                            htmlFor="reviewBox"
                        >
                            Add Your Experiece<sup className="text-red-700">*</sup>
                        </label>
                        <textarea 
                            name="" 
                            id="reviewBox"
                            rows={5}
                            {...register("review",{required:"Please fill this field"})}
                            className="bg-primary-500 text-gray-300 py-2 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                        />
                        {
                            errors.review && <p className="text-red-600">{errors.review.message}</p>
                        }
                    </div>

                    <div className="flex gap-2 justify-end mx-8 my-6">
                        <Dbtn
                            type={"button"}
                            onClick={()=>setReviewModal(false)} 
                        >
                            Cancel
                        </Dbtn>
                        <Dbtn
                            active={true}
                            type={"submit"}
                        >
                            Save
                        </Dbtn>
                    </div>
                </form>
            </div>
        </div>
    )
}