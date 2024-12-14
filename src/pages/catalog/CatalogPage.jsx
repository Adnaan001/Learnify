import { useNavigate, useParams } from "react-router"
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";
import { useState,useEffect } from "react";
import { getCatalogPageDtails } from "../../services/operations/CatalogPageDetails";
import { CourseSlider } from "./CourseSlider";
import { RatingStars } from "../../components/Common/RatingStars";
import { Footer } from "../../components/Footer/Footer";


export const CatalogPage=()=>{

    const params=useParams();
    const navigate=useNavigate();

    const categoryName=params.category.replaceAll("-"," ");
    const titleCaseCategoryName=categoryName.split(" ").map((name)=>name.charAt(0).toUpperCase() + name.slice(1)).join(" ");

    const [categoryDetails,setCategoryDetails]=useState(null);
    const [catalogPageData,setCatalogPageData]=useState(null);

    useEffect(()=>{
        async function fetchallCategories(){
            try{
                const result=await apiConnector("GET",categories.SHOW_ALL_CATEGORIES);
                setCategoryDetails(result.data?.Response.filter((category)=>category.name===titleCaseCategoryName)[0]);
            }catch(e){
                console.error("An error occured while fetching categories from server ERROR==>",e.message);
            }
        }
        fetchallCategories();
    },[categoryName])

    useEffect(()=>{
        async function getCatalogDetails(){
            try{
                if(categoryDetails)
                    {
                        const res=await getCatalogPageDtails(categoryDetails._id);
                        setCatalogPageData(res);
                    }
            }catch(e){
                console.error(e.message)
            }
        }
        getCatalogDetails();
        
    },[categoryDetails])



    return(
        <div>
            <div className="bg-primary-400 p-12">
                {
                    categoryDetails
                    && (
                        <div className="w-11/12 mx-auto">
                            <p className="text-gray-400">
                                Home/Catalog
                                <span 
                                    className="bg-gradient-to-r from-[#5de0e6] to-[#4a92f0] text-transparent bg-clip-text"
                                >
                                    /{titleCaseCategoryName}
                                </span>
                            </p>
                            <p className="text-white text-4xl my-2">{categoryName.toUpperCase()}</p>
                            <p className="text-gray-400">{categoryDetails.description}</p>
                        </div>
                    )
                }
            </div>
            {
                catalogPageData
                && (
                    <div className="w-11/12 mx-auto p-12">
                        <div> 
                            <p className="text-white text-4xl font-bold">Courses to get you started</p>
                            <CourseSlider categoryData={catalogPageData.selectedCategoryRes}/>
                        </div>
                        <div>
                            <p className="text-white text-4xl font-bold">Top courses in {catalogPageData.randomCategoryRes.name}</p>
                            <CourseSlider categoryData={catalogPageData.randomCategoryRes}/>
                        </div>
                        <div>
                            <p className="text-white text-4xl font-bold">Frequently Bought</p>
                            <div className="grid grid-cols-2 gap-4">
                                {
                                    catalogPageData.mostSellingCourses.map((course)=>(
                                        <div 
                                            className="flex flex-col text-white gap-4 my-12 cursor-pointer" 
                                            key={course._id}
                                            onClick={()=>navigate(`/course/${course._id}`)}
                                        >
                                            <img src={course.thumbnail} alt="Thumbnail" className="object-cover w-[80%] h-[80%] mb-6" />
                                            <p className="text-lg font-semibold">{course.title}</p>
                                            <div className="flex items-end">
                                                <RatingStars courseId={course._id} className={"text-secondary-500"} ratingLength={course?.ratingAndReview.length}/>
                                                {/* <p className="text-gray-400 text-sm ml-2">{course?.ratingAndReview.length} Ratings</p> */}
                                            </div>
                                            <p>Rs. {course.price}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer/>
        </div>
    )
}