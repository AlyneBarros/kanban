import React, { useState, useEffect, useRef } from "react";
import Task from "./Task";
import "./RecursoContainer.css";

const RecursoContainer = ({ recurso, orders, cardWidth, autoScrollEnabled, toggleAutoScroll, scrollContainerRef }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (autoScrollEnabled) {
      const container = containerRef.current;
      let animationFrameId;

      const autoScroll = () => {
        if (container) {
          container.scrollTop += 1;

          if (container.scrollTop >= container.scrollHeight - container.clientHeight || container.scrollTop <= 0) {
            container.scrollTop = 0;
          }

          animationFrameId = requestAnimationFrame(autoScroll);
        }
      };

      autoScroll();
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [autoScrollEnabled]);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 overflow-hidden" ref={containerRef}>
      <div className="flex justify-between items-center" style={{ cursor: "ns-resize" }} onClick={toggleOpen}>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
          {recurso} ({orders.length})
        </h4>
        <button className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
          {isOpen ? "^" : "<"}
        </button>
      </div>
      <div className="recurso-container-list" style={{ maxHeight: isOpen ? '300px' : '0', overflowY: 'auto' }} ref={scrollContainerRef}>
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
