import { useEffect, useState } from "react"
import { apiConnector } from "../../services/apiconnector";
import { ratingEndpoints } from "../../services/apis";
import toast from "react-hot-toast";
import { MdOutlineStar, MdOutlineStarHalf, MdOutlineStarBorder } from "react-icons/md";


export const RatingStars=({courseId,className,ratingLength})=>{
    const[average,setAverage]=useState(null);
    const [starCount,setStarCount]=useState({
        full:0,
        half:0,
        empty:0
    });


    useEffect(()=>{
        async function getAvgRating(){
            try{
                const result=await apiConnector("POST",ratingEndpoints.GET_AVG_RATING,{courseId});
                setAverage(result.data?.avgRes[0]?.avgRating)   
            }catch(e){
                toast.error(e.response?.data?.message||e.message);
                console.error("ERROR==>",e.response?.data?.Error);
            }
        }
        getAvgRating();
    },[])

    useEffect(()=>{
        // console.log("average==>",average);
        const wholeStars=average===undefined ? 0 : Math.floor(average);
        // console.log("wholeSatrs==>",wholeStars)
        // console.log("for avg==>",average,"this is==>",Number.isInteger(average));
        setStarCount({
            full:wholeStars,
            half:Number.isInteger(average) || average === undefined ? 0 : 1,
            empty:Number.isInteger(average) || average === undefined ? 5-wholeStars : 4-wholeStars
        })
    },[average])

    // useEffect(()=>{
    //     console.log("starCOunt==>",starCount)
    // },[starCount])

    return(
        <div className={`${className} flex items-center`}>
            <span className="mr-1">{average}</span>
            {[...new Array(starCount.full)].map((_,i)=>(
                <MdOutlineStar key={i} className="inline-block"/>
            ))}

            {[...new Array(starCount.half)].map((_,i)=>(
                <MdOutlineStarHalf key={i} className="inline-block"/>
            ))}

            {[...new Array(starCount.empty)].map((_,i)=>(
                <MdOutlineStarBorder key={i} className="inline-block"/>
            ))}
            
            <p className="text-gray-400 text-sm ml-2">{ratingLength} Ratings</p>

        </div>
    )
}