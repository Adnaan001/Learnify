import { Link, matchPath, useLocation } from "react-router-dom"
import DashboardData from "../../data/dashboard-data"
import * as ICON from "react-icons/fa"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { IoSettings } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { logout } from "../../services/operations/Authapis";

export const Sidebar=()=>{
    // console.log("icon is==>",ICON["FiUser"])
    const {user}=useSelector((state)=>state.profile);
    // console.log("user.accountype==>",user.accountType);
    const location=useLocation();
    const [logoutModal,setLogoutModal]=useState(false);

    function matchRoute(route){
        return matchPath({path:route},location.pathname);
    }

    const dispatch=useDispatch();
    const navigate=useNavigate();

    return(
        <div>
            <div className="flex flex-col mt-12">
                {
                    DashboardData.map((data,index)=>{
                        const IconComponent=ICON[data.icon];
                        
                        return(
                                (data.accountType===user.accountType || data.accountType==="All")
                                &&
                                <Link key={index} to={data.to}>
                                <div className={`flex items-center select-none gap-2 pl-4 py-2 ${matchRoute(data.to) && "bg-[#3b83f6] font-medium border-l-8 text-primary-700 border-primary-700"} text-gray-300`}>
                                    {IconComponent && <IconComponent/>}{/* {<ICON[data.icon]/>} */}
                                    <span> {data.name} </span>
                                </div>
                                </Link>
                                
                        )
                        
                    })
                }
            </div>
            <div className="my-4 border-b-[0.1px] mx-4 border-primary-300"></div>
            <Link to={'/dashboard/settings'}>
                <div className={`flex items-center select-none gap-2 pl-4 py-2 ${matchRoute('/dashboard/settings') && "bg-[#3b83f6] font-medium border-l-8 text-primary-700 border-primary-700"} text-gray-300`}>
                        <IoSettings/>
                        Settings
                </div>
            </Link>
            <div 
                className={`flex cursor-pointer select-none items-center gap-2 pl-4 py-2 text-gray-300 ${logoutModal ? "bg-[#3b83f6] font-medium border-l-8 text-primary-700 border-primary-700" : ""}`}
                onClick={()=>setLogoutModal((prev)=>!prev)}
            >
                    <CgLogOut/>
                    Logout
            </div>
            <ConfirmationModal
                setModal={setLogoutModal} 
                Modal={logoutModal}
                text1={"Are You Sure?"}
                text2={"You will be logged out of your account"}
                btn1Text={"Logout"}
                btn2Text={"Cancel"}
                btn1Click={()=>dispatch(logout(navigate))}
            />
        </div>
    )
}