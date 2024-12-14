import { Link } from "react-router-dom"
import logo from "../../assets/Logo/Learnify.png"
import { FooterContent } from "../Footer/FooterContent"
import { FaGoogle } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"
import { IoHeartSharp } from "react-icons/io5";
import { PiCopyrightLight } from "react-icons/pi";


export const Footer=()=>{
    return(
        <div className="bg-gradient-to-t from-[#0A1A3E] to-[#1D3359] border border-r-0 border-l-0 border-b-0 border-[#cbcbcb53] ">
            <div className="flex flex-col w-10/12 mx-auto pt-14 ">
                <div className="flex justify-between gap-8 ">
                    <div className="flex gap-20 p-10 ">
                        <div className="flex flex-col gap-4">
                            <img src={logo} alt="" width={100}/>
                            <FooterContent name={"Company"}/>
                            <div className="flex gap-2">
                                <FaFacebook size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer"/>
                                <FaGoogle size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer"/>
                                <FaYoutube size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer"/>
                                <FaTwitter size={20} className="text-gray-400 hover:text-gray-300 cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-10">
                            <FooterContent name={"Resources"}/>
                            <FooterContent name={"Support"}/>
                        </div>
                        <div className="flex flex-col gap-10">
                            <FooterContent name={"Plans"}/>
                            <FooterContent name={"Community"}/>
                        </div>
                    </div>
                    <div className="border border-[#485771b0] my-14"></div>
                    <div className="flex gap-20 p-10">
                        <FooterContent name={"Subjects"}/>
                        <FooterContent name={"Languages"}/>
                        <FooterContent name={"Career building"}/>
                    </div>
                </div>

                <div className="border border-[#485771b0]"></div>

                <div className="flex justify-between py-10">
                    <div className="flex">
                        <Link to={'/'} className="text-gray-400 hover:text-gray-300 cursor-pointer">Privacy Policy<span className="border m-2 border-[#485771b0]"></span></Link>
                        <Link to={'/'} className="text-gray-400 hover:text-gray-300 cursor-pointer">Cookie Policy<span className="border m-2 border-[#485771b0]"></span></Link>
                        <Link to={"/home"} className="text-gray-400 hover:text-gray-300 cursor-pointer">Terms</Link>
                    </div>
                    <div className="text-gray-400">
                        Made with <IoHeartSharp className="inline-block text-red-600"/> Mohammed Adnan <PiCopyrightLight className="inline-block text-gray-400"/> Learnify
                    </div>
                </div>

            </div>
        </div>
    )
}