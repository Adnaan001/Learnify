import { Link, matchPath,useLocation} from "react-router-dom"
import logo from "../../assets/Logo/Learnify.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useSelector,useDispatch } from "react-redux";
import { IoIosCart } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";
import { useEffect, useState } from "react";
import { logout } from "../../services/operations/Authapis";
import { useNavigate } from "react-router-dom";

export default function Nav(){
    const [loading,setLoading]=useState(false);
    const [subLinks,setSubLinks]=useState([]);

    async function fetchSubLinks(){
        try{
            setLoading(true);

            const result=await apiConnector("GET",categories.SHOW_ALL_CATEGORIES);
            setSubLinks(result.data?.Response);
            // console.log("sublinks==>",subLinks);

            setLoading(false);
        }catch(e)
        {
            console.error("An error occured while fetching categories from server ERROR==>",e.message);
        }
    }

    useEffect(()=>{
        fetchSubLinks();
    },[])

    const location=useLocation();
    function matchRoute(route)
    {
        return matchPath({path:route},`/${location.pathname.split('/').at(1)}`)
    }

    const {token}=useSelector((state)=>state.auth);
    // console.log("token==>",token);
    const {user}=useSelector((state)=>state.profile);
    // console.log('user==>',user);
    const {totalItems}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    // bg-slate-800

    return (
        <div className="border-b border-[#485771b0] bg-primary-400">
            <div className="w-11/12 mx-auto flex justify-between py-4 px-4 text-white items-center">
                {/* Logo */}
                <Link to={'/'}>
                    <img src={logo} alt="LOGO" width={120} />
                </Link>
                
                {/* Navbar Links */}
                <ul className="flex gap-4 items-center">
                    {NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {link.name === "Catalog" ? (
                                <div className={`flex items-center select-none relative group cursor-pointer ${matchRoute("catalog") ? "bg-gradient-to-r from-[#5de0e6] to-[#004aad] text-transparent bg-clip-text" : "text-white"}`}>
                                    Catalog
                                    <MdKeyboardArrowDown color="white" />
                                    <div className="hidden group-hover:block transition-all duration-100">
                                        <div className="bg-sky-100 w-6 h-6 rounded-sm rotate-45 absolute top-7 left-12" />
                                        <div className="absolute top-[1rem] left-[-10rem] min-w-[300px] z-50">
                                            <div className="bg-[#1A293D] rounded-md text-gray-200 font-semibold p-2 mt-4">
                                                {loading ? (
                                                    <div className="p-1 m-2">Loading....</div>
                                                ) : (
                                                    subLinks.map((sublink, index) => (
                                                        <Link key={index} to={`/catalog/${sublink?.name.replaceAll(" ","-").toLowerCase()}`}>
                                                            <p className="p-1 hover:bg-[#233B5D] rounded-md m-2 select-none">{sublink?.name}</p>
                                                        </Link>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link to={link?.path} className={`${matchRoute(link?.path) ? "bg-gradient-to-r from-[#5de0e6] to-[#004aad] text-transparent bg-clip-text" : "text-white"} select-none hover:text-gray-300`}>
                                    {link.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
    
                {/* Right Section */}
                <div className="flex gap-4 items-center">
                    {user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className="relative">
                            <IoIosCart size={25} />
                            {totalItems > 0 && (
                                <div className="absolute top-[-0.5rem] right-[-0.3rem] bg-gradient-to-r from-[#5de0e6] to-[#004aad] rounded-full py-[2px] px-1 text-xs animate-bounce">{totalItems}</div>
                            )}
                        </Link>
                    )}
                    {token === null && (
                        <>
                            <Link to={"/login"}>
                                <button className="py-2 px-5 border border-[#485771b0] rounded-2xl hover:bg-[#0A1A3E]">
                                    Login
                                </button>
                            </Link>
                            <Link to={"/signup"}>
                                <button className="py-2 px-5 border border-[#485771b0] rounded-2xl hover:bg-[#0A1A3E]">
                                    Sign up
                                </button>
                            </Link>
                        </>
                    )}
                    {token !== null && (
                        <div className="relative group">
                            <img src={user?.image} alt="profile" className=" aspect-square object-cover rounded-full cursor-pointer" width={35} />
                            <div className="hidden group-hover:block">
                                <div className="bg-sky-100 w-6 h-6 rotate-45 absolute top-[2.5rem] right-0" />
                                <div className="absolute top-[1.5rem] right-[-0.3rem] z-50">
                                    <div className="min-w-[150px] bg-[#1A293D] rounded-md text-gray-200 font-semibold p-2 mt-4">
                                        <Link to={'/dashboard/my-profile'}>
                                            <p className="p-1 hover:bg-[#233B5D] rounded-md m-2">Dashboard</p>
                                        </Link>
                                        <div className="p-1 hover:bg-[#233B5D] rounded-md m-2 cursor-pointer" onClick={() => { dispatch(logout(navigate)) }}>
                                            Logout
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
    // return (
    //     <div className=" border border-l-0 border-r-0 border-t-0 border-[#485771b0] bg-[#1D3359]">
    //         <div className="w-11/12 mx-auto flex justify-between pt-4 pb-2 px-4 text-white items-center">
    //             <Link to={'/'}>
    //                 <img src={logo} alt="LOGO" width={120} />
    //             </Link>
    //             <ul className="flex gap-4 items-center">
    //                 {
    //                     NavbarLinks.map((link,index)=>(
    //                         <li key={index}>
    //                             {
    //                                 link.name==="Catalog" 
    //                                 ?
    //                                 (
    //                                     <div className={`flex items-center relative group cursor-pointer ${matchRoute("catalog") ? "bg-gradient-to-r from-[#5de0e6] to-[#004aad] text-transparent bg-clip-text":"text-white"}`}>
    //                                         Catalog
    //                                         <MdKeyboardArrowDown color="white"/>
    //                                         <div className="hidden group-hover:block transition-all duration-100">
    //                                             <div className="bg-sky-100 w-6 h-6 rounded-sm rotate-45 absolute top-7 left-12"/>
    //                                             <div className="absolute top-[1rem] left-[-10rem] min-w-[300px] z-50">
    //                                                 <div className=" bg-sky-200 rounded-md text-sky-950 font-semibold p-2 mt-4">
    //                                                     {
    //                                                         loading?
    //                                                         (
    //                                                             <div className="p-1 m-2">
    //                                                                 Loading....
    //                                                             </div>
    //                                                         )
    //                                                         :
    //                                                         (
    //                                                             subLinks.map((sublink,index)=>(
    //                                                                 <Link key={index} to={`/catalog/${sublink?.name}`}>
    //                                                                     <p className="p-1 hover:bg-sky-300 rounded-md m-2">{sublink?.name}</p>
    //                                                                 </Link>
    //                                                             ))
    //                                                         )
    //                                                     }
    //                                                 </div>                                                            
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 )
    //                                 :
    //                                 (
    //                                     <Link to={link?.path} className={`${matchRoute(link?.path) ? "bg-gradient-to-r from-[#5de0e6] to-[#004aad] text-transparent bg-clip-text":"text-white"}`}>
    //                                             {link.name}
    //                                     </Link>
    //                                 )
    //                             }
    //                         </li>
    //                     ))
    //                 }
    //             </ul>
    //             <div className="flex gap-4 items-center">
    //                 {
    //                     user && user?.accountType!="Instructor"
    //                     &&
    //                     <Link to={"/dashboard/cart"} className="relative">
    //                         <IoIosCart size={25}/>
    //                         {
    //                             totalItems>0
    //                             &&
    //                             <div className="absolute top-[-0.5rem] right-[-0.3rem] bg-gradient-to-r from-[#5de0e6] to-[#004aad] rounded-full px-[6px] font-bold text-sm animate-bounce">{totalItems}</div>
    //                         }
    //                     </Link>
    //                 }
    //                 {
    //                     token===null
    //                     &&
    //                     <Link to={"/login"}>
    //                         <button className="py-2 px-5 border border-[#485771b0] rounded-2xl hover:bg-slate-900">
    //                             Login
    //                         </button>
    //                     </Link>
    //                 }
    //                 {
    //                     token===null
    //                     &&
    //                     <Link to={"/signup"}>
    //                         <button className="py-2 px-5 border border-[#485771b0] rounded-2xl hover:bg-slate-900">
    //                             Sign up
    //                         </button>
    //                     </Link>
    //                 }
    //                 {
    //                     token!==null
    //                     &&
    //                     <div className="relative group">
    //                         <img src={user?.image} alt="profile" className="rounded-full cursor-pointer" width={35}/>
    //                         <div className="hidden group-hover:block">
    //                             <div className="bg-sky-100 w-6 h-6 rotate-45 absolute top-[2.5rem] right-0"/>
    //                             <div className="absolute top-[1.5rem] right-[-0.3rem] z-50">
    //                                 <div className=" min-w-[150px] bg-sky-200 rounded-md text-sky-950 font-semibold p-2 mt-4">
    //                                     <Link to={'/dashboard'}>
    //                                         <p  className="p-1 hover:bg-sky-300 rounded-md m-2">Dashboard</p>
    //                                     </Link>
    //                                     <div className="p-1 hover:bg-sky-300 rounded-md m-2 cursor-pointer" onClick={()=>{dispatch(logout(navigate))}}>
    //                                         Logout
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // )
}