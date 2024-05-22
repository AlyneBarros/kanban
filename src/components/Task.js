import React from 'react';

const Task = ({ order }) => {
  return (
    <div className="kanban-task bg-white rounded-lg shadow-md p-4 mb-4">
      <p className="text-sm font-semibold mb-2">
        OP: {order.OrderNumber} | {order.Lote}
      </p>
      <p className="text-sm text-black-600">
        {order.Material} | {order.Descmaterial} | {order.Quantidade} {order.Unidade}
      </p>
      <p className="text-sm text-black-600">
        {order.Duration} hrs | CheckIn: {order.Hrcheckin}
      </p>
    </div>
  );
};

export default Task;
