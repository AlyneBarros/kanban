import React, { useState, useEffect, useRef } from "react";
import ColumnHeader from './ColumnHeader';
import RecursoContainer from './RecursoContainer';
import "./Column.css";

const Column = ({ descProcesso, orders, cardWidth, columnWidth, containerHeight }) => {
  const isEmpty = orders.length === 0;
  const columnContainerRef = useRef(null);
  const groupedOrdersByRecurso = orders.reduce((acc, order) => {
    if (!acc[order.Recurso]) {
      acc[order.Recurso] = [];
    }
    acc[order.Recurso].push(order);
    return acc;
  }, {});

  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
 

  const toggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);
  };

  useEffect(() => {
    if (autoScrollEnabled) {
      const container = columnContainerRef.current;
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
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4" style={{ width: columnWidth, maxHeight: containerHeight }} ref={columnContainerRef}>
      <ColumnHeader descProcesso={descProcesso} totalOrders={orders.length} />
      <div className="column-list max-h-[calc(100%-3.5rem)]">
        {isEmpty ? (
          <p className="text-gray-900 dark:text-gray-100">Nenhuma ordem disponível</p>
        ) : (
          <div className="flex flex-col gap-4">
            {Object.keys(groupedOrdersByRecurso).map((recurso, index) => (
              <RecursoContainer
                key={index}
                recurso={recurso}
                orders={groupedOrdersByRecurso[recurso]}
                cardWidth={cardWidth}
                autoScrollEnabled={autoScrollEnabled}
                toggleAutoScroll={toggleAutoScroll}
                scrollContainerRef={columnContainerRef} // Passando a referência do contêiner de rolagem
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
