import React, { useState, useRef } from "react";
import Task from "./Task";
import "./RecursoContainer.css"

const RecursoContainer = ({ recurso, orders, cardWidth }) => {
  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef(null);
 


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 overflow-hidden"
      ref={containerRef}
    >
      <div
        className="flex justify-between items-center"
        style={{ cursor: "ns-resize" }}
      >
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
          {recurso} ({orders.length})
        </h4>
        <button
          onClick={toggleOpen}
          className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4"
        >
          {isOpen ? "^" : "<"}
        </button>
      </div>
      
<div className="recurso-container-list" style={{ maxHeight: isOpen ? '300px' : '0', overflowY: 'auto' }}>

        {isOpen && (
          <div className="gap-y-9">
            {orders.map((order, index) => (
              <Task key={index} order={order} cardWidth={cardWidth} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecursoContainer;
