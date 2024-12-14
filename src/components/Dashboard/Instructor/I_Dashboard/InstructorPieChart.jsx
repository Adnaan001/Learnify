import { Chart, registerables} from "chart.js"
import { useState } from "react";
import { Pie} from "react-chartjs-2"

Chart.register(...registerables);

export const InstructorPieChart=({instructorStats})=>{

    const [current,setCurrent]=useState("students");

    function getRandomColors(numColors){
        const colors=[];
        for(let i=0;i<numColors;i++)
        {
            const color=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

            colors.push(color);
        }

        return colors;
    }

    const chartDataForStudents={
        labels:instructorStats.map((course)=>course.courseName),
        datasets:[
            {
                label:" Students",
                data: instructorStats.map((course)=>course.totalStudents),
                backgroundColor: getRandomColors(instructorStats.length)
            }
        ]
    }

    const chartDataForIncome={
        labels:instructorStats.map((course)=>course.courseName),
        datasets:[
            {
                label:" ₹",
                data: instructorStats.map((course)=>course.totalIncome),
                backgroundColor: getRandomColors(instructorStats.length)
            }
        ]
    }

    return(
        <div className="flex flex-col gap-4 p-4 w-[60%] rounded-md bg-primary-600 border border-primary-400 shadow-md">
            <h3 className="text-white font-semibold">Visualize</h3>
            <div className="flex gap-4">
                <p
                    onClick={()=>setCurrent("students")}
                    className={`cursor-pointer text-[#2563EB] p-2 rounded-md ${current==="students" ? "opacity-100 bg-primary-700 shadow-sm" : "text-opacity-50"}`}
                >
                    Students
                </p>

                <p
                    onClick={()=>setCurrent("income")}
                    className={`cursor-pointer text-[#2563EB] p-2 rounded-md ${current==="income" ? "opacity-100 bg-primary-700 shadow-sm" : "text-opacity-50 "}`}
                >
                    Income
                </p>
            </div>
            <Pie
                data={current==="students" ? chartDataForStudents : chartDataForIncome}
            />
        </div>
    )
}