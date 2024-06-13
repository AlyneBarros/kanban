import React, { useState, useEffect, useRef } from "react";
import Task from "./Task";
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import "./RecursoContainer.css";

const RecursoContainer = ({ recurso, orders, cardWidth, autoScrollEnabled, toggleAutoScroll, totalRecursos, descProcesso }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
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

    if (autoScrollEnabled) {
      autoScroll();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [autoScrollEnabled]);

  // Ordena as ordens: iniciadas primeiro, não iniciadas depois
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.Iniciado && !b.Iniciado) return -1;
    if (!a.Iniciado && b.Iniciado) return 1;
    return 0;
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center" onClick={toggleOpen}>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">
          {recurso} ({orders.length})
        </h4>
        <button className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
          {isOpen ? <SlArrowUp /> : <SlArrowDown />}
        </button>
      </div>
      <div
        className={`recurso-container-list ${isOpen ? 'open' : 'closed'}`}
        style={{ maxHeight: isOpen ? (totalRecursos === 1 ? 'none' : '300px') : '100px' }} // Ajusta a altura condicionalmente com base na variável isOpen
        ref={containerRef}
      >
        {isOpen && (
          <div className="gap-y-9 overflow-y-auto">
            {sortedOrders.map((order) => (
              <Task key={order.OrderNumber} 
                order={order} 
                cardWidth={cardWidth} 
                ordersInOtherColumns={orders.filter((o) => o.OrderNumber === order.OrderNumber)}
                processo={descProcesso}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecursoContainer;
