import { Outlet } from "react-router"
import { Sidebar } from "../../components/Dashboard/Sidebar"

export const Dashboard=()=>{
    return(
        <div className="flex gap-4">
            <div className="min-w-[15%] min-h-screen bg-primary-400 border-r-2 border-primary-100">
                <Sidebar/>
            </div>
            <div className="w-[80%]">
                <Outlet/>
            </div>
        </div>
    )
}