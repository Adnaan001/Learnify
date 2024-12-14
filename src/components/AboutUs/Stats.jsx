

export const StatsSection=()=>{

    const statsData=[
        {
            label:"5K",
            description:"Active Students"
        },
        {
            label:"10+",
            description:"Mentors"
        },
        {
            label:"200+",
            description:"Courses"
        },
        {
            label:"50+",
            description:"Awards"
        }
    ]


    return(
        <div className="bg-primary-300 border-b-2 border-primary-50 my-6">
            <div className="w-11/12 py-16 px-8 flex flex-row mx-auto justify-around">
                {
                    statsData.map((data,index)=>(
                        <div key={index} className="flex flex-col gap-2 items-center">
                            <p className="text-3xl text-white font-bold">
                                {data.label}
                            </p>
                            <p className="text-gray-300">
                                {data.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}