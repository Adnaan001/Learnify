const Category=require('../models/category');


exports.createCategory=async (req,res)=>{
    try{
        const {name,description}=req.body;

        const response=await Category.create(
            {
                name,
                description
            }
        );

        return res.status(200).json(
            {
                success:true,
                message:"Entry created Succesfully",
                response:response
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured during category DB entry",
                Error:e.message
            }
        )
    }
}

exports.showAllCategories=async (req,res)=>{
    try{
        const response=await Category.find({});

        return res.status(200).json(
            {
                success:true,
                Response:response
            }
        )
    }catch(e)     
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error ocuured while fetcing all categories list",
                Error:e.message
            }
        )
    }
}

exports.getCategoryDetails=async (req,res)=>{
    try{
        const {categoryId}=req.body;
        const selectedCategoryRes=await Category.findById(categoryId).populate({
            path:"courses",
            match:{ status:"Published"}
        });
        // console.log("selectedCategory==>",selectedCategoryRes);

        if(!selectedCategoryRes)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Category does not exists"
                }
            )
        }


        // ***********------------------------------------------*********************
        const otherCategories=await Category.find({_id:{$ne:categoryId}});
        var randomCategory=null;
        if(otherCategories.length>0)
            randomCategory=await Category.findById(otherCategories[Math.floor(Math.random() * otherCategories.length)])
            .populate({
                path:"courses",
                match:{ status:"Published"}
            });
        // ***************--------------------------------------************************

        // **************************----------------**************
        const allCategories=await Category.find().populate({
            path:"courses",
            match:{ status:"Published" }
        })

        const allCourses=allCategories.flatMap((category)=>category.courses)
        const mostSellingCourses=allCourses.sort((a,b)=>b.sold-a.sold).slice(0,10);
        // **********************-------------------***************


        return res.status(200).json({
            success:true,
            message:"success",
            selectedCategoryRes:selectedCategoryRes,
            randomCategoryRes:randomCategory || "No other category to pick",
            mostSellingCourses:mostSellingCourses
        })

    }catch(e){
        return res.status(400).json(
            {
                success:false,
                message:"Some Error occured while fetching category details",
                ERROR:e.message
            }
        )
    }
}