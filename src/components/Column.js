import React from 'react';
import RecursoContainer from './RecursoContainer';

const Column = ({ descProcesso, orders }) => {
  // Agrupa as ordens por recurso
  const groupedOrdersByRecurso = orders.reduce((acc, order) => {
    if (!acc[order.Recurso]) {
      acc[order.Recurso] = [];
    }
    acc[order.Recurso].push(order);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 dark:bg-gray-800  p-4 rounded-lg shadow-md mb-4 overflow-hidden" style={{ width: '300px' }}>
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-2xl font-bold text-gray-900 dark:text-gray-100">
        {descProcesso}
      </p>
      <div className="flex flex-col gap-4">
        {Object.keys(groupedOrdersByRecurso).map((recurso, index) => (
          <RecursoContainer key={index} recurso={recurso} orders={groupedOrdersByRecurso[recurso]} />
        ))}
      </div>
    </div>
  );
};

export default Column;
