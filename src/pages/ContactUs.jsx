import { IoMdChatbubbles } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { ContactForm } from "../components/Common/ContactForm";
import { Footer } from "../components/Footer/Footer";

export const ContactUS=()=>{
    const contactData=[
        {
            icon:<IoMdChatbubbles size={20} className="text-gray-300"/>,
            head:"Chat on us",
            desc1:"Our friendly team is here to help.",
            desc2:"learnify.learn@gmail.com"
        },
        {
            icon:<FaEarthAsia size={17} className="text-gray-300"/>,
            head:"Visit us",
            desc1:"Come and say hello at our office HQ.",
            desc2:"1234 Business Blvd, Suite 100"
        },
        {
            icon:<IoCall size={20} className="text-gray-300"/>,
            head:"Call us",
            desc1:"Mon - Fri From 8am to 5pm",
            desc2:"+123 456 7890"
        }
    ]
    return(
        <div>
            <div className="w-11/12 mx-auto my-12 flex justify-center gap-32">
                <div className="flex flex-col gap-12 bg-primary-300 shadow-lg p-12 rounded-lg w-[35%] h-[50%]">
                    {
                        contactData.map((data,index)=>(
                            <div key={index} className="flex gap-2">
                                {data.icon}
                                <div className="text-gray-300">
                                    <h5 className="text-white font-bold">{data.head}</h5>
                                    <p>{data.desc1}</p>
                                    <p>{data.desc2}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* ==== */}
                <div className="rounded-lg border border-primary-300 p-9 w-[45%] mb-8">
                    <div>
                        <h4 className="text-white text-4xl font-bold mb-4">
                            Got a Idea? We’ve got the skills. Let’s team up
                        </h4>
                        <p className="text-gray-400 mb-8">
                            Tell us more about yourself and what you’re got in mind.
                        </p>
                        <ContactForm/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}