import { useState } from "react";
import SidebarItem from "../SidebarItem";
import { SidebarConstants } from "../../constants/sidebarConstants";

function Sidebar() {
  const [isSidebarLarge, setIsSidebarLarge] = useState(false);
  const handleEnlargeSidebar = () => {
    setIsSidebarLarge(!isSidebarLarge);
  };
  const sidebarContent = SidebarConstants.map((item) => {
    return (
      <SidebarItem key={item.id} item={item} isSidebarLarge={isSidebarLarge} />
    );
  });

  return (
    <div
      className={`absolute h-full w-12 bg-slate-100 border hover:shadow-lg dark:bg-gray-600 dark:text-white ${
        isSidebarLarge && "w-32 z-50"
      }`}
      onClick={handleEnlargeSidebar}
      onMouseLeave={handleEnlargeSidebar}
    >
      <div className={`text-4xl flex flex-col justify-between cursor-pointer`}>
        {sidebarContent}
      </div>
    </div>
  );
}
export default Sidebar;
