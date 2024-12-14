import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { apiConnector } from "../../../../services/apiconnector";
import { categories } from "../../../../services/apis";
import { CourseTags } from "./CourseTags";
import { Thumbnail } from "./Thumbnail";
import { Requirements } from "./Requirements";
import {Dbtn} from "../../../Common/Dbtn"
import { createCourse, updateCourse } from "../../../../services/operations/CourseApis";
import { setStep } from "../../../../slices/courseSlice";
import toast from "react-hot-toast";

export const CourseInformationForm=()=>{

    const {editCourse,course,step}=useSelector((state)=>state.course);
    // console.log("course?.category?.name==>",course?.category?.name);
    const {handleSubmit,register,reset,formState:{errors},setValue,getValues,watch}=useForm({
        defaultValues:{
            title:course?.title,
            description:course?.description,
            price:course?.price,
            category:course?.category?.name || "",
            tags:course?.tags,
            imgFile:course?.thumbnail,
            benefits:course?.benefits,
            requirements:course?.requirements
        }
    });
    // console.log("gtevalue for categoruy==>",getValues("category"));
    const [subLinks,setSubLinks]=useState([]);

    // console.log("course is==>",course);

    async function getCategories(){
        try{
            const result=await apiConnector("GET",categories.SHOW_ALL_CATEGORIES);
            setSubLinks(result.data?.Response);
            // console.log("sublinks==>",subLinks);
        }catch(e)
        {
            console.error("An error occured while fetching categories from server ERROR==>",e.message);
        }
    }

    useEffect(()=>{
        getCategories();
    },[])  

    function isFormUpdated(data){
        if(data.title !== course.title 
            || data.description !== course.description
            || data.price !== course.price
            || (data.tags && data.tags.toString() !== course.tags)
            || data.category !== course.category?.name
            || data.benefits !== course.benefits
            || (data.requirements && data.requirements.toString() !== course.requirements)
            || data.imgFile.preview !== course.thumbnail
        )
        {
            console.log("returning true");
            return true;
        }
        else
            return false;
    }       
    const dispatch=useDispatch();
    // console.log("sublinks==>",subLinks)

    function submitHandler(data){
        console.log("data==>",data);
        const formData=new FormData();

        if(editCourse)
        {
            console.log("Editing the course");
            console.log("courseId==>",course._id);
            formData.append("courseId",course._id);
            if(isFormUpdated(data))
            {
                console.log("Form is updated");
                if(data.title !== course.title)
                    formData.append("title",data.title);
                if(data.description !== course.description)
                    formData.append("description",data.description);
                if(data.price !== course.price)
                    formData.append("price",data.price);
                if(data.category !== course.category)
                    formData.append("category",data.category);
                if(data.tags && data.tags.toString() !== course.tags)
                    formData.append("tags",data.tags.toString());
                if(data.benefits !== course.benefits)
                    formData.append("benefits",data.benefits);
                if(data.requirements && data.requirements.toString() !== course.requirements)
                    formData.append("requirements",data.requirements.toString());
                if(data.imgFile !== course.thumbnail)
                    formData.append("imgFile",data.imgFile);
    
                dispatch(updateCourse(formData));
                return;
            }
            else
            {
                toast.error("No changes were made");
                return;
            }

        }

        formData.append("title",data.title);
        formData.append("description",data.description);
        formData.append("price",data.price);
        formData.append("category",data.category);
        data.tags && formData.append("tags",data.tags.toString());
        formData.append("benefits",data.benefits);
        data.requirements && formData.append("requirements",data.requirements.toString());
        formData.append("imgFile",data.imgFile);
        dispatch(createCourse(formData));
    }

    return(
        <form className="bg-primary-700 p-6 text-white  rounded-lg shadow-lg m-6 flex flex-col gap-6" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="title"
                    className="text-gray-200">
                        Course Title<sup className="text-red-600">*</sup>
                </label>
                <input 
                    type="text" 
                    placeholder="Enter Course Title"
                    id="title"
                    {...register("title",{required:"Fill this field"})}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                {
                    errors.title && <p className="text-red-600">{errors.title.message}</p>
                }
            </div>
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="description"
                    className="text-gray-200">
                        Course Short Description<sup className="text-red-600">*</sup>
                </label>
                <textarea 
                    placeholder="Enter Description"
                    id="description"
                    rows={5}
                    {...register("description",{required:"Fill this field"})}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                {
                    errors.description && <p className="text-red-600">{errors.description.message}</p>
                }
            </div>
            <div className="flex flex-col gap-1 relative">
                <label 
                    htmlFor="price"
                    className="text-gray-200">
                        Price<sup className="text-red-600">*</sup>
                </label>
                <input 
                    type="number" 
                    placeholder="Enter Price"
                    id="price"
                    {...register("price",{required:"Fill this field"})}
                    className="bg-primary-500 text-gray-300 py-3 pl-10 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                <RiMoneyRupeeCircleLine className="text-gray-300 w-12 absolute top-[2.7rem]"/>
                {
                    errors.price && <p className="text-red-600">{errors.price.message}</p>
                }
            </div>
            <div className="flex flex-col gap-1 relative">
                <label 
                    htmlFor="categories"
                    className="text-gray-200">
                        Categories<sup className="text-red-600">*</sup>
                </label>
                <select
                    placeholder="Choose a Category"
                    id="categories"
                    value={watch("category")}
                    {...register("category",{required:"Fill this field"})}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                >
                    <option value={""} disabled>Choose a Category</option>
                    {
                        subLinks?.map((cat,index)=>(
                            <option value={cat.name} key={index} >{cat.name}</option>
                        ))
                    }
                </select>
                {
                    errors.category && <p className="text-red-600">{errors.category.message}</p>
                }
                <p>{watch("category")}</p>
            </div>
            <CourseTags
                label={"Tags"}
                placeholder={"Choose a Tag"}
                register={register}
                errors={errors}
                watch={watch}
                getValues={getValues}
                setValue={setValue}
            />
            <Thumbnail
                label={"Course Thumbnail"}
                register={register}
                getValues={getValues}
                setValue={setValue}
            />
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="benefits"
                    className="text-gray-200">
                        Benefits of the course<sup className="text-red-600">*</sup>
                </label>
                <textarea
                    placeholder="Enter Benefits of the course"
                    id="benefits"
                    rows={5}
                    {...register("benefits",{required:"Fill this field"})}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                {
                    errors.benefits && <p className="text-red-600">{errors.benefits.message}</p>
                }
            </div>
            <Requirements
                label={"Requirements/Instructions"}
                placeholder={"Enter Requirements for the course"}
                getValues={getValues}
                setValue={setValue}
                error={errors}
                watch={watch}
            />
            {
                editCourse
                ?   (
                    <div className="flex gap-4 self-end">
                        <Dbtn onClick={()=>dispatch(setStep(2))}>
                            Continue Without Saving
                        </Dbtn>
                        <Dbtn active={true} type={"submit"}>
                            Save Changes
                        </Dbtn>
                    </div>
                    )
                :   (
                    <Dbtn active={true} className="w-[6rem] self-end">
                        Next
                    </Dbtn>
                    )
            }
        </form>
    )
}