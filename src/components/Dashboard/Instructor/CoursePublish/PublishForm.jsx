import { useDispatch, useSelector } from "react-redux"
import {Dbtn} from "../../../Common/Dbtn"
import { setStep } from "../../../../slices/courseSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { updateCourse } from "../../../../services/operations/CourseApis";

export const PublishForm=()=>{
    const dispath=useDispatch();
    const {course}=useSelector((state)=>state.course);
    const navigate=useNavigate();
    const {setValue,getValues,handleSubmit,register,reset}=useForm({
        defaultValues:{
            status:course?.status==="Drafted" ? false : true
        }
    });

    function submitHandler(){

        if(course?.status==="Drafted" && getValues("status")===false || course?.status==="Published" && getValues("status")===true)
        {
            toast.success(`Course ${course?.status}`);
            navigate('/dashboard/my-courses');   
            return;
        }

        const formData=new FormData();

        formData.append("status",getValues("status") ? "Published" : "Drafted");
        formData.append("courseId",course._id);
        formData.append("category",course?.category?.name);
        dispath(updateCourse(formData,navigate));
    }
    return(
        <form className="bg-primary-700 shadow-lg text-white p-8 rounded-lg mt-8" onSubmit={handleSubmit(submitHandler)}>
            <h3 className="text-2xl mb-6">Publish Settings</h3>
            <div className="inline-flex items-start">
                <label 
                    className="flex items-start cursor-pointer relative" 
                    htmlFor="check"
                >
                    <input 
                        type="checkbox"
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border-2 border-gray-400 checked:bg-primary-500 checked:border-primary-500"
                        {...register("status")}
                        id="check" 
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-3.5 w-3.5" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                            stroke="currentColor" 
                            strokeWidth="1"
                        >
                            <path 
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </span>
                </label>
                <label 
                    className="cursor-pointer ml-2 text-gray-400 text-sm" 
                    htmlFor="check"
                >
                    <p className="font-medium">
                    Make this Course Public
                    </p>
                </label>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Dbtn active={false} type={"button"} onClick={()=>dispath(setStep(2))}>
                    Back
                </Dbtn>
                <Dbtn active={true} type={"submit"}> 
                    Save Changes
                </Dbtn>
            </div>
        </form>
    )
}