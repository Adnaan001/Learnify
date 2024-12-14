import { Link } from "react-router-dom"
import { Fdata } from "../../data/footer-links"

export const FooterContent=({name})=>{
    return (
        <div className="flex flex-col gap-2">
            <h6 className="text-white ">{name}</h6>
                {
                    Fdata[name].map((data,index)=>(
                        <p key={index} className="text-sm text-gray-400 hover:text-gray-300">
                            <Link to={data.linkto}>
                                {data.name}
                            </Link>
                        </p>
                        ))
                }
        </div>
    )
}