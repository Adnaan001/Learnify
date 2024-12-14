import { CTAbtn } from "../Common/CTAbtn";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";


export const CodingSection=({head,subheading,ctabtn1,ctabtn2,code,position,mposition,smposition,blobColor1,blobColor2})=>{
    return(
        <div 
            style={
                {
                    display:"flex",
                    flexDirection:`${position}`
                }
            }
            className={`flex-col justify-center gap-24 w-11/12 p-28 pb-0`}
        >
            <div className="w-[100%] lg:w-[45%]">
                {head}
                {subheading}
                <div className="flex gap-4 mt-10 md:justify-center lg:justify-start">  
                    <CTAbtn active={ctabtn1.active} linkto={ctabtn1.linkto} extra={true}>
                        {ctabtn1.text}
                        <FaArrowRight/>
                    </CTAbtn>

                    <CTAbtn active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.text}
                    </CTAbtn>
                </div>
            </div>

            <div className={`flex h-fit overflow-clip flex-row px-4 py-2 w-[100%] lg:w-[45%] border border-[#d6d1d11d] backdrop-blur-2xl bg-white/5 relative rounded-md`}>

            <div
                style={{
                    backgroundColor: `${blobColor1}7b`,
                    boxShadow: `inset 0px 0px 100px 60px ${blobColor1}7b, inset 0px 0px 140px 90px ${blobColor2}7b, 0px 0px 100px 60px ${blobColor1}b9, 0px 0px 140px 90px ${blobColor2}b9`,
                }}
             className={`absolute left-[8rem] top-20 opacity-50 w-[100px] h-[100px] rounded-full`}/>
                {/* <div className="h-[25rem] w-[46%] rounded-full shadow-[-2px_-100px_25px_#8c88d7f1] absolute top-[31.8rem]"></div> */}
                
                <div className="flex flex-col text-gray-400">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                </div>
                <div className="text-yellow-200 w-[90%]">
                    <TypeAnimation
                        sequence={[code,1000,""]}
                        omitDeletionAnimation={true}
                        repeat={Infinity}
                        wrapper="pre"
                    >
                        </TypeAnimation>   
                </div>
            </div>
        </div>
    );
}
