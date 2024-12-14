import { useState } from "react"
import { CountryData } from "../../data/country-data";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Authbtn } from "./Authbtn";
import { useDispatch,useSelector } from "react-redux";
import { sendOtp, signup } from "../../services/operations/Authapis";
import { useNavigate } from "react-router";
import { setSignUpData } from "../../slices/authSlice";

export const SignupForm=()=>{
    const [formData,setFormData]=useState({
        accountType:"Student",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    
    function changeHandler(e){
        setFormData((prevData)=>{
            return{
                ...prevData,
                [e.target.name]:e.target.value
            }
        })
    }
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {signupData}=useSelector((state)=>state.auth);
    function submitHandler(e)
    {
        e.preventDefault();
        console.log("formData after signup==>",formData);
        dispatch(setSignUpData(formData));
        console.log("signupData after signup ==>",signupData);
        const {firstName,lastName,email,password,confirmPassword,accountType}=formData;
        dispatch(signup(firstName,lastName,email,password,confirmPassword,accountType,null,navigate));
    }

    const [password,setPassword]=useState(true);
    const [confirmPassword,setConfirmPassword]=useState(true);

    return (
        <form action="" className="flex flex-col gap-6 mt-6" onSubmit={submitHandler}>
            <div className="bg-primary-500 text-gray-400 py-3 px-1 rounded-full w-fit shadow-[1px_2px_4px_#3a3949]">
                <input
                    type="radio"
                    name="accountType" 
                    id="Student"
                    value={"Student"}
                    className="hidden"
                    checked={formData.accountType==="Student"}
                    onChange={changeHandler}
                />
                <label
                    htmlFor="Student"
                    className={`${formData.accountType==="Student" && "bg-primary-600 text-gray-200"} p-4 py-3 rounded-full cursor-pointer transition-all duration-300`}
                >
                    Student
                </label>
                {/* ------- */}
                <input 
                    type="radio" 
                    name="accountType" 
                    id="Instructor"
                    value={"Instructor"}
                    className="hidden"
                    checked={formData.accountType==="Instructor"}
                    onChange={changeHandler}
                />
                <label 
                    htmlFor="Instructor"
                    className={`${formData.accountType==="Instructor" && "bg-primary-600 text-gray-200"} p-4 py-3 rounded-full cursor-pointer transition-all duration-300`}
                >
                    Instructor
                </label>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                    <label 
                        htmlFor="firstName"
                        className="text-gray-200">
                            First Name<span className="text-red-600">*</span>
                    </label>
                    <input 
                        required
                        type="text" 
                        placeholder="Enter first name"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={changeHandler}
                        className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label 
                        htmlFor="lastName"
                        className="text-gray-200">
                            Last Name<span className="text-red-600">*</span>
                    </label>
                    <input 
                        required
                        type="text" 
                        placeholder="Enter last name"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}  
                        onChange={changeHandler}
                        className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="email"
                    className="text-gray-200">
                        Email Address<span className="text-red-600">*</span>
                </label>
                <input
                    required
                    type="email" 
                    placeholder="Enter email address"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
            </div>
            <div className="flex gap-4">
                <div className="relative flex flex-col gap-1">
                    <label 
                        htmlFor="password"
                        className="text-gray-200">
                            Password<span className="text-red-600">*</span>
                    </label>
                    <input
                        required
                        type={`${password ? "password":"text"}`}
                        placeholder="Enter Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    />
                    <div className="absolute text-gray-400 cursor-pointer top-[2.8rem] right-2">
                        {
                            password
                            ?
                            (<FaEyeSlash onClick={()=> setPassword(false)}/>)
                            :
                            (<FaEye onClick={()=> setPassword(true)}/>) 
                        }
                    </div>
                </div>
                <div className=" relative flex flex-col gap-1">
                    <label 
                        htmlFor="confirmPassword"
                        className="text-gray-200">
                            Confirm Password<span className="text-red-600">*</span>
                    </label>
                    <input
                        required
                        type={`${confirmPassword ? "password":"text"}`}
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                    />
                    <div className="absolute text-gray-300 cursor-pointer top-[2.8rem] right-3">
                        {
                            confirmPassword
                            ?
                            (<FaEyeSlash onClick={()=> setConfirmPassword(false)}/>)
                            :
                            (<FaEye onClick={()=> setConfirmPassword(true)}/>)
                        }
                    </div>
                </div>
            </div>
            <Authbtn>
                Create Account
            </Authbtn>
        </form>
    )
}