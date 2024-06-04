import React from "react";
import PropTypes from "prop-types";
import { FaBars, FaTimes } from "react-icons/fa";
import classNames from "classnames";
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";

function Sidebar({ isSideBarOpen, setIsSideBarOpen, areas, onAreaClick }) {
  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  const sidebarOpenClasses = classNames(
    "min-w-[261px]",
    "bg-white",
    "dark:bg-[#2b2c37]",
    "fixed",
    "top-0",
    "md:top-[72px]",
    "h-screen",
    "md:left-0",
    "z-20",
    "transition-transform",
    "duration-300",
    {
      "translate-x-0": isSideBarOpen,
      "-translate-x-full": !isSideBarOpen,
    }
  );

  const sidebarClosedClasses = classNames(
    "rounded-r-full",
    "w-[56px]",
    "h-[48px]",
    "flex",
    "items-center",
    "justify-center",
    "fixed",
    "bottom-[32px]",
    "cursor-pointer",
    "duration-300",
    "left-0",
    "md:bottom-auto",
    "md:top-[65px]",
    "z-20"
  );

  const areaItemClasses = (isActive) =>
    classNames(
      "flex",
      "items-center",
      "justify-start",
      "cursor-pointer",
      "space-x-3",
      "w-full",
      "mt-5",
      "px-4",
      "py-2",
      "rounded-r-full",
      {
        "bg-[#635fc7]": isActive,
        "dark:bg-[#635fc7]": isActive,
        "text-white": isActive,
        "text-gray-400": !isActive,
        "hover:bg-[#635fc7]": !isActive,
        "hover:text-white": !isActive,
        "dark:hover:bg-[#635fc7]": !isActive,
        "hover:transition-all": !isActive,
        "duration-300": !isActive,
      }
    );

  return (
    <div>
      <div className={sidebarOpenClasses}>
        <div className="flex flex-col h-full w-full p-4">
          <div
            className="flex items-center justify-start cursor-pointer space-x-3 w-full px-4 py-2 rounded-r-full"
            onClick={toggleSidebar}
          >
            <RiMenu2Fill size={35} className="text-black-600" />
          
          </div>

          <div className="flex-1">
            <p className="uppercase tracking-[2.4px] text-gray-400 font-bold text-[12px] ml-[6px]">
              Todas as Áreas ({areas.length})
            </p>

            {areas.map((area, index) => (
              <div
                key={index}
                onClick={() => onAreaClick(area)}
                className={areaItemClasses(index === 0)}
              >
                <p className="font-bold">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isSideBarOpen && (
        <div className={sidebarClosedClasses} onClick={toggleSidebar}>
          <RiMenu3Fill size={35} className="text-black" />
        </div>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  isSideBarOpen: PropTypes.bool.isRequired,
  setIsSideBarOpen: PropTypes.func.isRequired,
  areas: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAreaClick: PropTypes.func.isRequired,
};

export default Sidebar;
