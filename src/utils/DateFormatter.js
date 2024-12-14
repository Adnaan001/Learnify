import dayjs from "dayjs";

export const dateFormater1=(date)=>{
    return dayjs(date).format("MMMM D, YYYY | h:mm A");
}



export function dateFormater2(dateString) {
    const date = new Date(dateString);

    // Format the date to "Month Day, Year"
    const optionsDate = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);

    // Format the time to "Hour:Minute AM/PM"
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

    return `${formattedDate} | ${formattedTime}`;
}
