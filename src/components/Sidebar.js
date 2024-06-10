// Sidebar.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { RxDividerVertical } from "react-icons/rx";
import { BiLeftIndent } from "react-icons/bi";
import classNames from "classnames";
import useDarkMode from "../hooks/useDarkMode";

function Sidebar({ isSideBarOpen, setIsSideBarOpen, areas, onAreaClick }) {
  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
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
    "rounded",
    "w-[56px]",
    "h-[106px]",
    "flex",
    "items-center",
    "justify-center",
    "fixed",
    "top-1/2",
    "transform",
    "-translate-y-1/2",
    "cursor-pointer",
    "duration-300",
    "left-0",
    "z-20",
    "hover:bg-gray-200",
    "dark:hover:bg-gray-700"
  );

  const arrowClasses = classNames(
    "transform",
    "transition-transform",
    {
      "rotate-180": isSideBarOpen,
      "text-black": !darkSide,
      "text-white": darkSide,
    }
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
        "bg-[#b81414]": isActive,
        "dark:bg-[#b81414]": isActive,
        "text-white": isActive,
        "text-gray-400": !isActive,
        "hover:bg-[#ec5353]": !isActive,
        "hover:text-white": !isActive,
        "dark:hover:bg-[#ec5353]": !isActive,
        "hover:transition-all": !isActive,
        "duration-300": !isActive,
      }
    );

  return (
    <div className={`min-h-screen ${isSideBarOpen ? 'w-72' : 'w-16'} duration-500`}>
      <div className={sidebarOpenClasses} aria-expanded={isSideBarOpen} role="navigation">
        <div className="flex flex-col h-full w-full p-4">
          <div
            className="flex items-center justify-end cursor-pointer space-x-3 w-full  py-2 rounded-r-full"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
           <BiLeftIndent size={35} className={darkSide ? "text-white" : "text-gray-500"} />
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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onAreaClick(area); }}
              >
                <p className="font-bold">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isSideBarOpen && (
        <div className={sidebarClosedClasses} onClick={toggleSidebar} aria-label="Open Sidebar">
       <RxDividerVertical size={500} className={` ${darkSide ? 'text-white' : 'text-gray-800'}`}  />

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
  darkSide: PropTypes.bool.isRequired,
};

export default Sidebar;
