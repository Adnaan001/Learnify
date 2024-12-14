import { Link } from "react-router-dom";

export const Dbtn = ({ children, active, extra, className, onClick, type}) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      <div
        className={` rounded-md px-4 py-2 text-center ${
          extra && "flex items-center gap-2"
        } font-medium hover:scale-95 cursor-pointer ${
          active
            ? "bg-gradient-to-r text-white hover:text-black from-[#3B82F6] to-[#2563EB] shadow-[2px_2px_8px_#2563EB] hover:from-[#60A5FA] hover:to-[#3B82F6]"
            : "hover:bg-primary-400 text-gray-200 shadow-[4px_4px_15px_rgba(29,51,89,0.8)] bg-[#2a3e6d]"
        }`}
      >
        {children}
      </div>
    </button>
  );
};