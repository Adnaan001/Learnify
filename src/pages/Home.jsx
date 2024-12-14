import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/Home/HighlightText";
import { CTAbtn } from "../components/Common/CTAbtn";
import bannerVid from "../assets/bannerVid.mp4";
import { CodingSection } from "../components/Home/CodingSection";
import { Link } from "react-router-dom";
import { TimelineSec } from "../components/Home/TimelineSec";
import { LearningLangSec } from "../components/Home/LearningLangSec";
import instructor from "../assets/images/instructor.jpeg"
import { Footer } from "../components/Footer/Footer";
import { ExploreMore } from "../components/Home/ExploreMore";
import { ReviewSlider } from "../components/Common/ReviewSlider";

 
export const Home=()=>{
    return (
        <div className="h-[100%]">
            {/* section 1 */}
            <div className="w-11/12 mx-auto pb-[10rem]">
                <div className="flex flex-col items-center relative">
                    <Link to={'/signup'} className="rounded-full bg-[#1D3359] text-gray-200 shadow-[4px_4px_15px_rgba(29,51,89,0.8)] max-w-fit  font-medium cursor-pointer mt-16 group">
                        <div className="m-1 group-hover:bg-[#2a3e6d] flex gap-2 items-center py-2 px-6 rounded-full text-center group-hover:hover:scale-95">
                            Become an Instructor
                            <FaArrowRight/>
                        </div>
                    </Link>
                    <div className="flex flex-col items-center mt-10">
                        <h1 className="text-white text-4xl font-medium text-center">Empower Your Future with <HighlightText text={'Coding Skills'}/></h1>
                        <p className="text-gray-400 mt-4 text-center w-[58%]">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
                    </div>
                    <div className="flex gap-4 mt-10">
                        <CTAbtn active={true} linkto={'/signup'}>
                                Learn More
                        </CTAbtn>
                        <CTAbtn active={false} linkto={'/login'}>
                                Book a Demo
                        </CTAbtn>
                    </div>
                    <div className="h-[100px] w-[400px] bg-[#8c88d7bd] rounded-full shadow-[inset_0px_0px_100px_60px_#8c88d7bd,inset_0px_0px_140px_90px_#514da3bd,0px_0px_100px_60px_#8c88d7f1,0px_0px_140px_90px_#514da3e5] absolute top-[31.8rem]">
                    </div>
                    <video
                        className="mt-14 w-[70%] shadow-[3px_6px_10px_rgba(255,255,255,0.77)] z-10"
                        muted
                        autoPlay
                        loop
                    >
                        <source src={bannerVid}/>
                    </video>

                    <CodingSection
                        position={"row"}
                        head={
                                <div className="text-4xl text-white">
                                    Unlock your <HighlightText text={"coding potential"}/> with our online courses.
                                </div>
                            }
                        subheading={
                                <div className="text-gray-400 mt-4"> 
                                    Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                                </div>
                            }
                        ctabtn1={
                                {
                                    linkto:"/login",
                                    text:"Try it Yourself",
                                    active:true
                                }
                            }
                        ctabtn2={
                                {
                                    linkto:"/login",
                                    text:"Learn More",
                                    active:false
                                }
                            }
                        code={
                                `<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><link rel="stylesheet" href="style.css>"\n</head>`
                            }
                        
                        blobColor1={
                            "#398fcd"
                        }
                        blobColor2={
                            "#256a9a"
                        }
                    />

                    <CodingSection
                        position={"row-reverse"}

                        head={
                                <div className="text-4xl text-white w-[45%]">
                                    Start <HighlightText text={"coding in seconds"}/>
                                </div>
                            }
                        subheading={
                                <div className="text-gray-400 mt-4"> 
                                Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.                                </div>
                            }
                        ctabtn1={
                                {
                                    linkto:"/login",
                                    text:"Try it Yourself",
                                    active:true
                                }
                            }
                        ctabtn2={
                                {
                                    linkto:"/login",
                                    text:"Learn More",
                                    active:false
                                }
                            }
                        code={
                                `<!DOCTYPE html>\n<html>\n<head><title>Example</\ntitle><link rel="stylesheet" href="style.css>"\n</head>`
                            }

                        blobColor1={
                                "#982edb"
                            }
                        blobColor2={
                                "#661f93"
                            }
                    />
                </div>
            </div>

            <ExploreMore/>

            {/*section 2*/}
            <div className="bg-[#ffffffe7] w-[100%]">
                {/* section 2-1  */}
                <div className="h-[20rem] bg-[url('./assets/images/grid_bg.png')] bg-center bg-contain">
                    <div className="flex gap-4 justify-center h-[100%] items-center">
                        <CTAbtn active={true} extra={true} linkto={'/catalog/python'}>
                                Explore Full Catalog
                                <FaArrowRight />
                        </CTAbtn>
                        <CTAbtn active={false} linkto={'/signup'}>
                            Learn More
                        </CTAbtn>
                    </div>
                </div>

                {/* section 2-2 */}
                {/* ============================= */}
                <div className="w-11/12 mx-auto">
                {/* ------------------------ */}
                    <div className="flex justify-center gap-4 mt-12 w-[100%]">
                        <div className="text-4xl font-semibold p-8 w-[40%]">
                            Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                        </div>
                        <div className="p-8 w-[40%]">
                            <div className="text-base">
                                The modern Learnify is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <br />
                            <br />
                            <div className="w-fit">
                                <CTAbtn active={true} linkto={'/signup'}>
                                    Learn More
                                </CTAbtn>
                            </div>
                        </div>
                    </div>
                {/* ------------------------- */}
                    <TimelineSec/>
                    <LearningLangSec/>
                </div>
            </div>
            {/* =============================== */}
            {/* section-3 */}
            <div className="flex w-11/12 mx-auto py-16 gap-20 justify-center">
                <div className="w-[40%]">
                    <img src={instructor} alt="instructor" className="object-contain shadow-[-10px_-10px_0px_#fff]"/>
                </div>
                <div className="w-[32%] self-center">
                    <h3 className="text-4xl text-white font-semibold w-[50%]">Become an <HighlightText text={"instructor"}/></h3>
                    <p className="text-gray-400 mt-6">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    <div className="w-fit mt-16">  
                        <CTAbtn active={true} extra={true} linkto={'/signup'}>
                            Start Teaching Today
                            <FaArrowRight/>
                        </CTAbtn>
                    </div>
                </div>
            </div>
            <ReviewSlider/>
            <Footer/>
        </div>
    )
}