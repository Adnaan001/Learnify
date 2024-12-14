import { useState } from "react"
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Authbtn } from "../../components/Auth/Authbtn";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { resetPassword } from "../../services/operations/Authapis";

export const ResetPassword=()=>{

    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    function submitHandler(e){
        e.preventDefault();
        dispatch(resetPassword(password,confirmPassword,navigate));
    }

    return (
        <div className="w-11/12 mx-auto text-white mt-[5rem]">
            <div className="w-[30%] mx-auto flex flex-col gap-6 bg-primary-700  p-8 lg:p-12 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold">
                    Choose  new password
                </h2>
                <p className="text-gray-400">
                    Almost done. Enter your new password and youre all set.
                </p>
                <form action="" onSubmit={submitHandler}>
                    <div className="flex flex-col gap-6">
                        <div className="relative flex flex-col gap-1">
                            <label 
                                htmlFor="newPassword"
                                className="text-gray-200">
                                New Password<span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                type={`${showPassword ? "text":"password"}`}
                                placeholder="Enter New Password"
                                id="newPassword"
                                name="newPassword"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                            />
                            <div className="absolute text-gray-400 cursor-pointer top-[2.8rem] right-2">
                                {
                                    showPassword
                                    ?
                                    (<FaEye onClick={()=> setShowPassword(false)}/>)
                                    :
                                    (<FaEyeSlash onClick={()=> setShowPassword(true)}/>) 
                                }
                            </div>
                        </div>
                        <div className=" relative flex flex-col gap-1">
                            <label 
                                htmlFor="confirmNewPassword"
                                className="text-gray-200">
                                    Confirm New Password<span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                type={`${showConfirmPassword ? "text":"password"}`}
                                placeholder="Confirm New Password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                            />
                            <div className="absolute text-gray-400 cursor-pointer top-[2.8rem] right-3">
                                {
                                    showConfirmPassword
                                    ?
                                    (<FaEye onClick={()=> setShowConfirmPassword(false)}/>)
                                    :
                                    (<FaEyeSlash onClick={()=> setShowConfirmPassword(true)}/>) 
                                }
                            </div>
                        </div>
                        <Authbtn>
                            Reset Password
                        </Authbtn>
                    </div>
                </form>
                <Link to={'/login'} className='text-white flex items-center gap-1'>
                    <IoIosArrowDropleft/>
                    <p>Back to login</p>
                </Link>
            </div>
        </div>
    )
}