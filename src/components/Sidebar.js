import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";

import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";

import boardsSlice from "../redux/boardsSlice";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#D22B2B top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full`
        }
      >
        <div>
          {isSideBarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>

              <div className="dropdown-board flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#D22B2B] dark:hover:bg-white dark:hover:text-[#D22B2B] dark:text-white ${
                        board.isActive && "bg-[#D22B2B] rounded-r-full text-white mr-8"
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="filter-white h-4" alt="board icon" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}

                  <div
                    
                  >
  
                  </div>
                </div>

                <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div>
              </div>
            </div>
          )}

          {isSideBarOpen ? (
            <div
              onClick={toggleSidebar}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#D22B2B] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
            >
              <img className="min-w-[20px] bg- [#D22B2B]" src={hideSidebarIcon} alt="hide sidebar icon" />
              <p>Hide Sidebar</p>
            </div>
          ) : (
            <div className="absolute p-5" onClick={toggleSidebar}>
              <img src={showSidebarIcon} alt="show sidebar icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
