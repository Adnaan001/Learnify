import {LearningData} from "../../data/learning-sec-data"
import { HighlightText } from "../Home/HighlightText"
import { CTAbtn } from "../Common/CTAbtn"





export const LearningSection=()=>{
    return(
        <div className="w-11/12 mx-auto grid grid-cols-4 px-[6rem] my-24">
            {
                LearningData.map((data,index)=>(
                    <div 
                        key={index}
                        className={`
                            p-8 h-[20rem] pb-0
                            ${data.orderNo===-1 && "col-span-2 bg-opacity-0"}
                            ${data.orderNo%2==0 ? "bg-primary-200":"bg-primary-300"}
                            ${data.orderNo===2 && "col-start-2"}
                            `}
                    >
                        <h4
                            className={`
                                text-white font-bold
                                ${data.orderNo===-1 ? ("text-4xl mb-4"):("text-lg mb-12")}
                                `}
                        >
                            {data.title}
                            {data.orderNo===-1 && <HighlightText text={data.highlightText}/>}
                        </h4>
                        <p
                            className={`
                                text-gray-300
                                ${data.orderNo!==-1 && ("text-sm")}
                                `}
                        >
                            {data.description}
                        </p>
                        {
                            data.orderNo===-1 &&
                            (
                                <div className="mt-10 mb-4 w-fit">
                                    <CTAbtn active={true} linkto={data.buttonLink}>
                                        {data.buttonText}
                                    </CTAbtn>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}