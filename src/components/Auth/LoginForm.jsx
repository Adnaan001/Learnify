import { useState } from "react"
import { FaEye } from "react-icons/fa6"
import { FaEyeSlash } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { Authbtn } from "./Authbtn"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../services/operations/Authapis"

export const LoginForm=()=>{

    const [formData,setFormData]=useState(
        {
            email:"",
            password:""
        }
    )
    
    function changeHandler(e)
    {
        setFormData((prevdata)=>{
            return{
                ...prevdata,
                [e.target.name]:e.target.value
            }
        })
    }
    const dispatch=useDispatch();
    const navigate=useNavigate();
    function submitHandler(e)
    {
        e.preventDefault();
        // console.log("Login formData==>",formData);
        dispatch(login(formData.email,formData.password,navigate));
    }
    const [password,setPassword]=useState(true);
    return (
        <form action="" className="text-white mt-12 flex flex-col gap-8" onSubmit={submitHandler}>
            <div className="flex flex-col gap-1">
                <label 
                    htmlFor="email"
                    className="text-gray-200">
                        Email Address<span className="text-red-600">*</span>
                </label>
                <input
                    type="email" 
                    placeholder="Enter email address"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
            </div>
            <div className="relative flex flex-col gap-1">
                <label 
                    htmlFor="password"
                    className="text-gray-200">
                        Password<span className="text-red-600">*</span>
                </label>
                <input
                    type={`${password ? "password":"text"}`}
                    placeholder="Enter Password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    className="bg-primary-500 text-gray-300 py-3 pl-3 w-[100%] rounded-xl shadow-[1px_2px_4px_#3a3949]"
                />
                <div className="absolute text-gray-300 cursor-pointer top-[2.8rem] right-2">
                    {
                        password
                        ?
                        (<FaEyeSlash onClick={()=> setPassword(false)}/>)
                        :
                        (<FaEye onClick={()=> setPassword(true)}/>) 
                    }
                </div>
                <Link to={'/resetpassword'} className="text-purple-800 self-end cursor-pointer font-medium text-xs"><em>Forgot password</em></Link>
            </div>
            <Authbtn>
                Sign in
            </Authbtn>
        </form>
    )
}