// SidebarConfigurations.js

import React from 'react';
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import {
  Disclosure,
  Menu,
  Transition,
} from '@headlessui/react';
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function SidebarConfigurations({ darkSide, toggleDarkMode, handleChangeSizes, setDefaultSizes, handleToggleAutoScroll, handleSetScrollSpeed, autoScrollEnabled, scrollSpeed, handleLogout }) {
  return (
    <div className="sidebar-configurations">
      <div className="dark-mode-toggle">
        <Switch
          checked={darkSide}
          onChange={toggleDarkMode}
          className={`${darkSide ? 'bg-gray-500' : 'bg-gray-800'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Toggle Dark Mode</span>
          <span className={`inline-block h-4 w-4 transform rounded-full transition ${darkSide ? 'translate-x-6' : 'translate-x-1'}`}>
            {darkSide ? <MdOutlineLightMode className="text-white" /> : <MdDarkMode className="text-yellow-500" />}
          </span>
        </Switch>
      </div>
      <div className="p-5 space-y-2">
        <div className="flex justify-center space-x-4 items-center">
          <button onClick={handleLogout} className="text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">
            <FaUserCircle className={`h-8 w-8 ${darkSide ? 'text-white' : 'text-gray-600'}`} />
            Logout
          </button>
          {/* Aqui você pode adicionar mais opções de configuração conforme necessário */}
        </div>
        <div className="p-2 space-y-2">
          <div className="text-xl text-gray-600 dark:text-gray-400 font-semibold">Tamanho das Colunas:</div>
          <button onClick={() => handleChangeSizes("300px", "300px", "80vh")} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Coluna Pequena</button>
          {/* Mais botões para alterar o tamanho das colunas */}
          <button onClick={setDefaultSizes} className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">Restaurar Padrão</button>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleToggleAutoScroll} className="text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300">
            {autoScrollEnabled ? 'Desativar Rolagem Automática' : 'Ativar Rolagem Automática'}
          </button>
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Velocidade:</span>
            <select
              value={scrollSpeed}
              onChange={(e) => handleSetScrollSpeed(parseInt(e.target.value))}
              className="text-sm text-gray-900 dark:text-gray-300"
            >
              <option value={1}>Lenta</option>
              <option value={5}>Média</option>
              <option value={10}>Rápida</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarConfigurations;
