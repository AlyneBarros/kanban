import React, { useState } from 'react';
import Task from './Task';

const RecursoContainer = ({ recurso, orders }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4  overflow-hidden ">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">{recurso}</h4>
        <button onClick={toggleOpen} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
          {isOpen ? '▲' : '▼'}
        </button>
      </div>
      <div className={`task-list ${isOpen ? 'overflow-y-auto max-h-80' : 'overflow-hidden'}`}>
        {isOpen && (
          <>
            {orders.map((order, index) => (
              <Task key={index} order={order} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RecursoContainer;
