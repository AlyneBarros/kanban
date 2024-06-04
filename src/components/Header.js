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
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


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
              {genomTitle}
            </h3>
            <div className="flex items-center">
              <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
               {areaTitle}
              </h3>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex space-x-4 items-center ">
            <span className="text-sm text-black-500 md:text-xl">
              {uniqueOrderCount} ordens
            </span>
            <span className="text-sm text-green-500 md:text-xl">
              {startedOrderCount} OP iniciadas
            </span>
            <span className="text-sm text-orange-500 md:text-xl">
              {waitingOrderCount} OP em espera
            </span>

            {/* Menu Button */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2">
                <Bars3Icon className="h-8 w-8" />
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
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-[#2b2c37] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout} // Call handleLogout function for logout
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-800' : ''
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 dark:text-gray-300`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Settings Dropdown */}
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
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-[#2b2c37] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleChangeSizes("300px", "300px", "80vh")}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-800' : ''
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 dark:text-gray-300`}
                        >
                          Tamanho Pequeno
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleChangeSizes("350px", "350px", "87vh")}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-800' : ''
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 dark:text-gray-300`}
                        >
                          Tamanho Médio (Padrão)
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleChangeSizes("400px", "400px", "90vh")}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-800' : ''
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 dark:text-gray-300`}
                        >
                          Tamanho Grande
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={setDefaultSizes}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-800' : ''
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 dark:text-gray-300`}
                        >
                          Restaurar Padrão
                        </button>
                      )}
                    </Menu.Item>
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