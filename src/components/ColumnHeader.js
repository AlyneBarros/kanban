import React from 'react';

const ColumnHeader = ({ descProcesso, totalOrders }) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg shadow-md mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-2xl font-bold text-gray-900 dark:text-gray-100">
      {descProcesso} (ordens: {totalOrders})
    </p>
  </div>
);

export default ColumnHeader;