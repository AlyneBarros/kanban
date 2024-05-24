import React from 'react';

const Task = ({ order }) => {
  const formatDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) return 'Em espera';

    const dateMilliseconds = parseInt(dateString.match(/\d+/)[0]);
    const date = new Date(dateMilliseconds);

    const time = timeString.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '');
    const [hours, minutes, seconds] = time.split(':').map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date;
  };

  const formattedCheckIn = formatDateTime(order.Dtcheckin, order.Hrcheckin);
  const formattedCheckOut = formatDateTime(order.Dtcheckout, order.Hrcheckout);

  const calculateProductionTime = () => {
    if (!formattedCheckIn) return 'Em espera';

    const now = new Date();
    const diffInMilliseconds = now - formattedCheckIn;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return Math.round(diffInHours) + ' hrs';
  };

  const productionTime = calculateProductionTime();

  const hasCheckIn = formattedCheckIn !== 'Em espera';

  return (
    <div className={`kanban-task bg-white rounded-lg shadow-md p-4 mb-4 mr-4 ${hasCheckIn ? 'border-l-8 border-green-500' : ''}`}>
      <p className="text-sm font-semibold mb-2">
        OP: {order.OrderNumber} | {order.Lote}
      </p>
      <p className="text-sm text-black-600">
        {order.Material} | {order.Descmaterial} | {order.Quantidade} {order.Unidade}
      </p>
      <p className="text-sm text-black-600">
        {order.Duration} hrs: {formattedCheckIn instanceof Date ? productionTime : formattedCheckIn} | CheckIn: {formattedCheckIn instanceof Date ? formattedCheckIn.toLocaleString() : formattedCheckIn}   
      </p>
    </div>
  );
};

export default Task;
