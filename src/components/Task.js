import {useState} from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Biblioteca de ícones
import { Tooltip } from 'react-tooltip'; // Biblioteca de tooltips

const Task = ({ order }) => {
  const [showOrangeTasks, setShowOrangeTasks] = useState(false);

  // Função para formatar a data no formato desejado
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

  // Função para formatar a data e hora
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

  // Função para calcular o tempo de produção
  const calculateProductionTime = (formattedCheckIn) => {
    if (!(formattedCheckIn instanceof Date)) return null;

    const now = new Date();
    const diffInMilliseconds = now - formattedCheckIn;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return `hrs: ${Math.round(diffInHours)}`;
  };

  // Função para determinar a classe de estilo com base na ordem da tarefa
  const sortedClass = () => {
    // Tarefa iniciada
    if (order.Iniciado) {
      return 'border-l-8 border-green-500';
    }
    // Tarefa não iniciada
    if (!order.Iniciado && !order.isDuplicatedNotStarted) {
      return '';
    }
    // Tarefa não iniciada duplicada
    if (!order.Iniciado && order.isDuplicatedNotStarted) {
      return 'border-l-8 border-orange-500';
    }
    return '';
  };

  const formattedCheckIn = formatDateTime(order.Dtcheckin, order.Hrcheckin);
  const formattedCheckOut = formatDateTime(order.Dtcheckout, order.Hrcheckout);
  const productionTime = calculateProductionTime(formattedCheckIn);

  return (
    <div className={`kanban-task rounded-lg shadow-md p-4 mb-4 mr-4 bg-white ${sortedClass()}`}>
      <p className="text-sm font-semibold mb-2 flex items-center">
        OP: {order.OrderNumber} | {order.Lote}
        {order.isDuplicatedNotStarted && (
          <span className="ml-2 text-orange-500" data-tooltip-id="tooltip-duplicate" data-tooltip-content="Essa ordem se encontra iniciada em outro processo">
            <FaExclamationTriangle />
          </span>
        )}
      </p>
      <p className="text-sm text-black-600">
        {order.Material} | {order.Descmaterial} | {new Intl.NumberFormat('pt-BR').format(order.Quantidade)} {order.Unidade}
      </p>
      <p className="text-sm text-black-600">
        {productionTime !== null ? `${productionTime} | CheckIn: ${formattedCheckIn.toLocaleString({ timeZone: 'America/Sao_Paulo' })}` : ''}
      </p>
      {formattedCheckOut && (
        <p className="text-sm text-black-600">
          CheckOut: {formattedCheckOut.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
        </p>
      )}
      <Tooltip id="tooltip-duplicate" />
    </div>
  );
};

export default Task;
