import React from 'react';
import "./Column.css"

const ColumnHeader = ({ descProcesso, totalOrders }) => (
  <div className="column-list bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg shadow-md mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-2xl font-bold text-gray-900 dark:text-gray-100">
      {descProcesso} ({totalOrders})
    </p>
  </div>
);

export default ColumnHeader;