import Logo1 from "../../assets/TimelineLogo/Logo1.svg"
import Logo2 from "../../assets/TimelineLogo/Logo2.svg"
import Logo3 from "../../assets/TimelineLogo/Logo3.svg"
import Logo4 from "../../assets/TimelineLogo/Logo4.svg"
import TimelineImg from "../../assets/images/TimelineImg.jpg"


export const TimelineSec=()=>{

    const timeline=[
        {
            logo:Logo1,
            heading:'Leadership',
            desc:"Fully committed to the success company"
        },
        {
            logo:Logo2,
            heading:'Responsibility',
            desc:"Students will always be our top priority"
        },
        {
            logo:Logo3,
            heading:'Flexibility',
            desc:"The ability to switch is an important skills"
        },
        {
            logo:Logo4,
            heading:'Solve the problem',
            desc:"Code your way to a solution"
        }
    ]
    return(
        <div className="flex justify-around mt-10">
            <div>
                {
                    timeline.map((data,index)=>(
                        
                        <div key={index} className="flex gap-4">
                            <div>
                                <div className="bg-white rounded-full w-fit h-fit p-2">
                                    <img src={data.logo} alt="logo1" width={25} />
                                </div>
                                {
                                    index<timeline.length-1
                                    &&
                                    (<div className="border  border-t-0 border-b-0 border-dashed border-[#AFB2BF] h-11 w-0 ml-[19px] my-2"></div>)
                                }
                                </div>
                            <div>
                                <h3>{data.heading}</h3>
                                <p>{data.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="relative z-10">
                <div className="rounded-full absolute -z-50 w-[35rem] left-12 top-20  h-[15rem] shadow-[inset_0px_0px_80px_#fff,inset_50px_0px_200px_#935a24,inset_50px_0px_200px_#935a24,0px_0px_80px_#fff,50px_0px_100px_#935a24,-50px_0px_100px_#935a24] bg-[#935a24]"></div>
                <div className="shadow-[15px_15px_0px_#fff]">
                    <img src={TimelineImg} alt="" width={650} height={500}/>
                </div>
                <div className="bg-yellow-700 max-w-[75%] min-h-[20%] flex justify-center gap-8 absolute bottom-[-4rem] left-[5.5rem] text-white font-bold px-6 rounded-sm shadow-[2px_4px_16px_#530d0dcc]">
                    <div className="flex gap-4 h-[100%] items-center max-w-[40%] my-8">
                        <div className="text-4xl">
                            10
                        </div>
                        <div>
                            YEARS
                            EXPERIENCE
                        </div>
                    </div>
                    <div className="border border-spacing-1 border-white h-[5rem] mt-4"></div>
                    <div className="flex gap-4 h-[100%] items-center max-w-[40%] my-8">
                        <div className="text-4xl">
                            250
                        </div>
                        <div>
                           TYPES OF
                           COURSES
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 