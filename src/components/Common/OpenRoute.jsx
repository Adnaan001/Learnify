import { useSelector } from "react-redux"
import { Navigate} from "react-router";


export const OpenRoute=({children})=>{
    const {token}=useSelector((state)=>state.auth);

    return token ? <Navigate to={'/dashboard/my-profile'}/>:children;
}   