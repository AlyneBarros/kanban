import React, { useEffect, useState } from "react";
import axios from "axios";
import Column from "./Column";
import Sidebar from "./Sidebar";
import Header from "./Header";

const serviceUrl = 'https://apps.uniaoquimica.com.br:44301/sap/opu/odata/sap/ZKANBAN_SRV/';

const username = 'usr_webapp';
const password = 'kkk';

// Ordem fixa dos processos desejados
const fixedProcessOrder = ['PESAGEM', 'GRANULAÇAO','COMPRESSAO', 'DRAGEADORA', 'EQUALIZACAO', 'ESCOLHA', 'EMBALAGEM', 'REVISAO DOCUMENTAÇAO'];

function Home() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [kanbanHeader, setKanbanHeader] = useState('');
  const [boardSlice, setBoardSlice] = useState('');
  const [uniqueOrderCount, setUniqueOrderCount] = useState(0);
  const [startedOrderCount, setStartedOrderCount] = useState(0);
  const [waitingOrderCount, setWaitingOrderCount] = useState(0);
  const [cardWidth, setCardWidth] = useState('350px');
  const [columnWidth, setColumnWidth] = useState('350px');
  const [containerHeight, setContainerHeight] = useState('87vh');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = btoa(`${username}:${password}`);
        const responseOrders = await axios.get(`${serviceUrl}/OrdemSet?$filter=Centro eq 'SG00' and Area eq 'SOLIDOS'`, {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json'
          }
        });
        
        const ordersOfSg00 = responseOrders.data.d.results;
        setOrders(ordersOfSg00);

        if (ordersOfSg00.length > 0) {
          setKanbanHeader(ordersOfSg00[0].Centro);
          setBoardSlice(ordersOfSg00[0].Area);

          const uniqueOrders = new Set(ordersOfSg00.map(order => order.OrderNumber));
          setUniqueOrderCount(uniqueOrders.size);

          // Calcular ordens iniciadas e em espera
          const startedOrders = ordersOfSg00.filter(order => order.Dtcheckin && order.Hrcheckin);
          const waitingOrders = ordersOfSg00.filter(order => !order.Dtcheckin || !order.Hrcheckin);
          setStartedOrderCount(startedOrders.length);
          setWaitingOrderCount(waitingOrders.length);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API OData:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7fd] dark:bg-[#20212c] overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <Header 
        uniqueOrderCount={uniqueOrderCount} 
        startedOrderCount={startedOrderCount} 
        waitingOrderCount={waitingOrderCount} 
      />
      
      <Sidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSideBarOpen ? 'ml-[261px]' : 'ml-0'}`}>
        <header className="flex items-center justify-between p-4 bg-white dark:bg-[#2b2c37] shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{kanbanHeader}</h1>
        </header>
        
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
    
          {orders.length > 0 ? (
            <div className="flex space-x-4 min-w-max">
              {/* Renderizar colunas de acordo com a ordem fixa dos processos */}
              {fixedProcessOrder.map((processo, index) => {
                const ordersOfProcess = orders.filter(order => order.Processo === processo);
                // Somente renderizar a coluna se houver pedidos
                if (ordersOfProcess.length === 0) return null;
                return (
                  <Column 
                    key={index} 
                    descProcesso={processo} 
                    orders={ordersOfProcess} 
                    cardWidth={cardWidth}
                    columnWidth={columnWidth}
                    containerHeight={containerHeight}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-900 dark:text-gray-100">Nenhum dado disponível</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
