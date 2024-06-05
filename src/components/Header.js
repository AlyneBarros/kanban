import React, { useState } from 'react';
import Logo from "../assets/u_logo.png";
import settingsIcon from "../assets/icons8-settings.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import { Fragment } from 'react'
import {
  Disclosure,
  Menu,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function Header({
  uniqueOrderCount,
  startedOrderCount,
  waitingOrderCount,
  setCustomSizes,
  setDefaultSizes,
  defaultSizes,
  genomTitle,
  areaTitle,
  logout // Function to handle logout
}) {
  
  const handleChangeSizes = (cardWidth, columnWidth, containerHeight) => {
    setCustomSizes(cardWidth, columnWidth, containerHeight);
  };
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "light" ? true : false);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const handleLogout = () => {
    logout(); // Call the logout function passed as prop
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
        <header className="flex justify-between dark:text-white items-center">
          {/* Left Side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={Logo} alt="Logo" className="h-8 w-8" />
            <h3 className="md:text-4xl hidden md:inline-block font-bold font-sans">
              Genom
            </h3>
            <div className="flex items-center">
              <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
                SOLIDOS
              </h3>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex space-x-4 items-center ">
          <div className="flex items-center space-x-4">
  <div className="flex items-center">
    
    <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{uniqueOrderCount} ordens</span>
  </div>
  <div className="flex items-center">
   
    <span className="text-sm text-green-500 ml-1">{startedOrderCount} OP iniciadas</span>
  </div>
  <div className="flex items-center">
   
    <span className="text-sm text-orange-500 ml-1">{waitingOrderCount} OP em espera</span>
  </div>
</div>

            {/* Menu Button */}
            <Menu as="div" className="relative">
  <Menu.Button className="flex items-center space-x-2">
    <img src={settingsIcon} alt="Settings" className="h-8 w-8" />
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
    <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right bg-white dark:bg-[#2b2c37] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="p-2 space-y-2">
        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Tamanho das Colunas:</div>
        <button onClick={() => handleChangeSizes("300px", "300px", "80vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Pequeno</button>
        <button onClick={() => handleChangeSizes("350px", "350px", "87vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Médio (Padrão)</button>
        <button onClick={() => handleChangeSizes("400px", "400px", "90vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Grande</button>
        <button onClick={() => handleChangeSizes("450px", "450px", "95vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Extra Grande</button>
        <button onClick={setDefaultSizes} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Restaurar Padrão</button>
      </div>
      <div className="p-2 space-y-2">
        <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Tamanho dos Cards:</div>
        <button onClick={() => handleChangeSizes("200px", "200px", "80vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Pequeno</button>
        <button onClick={() => handleChangeSizes("250px", "250px", "87vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Médio (Padrão)</button>
        <button onClick={() => handleChangeSizes("300px", "300px", "90vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Grande</button>
        <button onClick={() => handleChangeSizes("350px", "350px", "95vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Tamanho Extra Grande</button>
        <button onClick={setDefaultSizes} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Restaurar Padrão</button>
      </div>
      <div className="p-2">
        <Switch checked={darkSide} onChange={toggleDarkMode} className={`${darkSide ? 'bg-gray-500' : 'bg-gray-800'} relative inline-flex h-6 w-11 items-center rounded-full`} />
        <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold pl-2">Modo Escuro</span>
      </div>
      <div className="p-2">
      
        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300"><FaUserCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />Logout</button>
        
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

