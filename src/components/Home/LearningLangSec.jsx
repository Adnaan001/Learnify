import { HighlightText } from "./HighlightText"
import img_1 from "../../assets/images/Know_your_progress.png"
import img_2 from "../../assets/images/Compare_with_others.svg"
import img_3 from "../../assets/images/Plan_your_lessons.svg"
import { CTAbtn } from "../Common/CTAbtn"


export const LearningLangSec=()=>{
    return(
        <div className="mt-28 py-20 flex flex-col gap-6">

            <div className="text-center">
                <h3 className="text-4xl font-semibold">Your swiss knife for <HighlightText text={"learning any language"}/></h3>
                <p className="px-[25rem] mt-4 text-slate-700">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>

            <div className="flex flex-row justify-center items-center">
                <img src={img_1} alt="" width={400} className="object-contain -mr-28 mb-14"/>
                <img src={img_2} alt="" width={480} className="object-contain"/>
                <img src={img_3} alt="" className=" object-contain -ml-40 mb-14"/>
            </div>

            <div className="w-fit self-center">
                <CTAbtn active={true} linkto={'/signup'}>
                        Learn More
                </CTAbtn>
            </div>
    </div>
    );
}