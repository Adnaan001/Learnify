import { HighlightText } from "../components/Home/HighlightText"
import study_img_1 from "../assets/images/AboutUs/study_img_1.jpg"
import study_img_2 from "../assets/images/AboutUs/study_img_2.jpg"
import study_img_3 from "../assets/images/AboutUs/study_img_3.jpg"
import our_img from "../assets/images/AboutUs/our_img.jpg"
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import { StatsSection } from "../components/AboutUs/Stats"
import { LearningSection } from "../components/AboutUs/LearningSection"
import { ContactForm } from "../components/Common/ContactForm"
import { Footer } from "../components/Footer/Footer"


export const AboutUs=()=>{
    return(
        <div>
            {/* section 1 */}
            <div className="bg-[#556E94]">
                <div className="w-11/12 text-center mx-auto pt-32 px-[19rem] pb-[15rem]">
                    <p className="text-gray-300 mb-10">
                        About us
                    </p>
                    <h2 className="text-4xl text-white my-5 font-semibold">
                        Driving Innovation in Online Education for a <p className="bg-gradient-to-br from-orange-400 via-yellow-900 to-orange-400
                            text-transparent bg-clip-text text-4xl font-semibold">Brighter Future</p>
                    </h2>
                    <p className=" text-gray-300">
                        Learnify is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>
            </div>
            {/* section 2 */}
            <div className="flex flex-row w-11/12 mx-auto justify-center gap-8 mt-[-12rem] relative">
                <img src={study_img_1} alt="img_1" className="w-[30%] rounded-sm"/>
                <div className="h-[10px] w-[100px] bg-[#d7ca88bd] rounded-full shadow-[inset_0px_0px_100px_60px_#d7ca88bd,inset_0px_0px_140px_90px_#d7bd88bd,0px_0px_100px_60px_#d7ca88f1,0px_0px_140px_90px_#d7bd88e5] absolute top-[5.5rem]">
                </div>
                <img src={study_img_2} alt="img_2" className="w-[30%] object-contain rounded-sm z-[100]"/>
                <img src={study_img_3} alt="img_3" className="w-[30%] object-contain rounded-sm"/>
            </div>
            {/* section 3 */}
            <div className="text-white w-11/12 mx-auto text-center px-[9rem] py-24 relative">
                <ImQuotesLeft className="text-gray-500 absolute left-[12rem]"/>
                <p className="text-4xl leading-[3rem] text-gray-300">
                    We are passionate about revolutionizing the way we learn. 
                    Our innovative platform <HighlightText text={"combines technology"}/>, 
                    <span className="bg-gradient-to-r from-lime-500 to-green-300 text-transparent bg-clip-text"> expertise</span>
                    , and community to 
                    create an
                    <span className="bg-gradient-to-r from-lime-900 to-green-600 text-transparent bg-clip-text"> unparalleled educational experience.</span>
                </p>
                <ImQuotesRight className="text-gray-500 absolute top-[12rem] right-[20.5rem]"/>
            </div>
            {/* section 4 */}
            <div className="py-12 border-t-2 border-primary-300">
                <div className="flex flex-col justify-center gap-[8rem] w-11/12 mx-auto ">
                    <div className="flex justify-center gap-44">
                        <div className="w-[35%]">
                            <h3 className="bg-gradient-to-br from-fuchsia-900 via-red-700 to-red-500
                            text-transparent bg-clip-text text-4xl font-semibold">
                                Our Founding Story 
                            </h3>
                            <p className="text-gray-300 my-4">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className="text-gray-300">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        <div className="w-[35%] flex justify-center">
                            <img src={our_img} alt="" className="w-[85%] object-contain"/>
                        </div>
                    </div>

                    <div className="flex justify-center gap-44">
                        <div className="w-[35%]">
                            <h3 className="bg-gradient-to-r from-lime-900 to-green-600 text-transparent 
                            bg-clip-text text-4xl font-semibold">
                                Our Vision
                            </h3>
                            <p className="text-gray-300 mt-6">
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize 
                                the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive 
                                platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive 
                                learning experience.
                            </p>
                        </div>

                        <div className="w-[35%]">
                            <h3 className="text-4xl font-semibold">
                                <HighlightText text={"Our Mission"}/>
                            </h3>
                            <p className="text-gray-300 mt-6">
                                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of 
                                learners, where individuals can connect, collaborate, and learn from one another. We believe that 
                                knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of 
                                collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* {section 5} */}
            <StatsSection/>
            {/* {section 6} */}
            <LearningSection/>
            {/* {section 7} */}
            <div className="flex flex-col justify-center items-center w-11/12 mx-auto mb-32">
                <div className="mb-14">
                    <div>
                        <h4 className="text-white text-4xl text-center font-semibold">
                            Get in Touch
                        </h4>
                        <p className="text-gray-400 mt-4 text-center">
                            We’d love to here for you, Please fill out this form.
                        </p>
                    </div>
                </div>
                <div className="w-[50%]">
                    <ContactForm/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}