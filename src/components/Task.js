import React from 'react';

const Task = ({ order }) => {
  const formatDateUTC = (sDate) => {
    if (!sDate) return "-";

    const date = new Date(sDate);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    };

    const formatter = new Intl.DateTimeFormat(undefined, options);
    return formatter.format(date);
  };

  const formatDateTime = (dateString, timeString) => {
    if (!dateString || !timeString) return null;

    const dateMilliseconds = parseInt(dateString.match(/\d+/)[0], 10);
    const date = new Date(dateMilliseconds);

    const timeMatch = timeString.match(/PT(\d+)H(\d+)M(\d+)S/);
    if (timeMatch) {
      const [, hours, minutes, seconds] = timeMatch.map(Number);
      date.setUTCHours(hours);
      date.setUTCMinutes(minutes);
      date.setUTCSeconds(seconds);
    }

    // Ajustar manualmente o horário em 3 horas
    date.setHours(date.getHours() + 3);

    return isNaN(date.getTime()) ? null : date;
  };

  const formattedCheckIn = formatDateTime(order.Dtcheckin, order.Hrcheckin);
  const formattedCheckOut = formatDateTime(order.Dtcheckout, order.Hrcheckout);

  const calculateProductionTime = () => {
    if (!(formattedCheckIn instanceof Date)) return null;

    const now = new Date();
    const diffInMilliseconds = now - formattedCheckIn;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return `hrs: ${Math.round(diffInHours)}`;
  };

  const productionTime = calculateProductionTime();

  const isIniciado = order.Iniciado === true;
  const cardClass = isIniciado ? 'border-l-8 border-green-500 ' : '';

  return (
    <div className={`kanban-task rounded-lg shadow-md p-4 mb-4 mr-4 bg-white ${cardClass}`}>
      <p className="text-sm font-semibold mb-2">
        OP: {order.OrderNumber} | {order.Lote}
      </p>
      <p className="text-sm text-black-600">
        {order.Material} | {order.Descmaterial} | {new Intl.NumberFormat('pt-BR').format(order.Quantidade)} {order.Unidade}
      </p>
      <p className="text-sm text-black-600">
        {productionTime !== null ? `${productionTime} | CheckIn: ${formattedCheckIn.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}` : ''}
      </p>
      {formattedCheckOut && (
        <p className="text-sm text-black-600">
          CheckOut: {formattedCheckOut.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
        </p>
      )}
    </div>
  );
};

export default Task;
