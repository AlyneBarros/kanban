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
  isProcessing,
}) {
  const navigate = useNavigate();
  const currentDate = new Date();
  const datePart = currentDate.toLocaleDateString();
  const timePart = currentDate.toLocaleTimeString();

  const handleLogout = () => {
    Cookies.remove("username");
    navigate("/");
  };

  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5);
  const [scrollInterval, setScrollInterval] = useState(null);

  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const [viewEmptyColumns, setViewEmptyColumns] = useState(false); // Estado para controlar a visualização de colunas vazias

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const toggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);
  };

  const handleSetScrollSpeed = (speed) => {
    setScrollSpeed(speed);
  };

  const handleChangeSizes = (cardWidth, columnWidth, containerHeight) => {
    setCustomSizes(cardWidth, columnWidth, containerHeight);
  };

  useEffect(() => {
    let intervalId;
    if (autoScrollEnabled) {
      intervalId = setInterval(scrollContainerHorizontal, 1000 / scrollSpeed);
    }
    return () => clearInterval(intervalId);
  }, [autoScrollEnabled, scrollSpeed]);

  const scrollContainerHorizontal = () => {
    const container = document.getElementById("scroll-container");
    if (container) {
      container.scrollLeft += 5; // Ajuste a quantidade de rolagem conforme necessário
    }
  };

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
              Ultima atualização:
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
                <span className="text-sl text-gray-600 dark:text-gray-300 ml-1">
                  {uniqueOrderCount} ordens
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sl text-green-500 ml-1">
                  {startedOrderCount} Operações iniciadas
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sl text-orange-500 ml-1">
                  {waitingOrderCount} Operações em espera
                </span>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
            <button onClick={onRefresh} className="  h-8 w-8 mr-4">
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
                <Menu.Items className="absolute right-0 mt-2  min-h-screen  w-72 origin-top-right bg-white dark:bg-[#2b2c37] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                        className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                      >
                        Média (Padrão)
                      </button>
                      <button
                        onClick={() =>
                          handleChangeSizes("400px", "400px", "90vh")
                        }
                        className="w-full text-left px-4 py-2 text-sm text-gray-900-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
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
                      {/* <button onClick={setDefaultSizes} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Restaurar Padrão</button> */}

                      {/* Botões para alternar entre a visualização de colunas vazias e não vazias */}
                      <div className="text-xl text-gray-600 dark:text-gray-400 font-semibold">
                        Visualizar Colunas:
                      </div>
                      <button
                        onClick={() => setViewEmptyColumns(false)}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          !viewEmptyColumns
                            ? "text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                            : "text-gray-400"
                        }`}
                      >
                        Apenas com Dados
                      </button>
                      <button
                        onClick={() => setViewEmptyColumns(true)}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          viewEmptyColumns
                            ? "text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
                            : "text-gray-400"
                        }`}
                      >
                        Incluindo Vazias
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                    <button
            onClick={toggleAutoScroll}
            className="text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"
          >
            {autoScrollEnabled ? "Desativar Auto-Scroll" : "Ativar Auto-Scroll"}
          </button>
          {autoScrollEnabled && (
            <input
              type="number"
              min="1"
              max="20"
              value={scrollSpeed}
              onChange={(e) => handleSetScrollSpeed(Number(e.target.value))}
              className="w-16 bg-gray-200 text-gray-700 text-center rounded-md"
            />
                      )}
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

