import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa";
import { CourseInformationForm } from "../../../../components/Dashboard/Instructor/CourseInformation/CourseInformationForm";
import { CourseBuilderForm } from "../../../../components/Dashboard/Instructor/CourseBuilder/CourseBuilderForm";
import { PublishForm } from "../../../../components/Dashboard/Instructor/CoursePublish/PublishForm";

export const RenderSteps=()=>{
    
    const stepData=[
        {
            num:1,
            title:"Course Information"
        },
        {
            num:2,
            title:"Course Builder"
        },
        {
            num:3,
            title:"Publish"
        }
    ]

    const {step}=useSelector((state)=>state.course);

    // console.log("step is==>",step);
    return(
        <div className="flex flex-col w-[60%]">
            <div className="flex gap-2 ml-12">
                {
                    stepData.map((data,index)=>{
                        // ************************************ //
                        const isActiveStep = data.num === step;
                        const isCompletedStep = data.num < step;
                        const stepClass = isActiveStep 
                            ? "bg-[#254175] text-[#4067f3] border-[#3e65f1] border-2" 
                            : isCompletedStep 
                                ? "bg-[#3a83f8]" 
                                : "bg-gray-600 text-white border-primary-200";
                        const isCompletedStepLine = data.num<=step-1;
                        const lineClass=isCompletedStepLine
                                        ? "border-[#3f86fa]"
                                        :  "border-gray-400"
                        // ****************************************** //
                        return (
                            <div className="flex" key={index}>
                                <div className="w-[10rem] flex flex-col gap-2 items-center relative">
                                    <div className={`
                                                        aspect-square w-[2rem] text-center font-bold p-1 border
                                                        rounded-full ${stepClass}
                                                    `}
                                    >
                                        {
                                            data.num<step
                                            ? (<FaCheck className="m-1 text-primary-800"/>)
                                            : data.num
                                        }
                                    </div>
                                    <div className={`
                                                        text-gray-400
                                                        ${data.num==step && "text-white"}
                                                        
                                                    ` }>
                                        {data.title}
                                    </div>
                                    {
                                        data.num<3
                                        &&
                                        <div className={`
                                                            border-2 border-dashed mt-4 w-[100%] absolute top-0 left-[6rem]
                                                            ${lineClass}
                                                        `}></div>
                                    }
                                </div>
                            </div>
                        )

                    })
                }
            </div>

            {step===1 && <CourseInformationForm/>}
            {step===2 && <CourseBuilderForm/>}
            {step===3 && <PublishForm/>}
        </div>
    )
}