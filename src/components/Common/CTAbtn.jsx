import { Link } from "react-router-dom";

export const CTAbtn = ({ children, active, linkto, extra }) => {
  return (
    <Link to={linkto}>
      <div
        className={`rounded-md py-3 text-center px-6 ${
          extra && "flex items-center gap-2"
        } font-medium hover:scale-95 cursor-pointer ${
          active
            ? "bg-gradient-to-r text-white hover:text-black from-[#3B82F6] to-[#2563EB] shadow-[2px_2px_8px_#2563EB] hover:from-[#60A5FA] hover:to-[#3B82F6]"
            : "bg-primary-400 text-gray-200 shadow-[4px_4px_15px_rgba(29,51,89,0.8)] hover:bg-[#2a3e6d]"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};

