import { useForm } from "react-hook-form";
import { Dbtn } from "../../../Common/Dbtn"
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { VidThumbnail } from "../../../../../src/components/Dashboard/Instructor/CourseBuilder/VidThumbnail";
import { createSubSection, updateSubSection } from "../../../../services/operations/CourseApis";
import toast from "react-hot-toast";

export const LectureModal=(
    {
        setModal,
        Modal,
        headTxt,
        subSection,
        viewModal,
        editModal,
        createModal
    }
)=>{
    const {course}=useSelector((state)=>state.course);

    // console.log("course in Lecture Modal==>",course);

    // console.log("subsection==>",subSection?.video);

    // subSection?.duration.split("h")[0]
    // subSection?.duration.split("h")[1].split("min")[0]

    const {setValue,getValues,register,handleSubmit,formState:{errors},reset}=useForm({
        defaultValues:{
            vidFile:subSection ? subSection?.video : null,
            title:subSection ? subSection?.title : "",
            hour:subSection ? Math.floor(subSection?.duration/3600) : "",
            minute:subSection ? Math.floor((subSection?.duration % 3600) / 60) : "",
            seconds:subSection ? subSection?.duration % 60 : "",
            duration:0,
            description:subSection ? subSection?.description : ""
        }
    });

    function isFormUpdated(data){
        setValue("duration",(Number(getValues("hour"))*3600)+(Number(getValues("minute"))*60)+Number(getValues("seconds")));
        if(data.title !== subSection.title 
            || data.vidFile.preview !== subSection.video
            || data.description !== subSection.description
            || getValues("duration") !== subSection.duration
        )
            return true;
        else
            return false;
    }  


    const dispatch=useDispatch();


    function submitLecture(data){
        // console.log("lecture data==>",data);
        const formData=new FormData();

        if(editModal)
        {
            formData.append("courseId",course._id);
            formData.append("sectionId",Modal);
            formData.append("subSectionId",subSection._id);
            if(isFormUpdated(data))
            {
                formData.append("vidFile","");

                if(data.title !== subSection.title )
                    formData.append("title",data.title);
                else if(data.vidFile.preview !== subSection.video)
                    formData.append("vidFile",data.vidFile);
                else if(data.description !== subSection.description)
                    formData.append("description",data.description);
                else if(getValues("duration") !== subSection.duration)
                    formData.append("duration",getValues("duration"))
                 
                dispatch(updateSubSection(formData,setModal));

                return;
            }
            else{
                toast.error("No changes were made");
                return;
            }
        }

        setValue("duration",(Number(getValues("hour"))*3600)+(Number(getValues("minute"))*60)+Number(getValues("seconds")));

        formData.append("title",data.title);
        formData.append("description",data.description);
        formData.append("duration",getValues("duration"))
        formData.append("vidFile",data.vidFile);
        formData.append("sectionId",Modal);
        formData.append("courseId",course._id);

        dispatch(createSubSection(formData,setModal,()=>{
            reset();
        }));
    }

    return(
        <div className={`fixed top-0 left-0 flex justify-center items-center w-full h-full bg-white bg-opacity-15 backdrop-blur-lg modal z-[100] transition-all duration-200 ease-in}`}>
            <div className=" bg-primary-700 flex flex-col gap-2 rounded-lg w-1/3 overflow-auto">
                <div className="bg-primary-500 flex p-4 py-3 items-center justify-between rounded-md">
                    <p className="text-2xl font-medium">{headTxt}</p>
                    <RxCross2 className="text-2xl cursor-pointer" onClick={()=>setModal(false)}/>
                </div>
                <form className="bg-primary-700 text-white  rounded-lg shadow-lg m-6 flex flex-col gap-6" onSubmit={handleSubmit(submitLecture)}>
                    <VidThumbnail
                        label={"Lecture Video"}
                        setValue={setValue}
                        getValues={getValues}
                        editLecture={subSection}
                        viewModal={viewModal}
                    />
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="title"
                            className="text-gray-200"
                        >
                            Lecture Title<sup className="text-red-600">*</sup>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter Lecture Title"
                            id="title"
                            readOnly={viewModal}
                            {...register("title",{required:"Fill this field"})}
                            className="bg-primary-500 text-gray-300 py-2 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                        />
                        {
                            errors.title && <p className="text-red-600">{errors.title.message}</p>
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="playbackTime"
                            className="text-gray-200"
                        >
                            Video Playback Time<sup className="text-red-600">*</sup>
                        </label>
                        <div className="flex gap-4">
                            <input 
                                type="number" 
                                placeholder="HH"
                                id="playbackTime"
                                readOnly={viewModal}
                                {...register("hour",{required:"Fill this field"})}
                                className="bg-primary-500 text-gray-300 py-2 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                            />
                            {
                                errors.hour && <p className="text-red-600">{errors.title.message}</p>
                            }
                            <input
                                type="number"
                                placeholder="MM"
                                id="playbackTime"
                                readOnly={viewModal}
                                {...register("minute",{required:"Fill this field"})}
                                className="bg-primary-500 text-gray-300 py-2 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                            />
                            {
                                errors.minute && <p className="text-red-600">{errors.title.message}</p>
                            }
                            <input
                                type="number"
                                placeholder="SS"
                                id="playbackTime"
                                readOnly={viewModal}
                                {...register("seconds",{required:"Fill this field"})}
                                className="bg-primary-500 text-gray-300 py-2 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                            />
                            {
                                errors.seconds && <p className="text-red-600">{errors.title.message}</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="description"
                            className="text-gray-200">
                                Lecture Description<sup className="text-red-600">*</sup>
                        </label>
                        <textarea 
                            placeholder="Enter Lecture Description"
                            id="description"
                            readOnly={viewModal}
                            rows={3}
                            {...register("description",{required:"Fill this field"})}
                            className="bg-primary-500 text-gray-300 py-2 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                        />
                        {
                            errors.description && <p className="text-red-600">{errors.description.message}</p>
                        }
                    </div> 
                    {
                        editModal
                        &&  <Dbtn active={true} className={"w-1/3 self-end"}>
                                Save Changes
                            </Dbtn>

                    }
                    {
                        createModal
                        &&  <Dbtn active={true} className={"w-1/4 self-end"}>
                                Save
                            </Dbtn>
                    }  
                </form>   
            </div>
        </div>
    )
}