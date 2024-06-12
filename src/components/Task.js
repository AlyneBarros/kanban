import React from 'react';

const Task = ({ order }) => {
  // Formata a data e hora UTC para o formato desejado
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

  // Formata a data e hora de acordo com os dados fornecidos
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

    // Ajusta o fuso horário para 'America/Sao_Paulo' (UTC-3)
    date.setHours(date.getHours() + 3);

    return isNaN(date.getTime()) ? null : date;
  };

  // Calcula o tempo de produção
  const calculateProductionTime = () => {
    if (!(formattedCheckIn instanceof Date)) return null;

    const now = new Date();
    const diffInMilliseconds = now - formattedCheckIn;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return `hrs: ${Math.round(diffInHours)}`;
  };

  // Formata os dados de data e hora para exibição
  const formattedCheckIn = formatDateTime(order.Dtcheckin, order.Hrcheckin);
  const formattedCheckOut = formatDateTime(order.Dtcheckout, order.Hrcheckout);

  // Calcula o tempo de produção
  const productionTime = calculateProductionTime();

  // Verifica se a ordem está iniciada e aplica uma classe correspondente ao cartão
  const isIniciado = order.Iniciado === true;
  const cardClass = isIniciado ? 'border-l-8 border-green-500 ' : '';

  return (
    <div className={`kanban-task rounded-lg shadow-md p-4 mb-4 mr-4 bg-white ${cardClass}`}>
      {/* Detalhes da ordem */}
      <p className="text-sm font-semibold mb-2">
        OP: {order.OrderNumber} | {order.Lote}
      </p>
      <p className="text-sm text-black-600">
        {order.Material} | {order.Descmaterial} | {new Intl.NumberFormat('pt-BR').format(order.Quantidade)} {order.Unidade}
      </p>
      {/* Exibe o tempo de produção e o horário de check-in */}
      <p className="text-sm text-black-600">
        {productionTime !== null ? `${productionTime} | CheckIn: ${formattedCheckIn.toLocaleString({ timeZone: 'America/Sao_Paulo' })}` : ''}
      </p>
      {/* Exibe o horário de check-out se disponível */}
      {formattedCheckOut && (
        <p className="text-sm text-black-600">
          CheckOut: {formattedCheckOut.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
        </p>
      )}
    </div>
  );
};

export default Task;
