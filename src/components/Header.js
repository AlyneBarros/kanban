import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../assets/u_logo.png";
import settingsIcon from "../assets/icons8-settings.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import { Disclosure, Menu, Transition } from "@headlessui/react";
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

          // Verifica se a rolagem atingiu o final da área de rolagem
          const reachedEnd =
            container.scrollLeft >=
            container.scrollWidth - container.clientWidth;
          const reachedStart = container.scrollLeft <= 0;

          if (reachedEnd || reachedStart) {
            // Se atingiu o final, inverte a direção da rolagem
            setScrollDirection(-scrollDirection);
          }

          animationFrameId = requestAnimationFrame(autoScroll);
        }
      };

      autoScroll(); // Inicia a rolagem automática
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [autoScrollEnabled, scrollSpeed, scrollDirection, scrollContainerRef]);

  const [autoScrollVerticalEnabled, setAutoScrollVerticalEnabled] = useState(false);

  const toggleAutoScrollVertical = () => {
    const newValue = !autoScrollVerticalEnabled;
    setAutoScrollVerticalEnabled(newValue);
  
    // Adicione a manipulação da rolagem automática vertical aqui
    if (newValue) {
      // Código para começar a rolagem automática vertical
    } else {
      // Código para parar a rolagem automática vertical
    }
  };
  
  useEffect(() => {
    // Adicione a manipulação da rolagem automática vertical aqui
    if (autoScrollVerticalEnabled) {
      // Código para começar a rolagem automática vertical
    } else {
      // Código para parar a rolagem automática vertical
    }
  }, [autoScrollVerticalEnabled]);
    useEffect(() => {
    const handleAutoScrollVertical = () => {
      const container = scrollContainerRef.current;
      if (container && autoScrollVerticalEnabled) {
        container.scrollTop += 1; // ou qualquer outra lógica de rolagem vertical
      }
    };

    const intervalId = setInterval(handleAutoScrollVertical, 1000); // ajuste o intervalo conforme necessário

    return () => clearInterval(intervalId);
  }, [autoScrollVerticalEnabled, scrollContainerRef]);
  
  useEffect(() => {
    let intervalId;
    if (autoRefreshEnabled) {
      intervalId = setInterval(onRefresh, 30000); // Atualiza a cada 30 segundos
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefreshEnabled, onRefresh]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
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
            <p className=" text-lg text-gray-700 dark:text-gray-300">
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
            <button onClick={onRefresh} className="h-8 w-8 mr-4">
              <RxUpdate
                className={`h-8 w-8 mr-1 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-4">
                <img
                  src={settingsIcon}
                  alt="Settings"
                  className={`h-10 w-10 ${
                    darkSide ? "filter brightness-0 invert" : ""
                  }`}
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 min-h-screen w-72 origin-top-right bg-white dark:bg-[#2b2c37] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-5 space-y-2">
                    <div className="flex justify-center space-x-4 items-center">
                      <button
                        onClick={handleLogout}
                        className="text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        <FaUserCircle
                          className={`h-8 w-8 ${
                            darkSide ? "text-white" : "text-gray-600"
                          }`}
                        />
                        Logout
                      </button>
                      <div className="flex items-center">
                        <Switch
                          checked={darkSide}
                          onChange={toggleDarkMode}
                          className={`${
                            darkSide ? "bg-gray-500" : "bg-gray-800"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Toggle Dark Mode</span>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full transition ${
                              darkSide ? "translate-x-6" : "translate-x-1"
                            }`}
                          >
                            {darkSide ? (
                              <MdOutlineLightMode className="text-white" />
                            ) : (
                              <MdDarkMode className="text-yellow-500" />
                            )}
                          </span>
                        </Switch>
                      </div>
                    </div>
                 
                    <div className="p-2 space-y-2">
                      <div className="text-xl text-gray-600 dark:text-gray-400 font-semibold">
                        Tamanho das Colunas:
                      </div>
                      <button
                        onClick={() =>
                          handleChangeSizes("300px", "300px", "80vh")
                        }
                        className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        Pequena
                      </button>
                      <button
                        onClick={() =>
                          handleChangeSizes("350px", "350px", "89vh")
                        }
                        className="w-full text-left px-4 py-2 text-sm text-gray-900-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        Média (Padrão)
                      </button>
                      <button
                        onClick={() =>
                          handleChangeSizes("400px", "400px", "90vh")
                        }
                        className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        Grande
                      </button>
                      <button
                        onClick={() =>
                          handleChangeSizes("450px", "450px", "95vh")
                        }
                        className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        Extra Grande
                      </button>
                    </div>
                    {/* <div className="flex items-center space-x-4 p-2 space-y-2">
                    <Switch
                            checked={autoScrollVerticalEnabled}
                            onChange={toggleAutoScrollVertical}
                            className={`${
                              autoScrollVerticalEnabled
                                ? "bg-gray-500"
                                : "bg-blue-600"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">Auto Scroll Vertical</span>
                            <span
                              className={`${
                                autoScrollVerticalEnabled
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                            />
                          </Switch>
                          <span className="text-gray-900 dark:text-gray-100">
                            Rolagem automática vertical
                          </span>
                      </div> */}
                   <div className="flex items-center space-x-3 ">
          <Switch
            checked={showAllColumns}
            onChange={setShowAllColumns}
            className={`${
              showAllColumns ? "bg-blue-600" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Show All Columns</span>
            <span
              className={`${
                showAllColumns ? "translate-x-6" : "translate-x-1"
              } inline-block h-5 w-5 rounded-full bg-white shadow-sm transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mostrar todas as colunas</span>
        </div>
        <div className="flex items-center space-x-3">
          <Switch
            checked={autoRefreshEnabled}
            onChange={onToggleAutoRefresh}
            className={`${
              autoRefreshEnabled ? "bg-blue-600" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Auto Refresh</span>
            <span
              className={`${
                autoRefreshEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-5 w-5 rounded-full bg-white shadow-sm transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Atualização automática</span>
        </div>
        <div className="flex items-center space-x-3">
          <Switch
            checked={autoScrollEnabled}
            onChange={toggleAutoScroll}
            className={`${
              autoScrollEnabled ? "bg-blue-600" : "bg-gray-400"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Auto Scroll</span>
            <span
              className={`${
                autoScrollEnabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-5 w-5 rounded-full bg-white shadow-sm transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rolagem automática</span>
        </div>
        <div className="flex items-center space-x-3">
          <label
            htmlFor="scrollSpeed"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{scrollSpeed}</span>
        
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
      </div>
    </Disclosure>
  );
}

export default Header;
