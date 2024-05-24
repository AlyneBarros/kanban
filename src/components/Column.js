import React from 'react';
import RecursoContainer from './RecursoContainer';

const DescProcesso = ({ descProcesso }) => (
  <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-2xl font-bold text-gray-900 dark:text-gray-100">
    {descProcesso}
  </p>
);

const Column = ({ descProcesso, orders }) => {
  const groupedOrdersByRecurso = orders.reduce((acc, order) => {
    if (!acc[order.Recurso]) {
      acc[order.Recurso] = [];
    }
    acc[order.Recurso].push(order);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ width: '350px', maxHeight: "87vh" }}>
      <DescProcesso descProcesso={descProcesso} />
      <div className="flex flex-col gap-4 ">
        {Object.keys(groupedOrdersByRecurso).map((recurso, index) => (
          <div key={index}>
            <RecursoContainer recurso={recurso} orders={groupedOrdersByRecurso[recurso]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
