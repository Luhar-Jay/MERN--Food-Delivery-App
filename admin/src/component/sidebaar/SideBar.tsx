import { ClipboardCheck, List, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-1/6 border-[1.5px] border-gray-400 min-h-screen">
      <div className="flex flex-col pt-12 pl-[20%] space-y-4">
        <NavLink
          to={"/add"}
          className="flex items-center gap-3.5 border border-r-0 border-gray-400 rounded-l-md p-3   cursor-pointer   focus:bg-red-200 focus:border-red-600"
        >
          <PlusCircle className="size-6" />
          <span className="hidden md:block">Add Items</span>
        </NavLink>

        <NavLink
          to={"/list"}
          className="flex items-center cursor-pointer rounded-l-md gap-3.5 border border-r-0 border-gray-400 p-3   focus:bg-red-200 focus:border-red-600"
        >
          <List className="size-6" />
          <span className="hidden md:block">List Items</span>
        </NavLink>
        <NavLink
          to={"/order"}
          className="flex items-center cursor-pointer gap-3.5 border rounded-l-md border-r-0 border-gray-400 p-3  focus:bg-red-200 focus:border-red-600"
        >
          <ClipboardCheck className="size-6" />
          <span className="hidden md:block">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
