import React from 'react';
import ColumnHeader from './ColumnHeader';
import RecursoContainer from './RecursoContainer';

const Column = ({ descProcesso, orders, cardWidth, columnWidth, containerHeight }) => {
  const isEmpty = orders.length === 0;
  const groupedOrdersByRecurso = orders.reduce((acc, order) => {
    if (!acc[order.Recurso]) {
      acc[order.Recurso] = [];
    }
    acc[order.Recurso].push(order);
    return acc;
  }, {});

  
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4" style={{ width: columnWidth, maxHeight: containerHeight }}>
      <ColumnHeader descProcesso={descProcesso} totalOrders={orders.length} />
      <div className="overflow-y-auto max-h-[calc(100%-3.5rem)] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {isEmpty ? (
          <p className="text-gray-900 dark:text-gray-100">Nenhuma ordem disponível</p>
        ) : (
          <div className="flex flex-col gap-4">
            {Object.keys(groupedOrdersByRecurso).map((recurso, index) => (
              <RecursoContainer key={index} recurso={recurso} orders={groupedOrdersByRecurso[recurso]} cardWidth={cardWidth} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
