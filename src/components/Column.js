import React from 'react';
import RecursoContainer from './RecursoContainer';

const DescProcesso = ({ descProcesso, totalOrders }) => (
  <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-2xl font-bold text-gray-900 dark:text-gray-100">
    {descProcesso} (ordens: {totalOrders})
  </p>
);

const Column = ({ descProcesso, orders, cardWidth, columnWidth, containerHeight }) => {
  const isEmpty = orders.length === 0;

  if (isEmpty) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 flex items-center p-4 rounded-lg shadow-md mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ width: columnWidth, maxHeight: containerHeight }}>
        <DescProcesso descProcesso={descProcesso} totalOrders={0} />
      </div>
    );
  }

  // Group orders by Recurso
  const groupedOrdersByRecurso = orders.reduce((acc, order) => {
    if (!acc[order.Recurso]) {
      acc[order.Recurso] = [];
    }
    acc[order.Recurso].push(order);
    return acc;
  }, {});

  // Calculate total number of orders
  const totalOrders = Object.values(groupedOrdersByRecurso).reduce((acc, recursoOrders) => acc + recursoOrders.length, 0);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ width: columnWidth, maxHeight: containerHeight }}>
      <DescProcesso descProcesso={descProcesso} totalOrders={totalOrders} />
      <div className="flex flex-col gap-4">
        {Object.keys(groupedOrdersByRecurso).map((recurso, index) => (
          <div key={index}>
            <RecursoContainer recurso={recurso} orders={groupedOrdersByRecurso[recurso]} cardWidth={cardWidth} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
