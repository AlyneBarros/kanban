import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../assets/u_logo.png";
import settingsIcon from "../assets/icons8-settings.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import { Disclosure, Transition } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

function Header({
  uniqueOrderCount,
  startedOrderCount,
  waitingOrderCount,
  setCustomSizes,
  setDefaultSizes,
  defaultSizes,
  genomTitle,
  areaTitle,
  onRefresh,
  lastUpdated,
  loading,
  scrollContainerRef,
  showAllColumns,
  setShowAllColumns,
  onToggleAutoScroll,
  autoRefreshEnabled,
  onToggleAutoRefresh,
  fetchOrdemColunas,

}) {
  const navigate = useNavigate();
  const currentDate = new Date();
  const datePart = currentDate.toLocaleDateString();
  const timePart = currentDate.toLocaleTimeString();

  const handleLogout = () => {
    Cookies.remove("username");
    navigate("/");
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [scrollDirection, setScrollDirection] = useState(1);

  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const toggleAutoScroll = () => {
    const newValue = !autoScrollEnabled;
    setAutoScrollEnabled(newValue);
    onToggleAutoScroll(newValue);
  };

  const handleSetScrollSpeed = (speed) => {
    setScrollSpeed(parseInt(speed, 10));
  };

  const handleChangeSizes = (cardWidth, columnWidth, containerHeight) => {
    setCustomSizes(cardWidth, columnWidth, containerHeight);
  };

  useEffect(() => {
    if (autoScrollEnabled) {
      const container = scrollContainerRef.current;
      let animationFrameId;

      const autoScroll = () => {
        if (container) {
          container.scrollLeft += scrollSpeed * scrollDirection;

          const reachedEnd =
            container.scrollLeft >=
            container.scrollWidth - container.clientWidth;
          const reachedStart = container.scrollLeft <= 0;

          if (reachedEnd || reachedStart) {
            setScrollDirection(-scrollDirection);
          }

          animationFrameId = requestAnimationFrame(autoScroll);
        }
      };

      autoScroll();
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [autoScrollEnabled, scrollSpeed, scrollDirection, scrollContainerRef]);

  useEffect(() => {
    let intervalId;
    if (autoRefreshEnabled) {
      intervalId = setInterval(() => {
        onRefresh();
        fetchOrdemColunas();
      }, 30000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefreshEnabled, onRefresh, fetchOrdemColunas]);
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

   return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="p-4 fixed left-0 right-0 top-0 bg-white dark:bg-[#2b2c37] z-50">
        <header className="flex justify-between dark:text-white items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={Logo} alt="Logo" className="h-8 w-8" />
            <h3 className="md:text-4xl hidden md:inline-block font-bold font-sans">
              {genomTitle}
            </h3>
            <div className="flex items-center">
              <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
                {areaTitle}
              </h3>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-2">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Última atualização:
            </p>

            <div className="flex items-start flex-col">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Data: {datePart}
              </p>
              <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Hora: {timePart}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {uniqueOrderCount} ordens
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-green-500">
                {startedOrderCount} Operações iniciadas
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-orange-500">
                {waitingOrderCount} Operações em espera
              </span>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
          <button onClick={() => { onRefresh(); fetchOrdemColunas(); }} className="h-8 w-8">
  <RxUpdate className={`h-8 w-8 mr-1 ${loading ? "animate-spin" : ""}`} />
</button>
            <button onClick={toggleSidebar} className="h-10 w-10 mr-4">
              <img
                src={settingsIcon}
                alt="Settings"
                className={`h-10 w-10 ${
                  darkSide ? "filter brightness-0 invert" : ""
                }`}
              />
            </button>
          </div>
        </header>
      </div>
      <div className="mt-[72px]"></div>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transform transition ease-in-out duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-[#2b2c37] shadow-lg z-40">
          <div className="p-9 space-y-8 h-full">
            <button onClick={toggleSidebar} className="text-gray-900 dark:text-gray-300">
              Close
            </button>
            <div className="flex justify-between items-center">
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
              >
                <FaUserCircle
                  className={`h-8 w-8 ${
                    darkSide ? "text-white" : "text-gray-600"
                  }`}
                />
                <span className="ml-2 text-base">Logout</span>
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-xl text-gray-600 dark:text-gray-300 font-semibold">
                Tamanho das Colunas:
              </div>
              <button
                onClick={() => handleChangeSizes("300px", "300px", "80vh")}
                className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
              >
                Pequena
              </button>
              <button
                onClick={() => handleChangeSizes("350px", "350px", "89vh")}
                className="w-full text-left px-4 py-2 text-sm text-gray-900-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
              >
                Média (Padrão)
              </button>
              <button
                onClick={() => handleChangeSizes("500px", "500px", "130vh")}
                className="w-full text-left px-4 py-2 text-sm text-gray-900-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
              >
                Grande
              </button>
              <button
                onClick={() => handleChangeSizes("1100px", "1100px", "170vh")}
                className="w-full text-left px-4 py-2 text-sm text-gray-900-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
              >
                Muito Grande
              </button>
              <button
                onClick={setDefaultSizes}
                className="w-full text-left px-4 py-2 text-sm text-gray-900-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
              >
                Padrão
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-base text-gray-900 dark:text-gray-300">Mostrar todas as colunas</div>
              <Switch
                checked={showAllColumns}
                onChange={setShowAllColumns}
                className={`${
                  showAllColumns ? "bg-blue-700" : "bg-gray-400 dark:bg-gray-700"
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span
                  className={`${
                    showAllColumns ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-base text-gray-900 dark:text-gray-300">Atualização automática</div>
              <Switch
                checked={autoRefreshEnabled}
                onChange={onToggleAutoRefresh}
                className={`${
                  autoRefreshEnabled ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-700"
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span
                  className={`${
                    autoRefreshEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 rounded-full transform bg-white rounded-full`}
                />
              </Switch>
            </div>
            <div className="flex justify-between items-center">
            <div className="text-base text-gray-900 dark:text-gray-300"> Rolagem automática</div>
 
  <Switch
    checked={autoScrollEnabled}
    onChange={toggleAutoScroll}
    className={`${
      autoScrollEnabled ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-700"
    }  relative inline-flex items-center h-6 rounded-full w-11`}
  >
    <span className="sr-only">Auto Scroll</span>
    <span
      className={`${
        autoScrollEnabled ? "translate-x-6" : "translate-x-1"
      } inline-block h-4 w-4 rounded-full bg-white  transform ring-0 transition ease-in-out duration-200`}
    />
  </Switch>
</div>
<div className="flex items-center space-x-4">
  <label
    htmlFor="scrollSpeed"
    className="text-base font-medium text-gray-700 dark:text-gray-300"
  >
    Velocidade
  </label>
  <input
    type="range"
    id="scrollSpeed"
    name="scrollSpeed"
    min="1"
    max="10"
    value={scrollSpeed}
    onChange={(e) => handleSetScrollSpeed(e.target.value)}
    className="w-20 bg-gray-200 dark:bg-gray-600"
  />
  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
    {scrollSpeed}
  </span>
</div>


            <div className="flex justify-between items-center">
  <div className="text-sm text-gray-900 dark:text-gray-300 transition-all">
    {darkSide ? "Modo Claro" : "Modo Escuro"}
  </div>
  <Switch
    checked={darkSide}
    onChange={toggleDarkMode}
    className={`${
      darkSide ? "bg-gray-700" : "bg-gray-400 dark:bg-gray-700"
    } relative inline-flex items-center h-6 rounded-full w-11 transition-all`}
  >
    <span className="flex items-center justify-center">
      {darkSide ? (
        <MdOutlineLightMode className={`text-white w-5 h-5 transition-all ${darkSide ? "translate-x-6" : "translate-x-1"}`} />
      ) : (
        <MdDarkMode className={`text-yellow-400 w-5 h-5 transition-all ${darkSide ? "translate-x-6" : "translate-x-1"}`} />
      )}
    </span>
  </Switch>
</div>

          </div>
        </div>
      </Transition>
    </Disclosure>
  );
}

export default Header;