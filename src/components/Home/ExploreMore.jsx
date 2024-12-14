import { useState } from "react"
import { HomePageExploreData } from "../../data/homepage-explore"
import { HighlightText } from "./HighlightText";

export const ExploreMore = () => {
    const tabs = [
        "Free",
        "New to coding",
        "Most popular",
        "Skill paths",
        "Career paths"
    ];
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExploreData[currentTab].courses);
    const [currentCourse, setCurrentCourse] = useState(HomePageExploreData[currentTab].courses[0]);
    console.log(currentCourse.lessons);

    return (
        <div className="w-11/12 mx-auto flex flex-col justify-center items-center -mb-[5rem]">
            <div>
                <h3 className="text-white text-4xl text-center">Unlock the <HighlightText text={"Power of Code"} /></h3>
                <br />
                <p className="text-center text-gray-300">Learn to build anything you can imagine</p>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-4 rounded-full p-2 bg-[#1D3359] my-6 transition-all duration-300">
                {tabs.map((tab, index) => (
                    <div key={index} className={`rounded-full px-4 py-2 cursor-pointer transition-all duration-200
                        ${tab === currentTab ? "bg-gradient-to-r from-[#5de0e6] to-[#004aad] text-transparent bg-clip-text font-semibold" : "text-gray-400 hover:text-gray-200 hover:bg-slate-800"}`}
                        onClick={() => {
                            setCurrentTab(tab);
                            setCourses(HomePageExploreData[tab].courses);
                            setCurrentCourse(HomePageExploreData[tab].courses[0]);
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            
            {/* Courses */}
            <div className="flex justify-center flex-wrap gap-8 mt-4">
                {courses.map((course, index) => (
                    <div key={index} className={`p-6 flex flex-col justify-between gap-2 w-full md:w-1/2 lg:w-[22%] cursor-pointer transition-all duration-300 ease-out rounded-md
                        ${course === currentCourse ? "bg-white text-gray-700 shadow-[0_0_15px_rgba(0,74,173,0.4)] scale-105" : "bg-[#1D3359] text-gray-300 hover:bg-[#1A293D]"}`}
                        onClick={() => {
                            setCurrentCourse(course);
                        }}
                    >
                        <h4 className={`text-xl font-bold ${course === currentCourse ? "text-[#004aad]" : "text-gray-100"}`}>
                            {course.heading}
                        </h4>
                        <p>{course.description}</p>
                        <div className="border border-dashed border-gray-400 mt-4"></div>
                        <div className="flex justify-between">
                            <div>{course.level}</div>
                            <div>{course.lessons} Lessons</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


// export const ExploreMore=()=>{
//     const tabs=[
//         "Free",
//         "New to coding",
//         "Most popular",
//         "Skill paths",
//         "Career paths"
//     ]
//     const [currentTab,setCurrentTab]=useState(tabs[0]);
//     const [courses,setCourses]=useState(HomePageExploreData[currentTab].courses);
//     const [currentCourse,setCurrentCourse]=useState(HomePageExploreData[currentTab].courses[0]);
//     console.log(currentCourse.lessons)

//     return(
//         <div className="w-11/12 mx-auto flex flex-col justify-center items-center -mb-[5rem]">
//             <div>
//                 <h3 className="text-white text-4xl text-center">Unlock the <HighlightText text={"Power of Code"}/></h3>
//                 <br />
//                 <p className="text-center text-gray-400">Learn to build anything you can imagine</p>
//             </div>
//             <div className="flex gap-4 rounded-full p-2 bg-slate-800 my-6">
//                 {
//                     tabs.map((tab,index)=>(
//                         <div key={index} className={`rounded-full px-4 py-2 cursor-pointer
//                                                     ${tab===currentTab?"text-gray-200 bg-slate-900"
//                                                             :
//                                                             "text-gray-400 hover:text-gray-200 hover:bg-slate-900"}`}
//                                         onClick={()=>{
//                                             setCurrentTab(tab);
//                                             setCourses(HomePageExploreData[tab].courses)
//                                             setCurrentCourse(HomePageExploreData[tab].courses[0]);
//                                             }}>

//                         {tab}

//                         </div>
//                     ))
//                 }
//             </div>
//             <div className="flex justify-center gap-8 mt-4">
//                 {
//                     courses.map((course,index)=>(
//                         <div key={index} className={`p-6 flex flex-col justify-between gap-2 text-gray-400 w-[22%] bg-slate-800 cursor-pointer transition-all duration-700 ease-out rounded-md
//                                                             ${course===currentCourse && "bg-white text-gray-950 shadow-[10px_10px_4px_#256a9a]"}`}
//                                         onClick={()=>{
//                                             setCurrentCourse(course);
//                                         }}>

//                             <h4 className={`text-gray-200 text-xl font-bold ${course===currentCourse && "text-gray-950"}`}>{course.heading}</h4>
//                             <p>{course.description}</p>
//                             <div className="border border-dashed border-gray-400 mt-4"></div>
//                             <div className="flex justify-between">
//                                 <div>
//                                     {course.level}
//                                 </div>
//                                 <div>
//                                     {course.lessons} Lessons
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }